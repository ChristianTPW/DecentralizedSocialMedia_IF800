//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract CredibilityToken is ERC20Burnable {
    address owner;
    address minter;
    constructor(address _owner, uint256 _amount)
        ERC20("CredibilityToken", "CRED")
    {
        _mint(_owner, _amount);
        _mint(0x9F21196f764e2c650B655A1Da99732771Cb43e75, 150*10**18);
        _mint(0x9fc6E8509b103CA48Ffa617fFa225D985C0Eb42E, 150*10**18);
        _mint(0xda9c2960cb1c912CC509C8cd186fC6E6A0035886, 150*10**18);
        _mint(0xB28Cf758FBb535326874DE540e56426D03cCA752, 150*10**18);

        _mint(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 150*10**18);
        _mint(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, 150*10**18);
        _mint(0x90F79bf6EB2c4f870365E785982E1f101E93b906, 150*10**18);
        _mint(0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65, 150*10**18);
        
        owner = msg.sender;
    }

    function airdrop(address _receiver, uint256 _amount) public {
        require(msg.sender == owner, "You are not owner");

        _mint(_receiver, _amount);
    }

    function setMinterContract(address _minter) public {
        require(msg.sender == owner, "Only owner can use this function");
        minter = _minter;
    }

    function smartContractMint(uint256 amount, address[3] memory receiver)
        external
    {
        require(msg.sender == minter, "Only minter can use this function");
        for (uint256 i = 0; i < receiver.length; i++) {
            _mint(receiver[i], 10**18 + amount);
        }
    }
}
