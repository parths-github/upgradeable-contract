// SPDX-License-Identifier: MIT
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";


// Order of Inheritance matters. It won't compile if Initializable is at end coz it's the base level contract
contract LW3NFT is Initializable, ERC721Upgradeable, UUPSUpgradeable, OwnableUpgradeable {


    function initialize() public initializer {
        __ERC721_init("LW3NFT", "LW3NFT");
        __Ownable_init();
        _mint(msg.sender, 1);
    }


    // Function is called by parent contract-- it just allow us to modify the access to the upgrade function
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {

    }
}