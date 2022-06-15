//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface ICredibilityToken {
    function smartContractMint(uint256 amount, address[3] memory receiver)
        external;

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function burnFrom(address account, uint256 amount) external; 

    function balanceOf(address account) external view returns (uint256);

}

contract SocialMedia is ERC721 {
    address owner;
    uint256 id;
    uint256 registeredUser;
    uint256 nftId;
    address tokenAddress;

    constructor() ERC721("SocialMediaPost", "SMP") {
        owner = msg.sender;
        id = 0;
        nftId = 0;
        registeredUser = 0;
    }

    struct profile {
        uint256 uid;
        string username;
        bool active;
        uint256 hiddenCounter;
        mapping(uint256 => uint256) hiddenId;
        mapping(uint256 => bool) postInteraction;
    }

    struct post {
        uint256 postId;
        string content;
        uint256 date;
        address owner;
        uint256 like;
        uint256 dislike;
        bool isActive;
        address[3] likers;
        address[3] dislikers;
    }

    //connect profile struct with address
    mapping(address => profile) public userProfile;

    //connect post struct with id
    mapping(uint256 => post) public posts;

    //connect minted id with post id
    mapping(uint256 => uint256) public mintedId;



    //function to register an address
    function register(
        string calldata _username
    ) public {
        require(!userProfile[msg.sender].active, "You already have a profile!");

        userProfile[msg.sender].active = true;
        userProfile[msg.sender].username = _username;
    }

    //function for user to post
    function userPost(string calldata _content) public {
        require(userProfile[msg.sender].active, "You have to sign up first");
        require(StringUtils.strlen(_content) <= 160, "Too many chararcter!");
        posts[id].postId = id;
        posts[id].owner = msg.sender;
        posts[id].content = _content;
        posts[id].date = block.timestamp;
        posts[id].like = 0;
        posts[id].dislike = 0;
        posts[id].isActive = true;

        //set owner post interaction as true
        userProfile[msg.sender].postInteraction[id] = true;

        id++;
    }

    //function to vote (like)
    //this function will be shown in private page
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
        require(ICredibilityToken(tokenAddress).balanceOf(msg.sender) >= 100*10**18, "You did not have enough balance");

        //paying 1 token to smart contract
        ICredibilityToken(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            10**18
        );
        posts[_postId].likers[posts[_postId].like] = msg.sender;
        posts[_postId].like += 1;
        userProfile[msg.sender].postInteraction[_postId] = true;


        //if posts hit threshold then mint and send token
        if (posts[_postId].like >= 3) {

            posts[_postId].isActive = false;

            mintedId[nftId] = _postId;

            _safeMint(posts[_postId].owner, _postId);

            //set reward as 1%
            uint256 amount = 10 * 10**16;

            //calling mint function from token smart contract and send to likers
            ICredibilityToken(tokenAddress).smartContractMint(amount, posts[_postId].likers);

            nftId = nftId + 1;
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
        require(ICredibilityToken(tokenAddress).balanceOf(msg.sender) >= 100*10**18, "You did not have enough balance");

        //paying 1 token to smart contract
        ICredibilityToken(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            10**18
        );

        posts[_postId].dislikers[posts[_postId].dislike] = msg.sender;
        posts[_postId].dislike += 1;
        userProfile[msg.sender].postInteraction[_postId] = true;

        if (posts[_postId].dislike >= 3) {
            posts[_postId].isActive = false;
            posts[_postId].content = "";

            //set reward as 1%
            uint256 amount = 10 * 10**16;

            //calling mint function from token smart contract and send to likers
            ICredibilityToken(tokenAddress).smartContractMint(amount, posts[_postId].dislikers);
        }
    }

    //function to like minted post
    //this function will be shown on public page
    function likeMinted(uint256 _postId) public {
        require(userProfile[msg.sender].active, "You have to sign up first");
        require(!posts[_postId].isActive, "Post is not active yet");
        require(ICredibilityToken(tokenAddress).balanceOf(msg.sender) >= 10**18, "You did not have enough balance");

        ICredibilityToken(tokenAddress).transferFrom(
            msg.sender,
            posts[_postId].owner,
            9*10**17
        );

        // burn 0.1 token
       ICredibilityToken(tokenAddress).burnFrom(msg.sender, 1*10**17);

        
        posts[_postId].date = block.timestamp;
        posts[_postId].like += 1;
    }

    function hideMinted(uint256 _postId) public {
        require(userProfile[msg.sender].active, "You have to sign up first");
        require(!posts[_postId].isActive, "Post is not active yet");

        userProfile[msg.sender].hiddenId[userProfile[msg.sender].hiddenCounter] = _postId;
        userProfile[msg.sender].hiddenCounter++;
    }

    //input token smart contract address
    function setTokenContractAddress(address _contractAddress) public {
        require(msg.sender == owner, "You are not the owner");
        tokenAddress = _contractAddress;
    }

    //function to check if account is registered
    function isRegistered() public view returns (bool) {
        return userProfile[msg.sender].active;
    }

    //function to get registered username
    function getUsername(address _user) public view returns (string memory) {
        return userProfile[_user].username;
    }

    //get all user hidden id
    function getHiddenId() public view returns (uint256[] memory){
        uint256[] memory arrayOfHidden = new uint256[](userProfile[msg.sender].hiddenCounter);

        for(uint256 i=0; i<userProfile[msg.sender].hiddenCounter; i++){
            arrayOfHidden[i] = userProfile[msg.sender].hiddenId[i];
        }

        return arrayOfHidden;
    }

    //get all posts
    function getAllPost() public view returns (post[] memory) {
        post[] memory getAllPosts = new post[](id);
        for (uint256 i = 0; i < id; i++) {
            getAllPosts[i] = posts[i];
        }

        return getAllPosts;
    }

    //get all minted post (post that will be shown in public page)
    function getAllMintedPost() public view returns(post[] memory){
        post[] memory getAllMintedPosts = new post[](nftId);
        for(uint256 i=0; i<nftId; i++){
            getAllMintedPosts[i] = posts[mintedId[i]];
        }
        
        return getAllMintedPosts;
    }
}

library StringUtils {
    /**
     * @dev Returns the length of a given string
     *
     * @param s The string to measure the length of
     * @return The length of the input string
     */
    function strlen(string memory s) internal pure returns (uint256) {
        uint256 len;
        uint256 i = 0;
        uint256 bytelength = bytes(s).length;
        for (len = 0; i < bytelength; len++) {
            bytes1 b = bytes(s)[i];
            if (b < 0x80) {
                i += 1;
            } else if (b < 0xE0) {
                i += 2;
            } else if (b < 0xF0) {
                i += 3;
            } else if (b < 0xF8) {
                i += 4;
            } else if (b < 0xFC) {
                i += 5;
            } else {
                i += 6;
            }
        }
        return len;
    }
}