//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CredibilityToken is ERC20 {
    constructor(address _owner, uint256 _amount)
        ERC20("CredibilityToken", "CRED")
    {
        _mint(_owner, _amount);
    }

    function smartContractMint(uint256 amount, address[] memory receiver)
        external
    {
        for (uint256 i = 0; i < receiver.length; i++) {
            _mint(receiver[i], amount);
        }
    }
}
