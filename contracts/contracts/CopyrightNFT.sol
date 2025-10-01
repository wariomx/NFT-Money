//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {PaymentPattern} from "./helpers/paymentPattern.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CopyrightNFT is ERC721, Ownable, PaymentPattern, ReentrancyGuard {
    /*//////////////////////////////////////////////////////////////
                            STORAGE
    //////////////////////////////////////////////////////////////*/

    uint256 public nextCopyrightId;

    uint256 public registryFee;

    address public feeRecipient;

    struct CopyrightAsset {
        uint256 id;
        string workName;
        string workDescription;
        string workImage;
        bool isValidated;
    }

    error NoValueSent();
    error InvalidFee();

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable(msg.sender) ReentrancyGuard() {
        nextCopyrightId = 1;
        registryFee = 0.01 ether;
        feeRecipient = msg.sender;
    }

    /*//////////////////////////////////////////////////////////////
                        COPYRIGHT REGISTRATION LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @dev Register new Copyright
    /// @notice The economic rights owner takes the royalties by default of the copyright asset
    /// @param _workName The name of the copyright asset
    /// @param _workDescription The description of the copyright asset
    /// @param _workImage The image of the copyright asset
    /// @return The asset ID of the registered copyright asset
    function registerCopyrightAsset(
        string memory _workName,
        string memory _workDescription,
        string memory _workImage
    ) public payable nonReentrant returns (uint256) {
        if (msg.value == 0) revert NoValueSent();
        if (msg.value < registryFee) revert InvalidFee();

        uint256 assetId = nextCopyrightId++;

        address economicRightsOwner = msg.sender;

        CopyrightAsset memory copyrightAsset = CopyrightAsset({
            id: assetId,
            workName: _workName,
            workDescription: _workDescription,
            workImage: _workImage,
            isValidated: false
        });

        _safeMint(economicRightsOwner, assetId);

        _queuePayment(feeRecipient, msg.value);

        return copyrightAsset.id;
    }

    function withdrawPending() public nonReentrant {
        _withdrawPending();
    }
}
