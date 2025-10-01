// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ICopyrightNFT is IERC721 {
    struct CopyrightAsset {
        uint256 id;
        string workName;
        string workDescription;
        string workImage;
        bool isValidated;
    }

    function nextCopyrightId() external view returns (uint256);
    function registryFee() external view returns (uint256);

    function registerCopyrightAsset(
        string memory _workName,
        string memory _workDescription,
        string memory _workImage
    ) external payable returns (uint256);
}