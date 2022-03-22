//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface ICredibilityToken {
    function smartContractMint(uint256 amount, address[] memory receiver)
        external;

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);
}

contract SocialMedia is ERC721URIStorage {
    address owner;
    uint256 id;
    uint256 nftId;
    address tokenAddress;

    constructor() ERC721("SocialMediaPost", "SMP") {
        owner = msg.sender;
        id = 0;
        nftId = 0;
    }

    struct profile {
        string nickname;
        string profilePicture;
        string description;
        uint256 numberOfPost;
        uint256 totalLikes;
        uint256 totalDislikes;
        uint256 validVote;
        uint256 approvedPost;
        bool active;
        mapping(uint256 => bool) postInteraction;
    }

    struct post {
        string content;
        string date;
        address owner;
        uint256 like;
        uint256 dislike;
        bool isActive;
        address[] likers;
    }

    mapping(address => profile) public userProfile;
    mapping(uint256 => post) public posts;
    mapping(uint256 => address[]) public listOfPostLikers;
    mapping(address => uint256[]) public listOfLikedPost;

    function signUp(
        string calldata _nickname,
        string calldata _profilePicture,
        string calldata _description
    ) public {
        require(!userProfile[msg.sender].active, "You already have a profile!");

        userProfile[msg.sender].active = true;
        userProfile[msg.sender].nickname = _nickname;
        userProfile[msg.sender].profilePicture = _profilePicture;
        userProfile[msg.sender].description = _description;
        userProfile[msg.sender].numberOfPost = 0;
        userProfile[msg.sender].totalLikes = 0;
        userProfile[msg.sender].totalDislikes = 0;
        userProfile[msg.sender].validVote = 0;
    }

    function userPost(string calldata _content) public {
        require(userProfile[msg.sender].active, "You have to sign up first");
        posts[id].owner = msg.sender;
        posts[id].content = _content;
        posts[id].like = 0;
        posts[id].dislike = 0;
        posts[id].isActive = true;

        userProfile[msg.sender].numberOfPost += 1;
        id++;
    }

    function like(uint256 _postId) public {
        require(userProfile[msg.sender].active, "You have to sign up first");
        require(
            posts[_postId].isActive,
            "Post is not available for voting anymore"
        );
        require(
            !userProfile[msg.sender].postInteraction[_postId],
            "You already liked or dislike this post!"
        );

        posts[_postId].like += 1;
        posts[_postId].likers.push(msg.sender);
        userProfile[msg.sender].postInteraction[_postId] = true;

        ICredibilityToken(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            1
        );

        if (posts[_postId].like >= 1) {
            string memory json = Base64.encode(
                bytes(
                    string(
                        abi.encodePacked(
                            '{"owner": " ',
                            // We set the title of our NFT as the generated word.
                            posts[_postId].owner,
                            '", "content": ',
                            posts[_postId].content,
                            '"}'
                        )
                    )
                )
            );

            // Just like before, we prepend data:application/json;base64, to our data.
            string memory finalTokenUri = string(
                abi.encodePacked("data:application/json;base64,", json)
            );

            _safeMint(posts[_postId].owner, nftId);
            _setTokenURI(nftId, finalTokenUri);

            ICredibilityToken token = ICredibilityToken(tokenAddress);

            uint256 amount = 10;

            token.smartContractMint(amount, posts[_postId].likers);

            nftId++;
        }
    }

    function dislike(uint256 _postId) public {
        require(userProfile[msg.sender].active, "You have to sign up first");
        require(
            posts[_postId].isActive,
            "Post is not available for voting anymore"
        );
        require(
            !userProfile[msg.sender].postInteraction[_postId],
            "You already liked or dislike this post!"
        );
        posts[_postId].dislike += 1;
        userProfile[msg.sender].postInteraction[_postId] = true;

        if (posts[_postId].dislike >= 1) {
            posts[_postId].isActive = false;
        }
    }

    function setTokenContractAddress(address _contractAddress) public {
        require(msg.sender == owner, "You are not the owner");
        tokenAddress = _contractAddress;
    }

    //function to check if account is exist
    function isAccountExist() public view returns (bool) {
        return userProfile[msg.sender].active;
    }

    //get all posts
    function getAllPost() public view returns (post[] memory) {
        post[] memory getAllPosts = new post[](id);
        for (uint256 i = 0; i < id; i++) {
            getAllPosts[i] = posts[i];
        }

        return getAllPosts;
    }
}

library Base64 {
    bytes internal constant TABLE =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    /// @notice Encodes some bytes to the base64 representation
    function encode(bytes memory data) internal pure returns (string memory) {
        uint256 len = data.length;
        if (len == 0) return "";

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((len + 2) / 3);

        // Add some extra buffer at the end
        bytes memory result = new bytes(encodedLen + 32);

        bytes memory table = TABLE;

        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)

            for {
                let i := 0
            } lt(i, len) {

            } {
                i := add(i, 3)
                let input := and(mload(add(data, i)), 0xffffff)

                let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))
                out := shl(8, out)
                out := add(
                    out,
                    and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF)
                )
                out := shl(8, out)
                out := add(
                    out,
                    and(mload(add(tablePtr, and(shr(6, input), 0x3F))), 0xFF)
                )
                out := shl(8, out)
                out := add(
                    out,
                    and(mload(add(tablePtr, and(input, 0x3F))), 0xFF)
                )
                out := shl(224, out)

                mstore(resultPtr, out)

                resultPtr := add(resultPtr, 4)
            }

            switch mod(len, 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }

            mstore(result, encodedLen)
        }

        return string(result);
    }
}
