// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./IXcm.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface ICopyrightNFT {
    function transferFrom(address from, address to, uint256 tokenId) external;
}

interface ILibrary {
    function teleport(
        uint32 paraId,
        bytes32 beneficiary,
        uint128 amount
    ) external returns (bytes memory);
}

address constant INK_LIBRARY_ADDRESS = 0xEF1ec0952D3F96ca6C94e217975F89eFee42a9C2;

contract NFTMoney is ERC20, Ownable, IERC721Receiver {
    mapping(address => mapping(uint256 => address)) public wrappedNFTs;
    uint256 public rewardPerNFT = 1000 * 10 ** 18;

    error AlreadyWrapped();
    error NotTheWrapper();
    error InsufficientFunds();
    error TeleportFailed(bytes reason);
    event TeleportSuccess(address indexed sender, uint256 amount);
    event NFTWrapped(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed owner
    );
    event NFTUnwrapped(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed owner
    );
    event FundsReceived(address indexed sender, uint256 amount);
    event RedeemSuccess(address indexed account, uint128 amount);
    event RedeemFailed(bytes reason);

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** 18);
    }

    function wrapCopyright(
        address copyrightContract,
        uint256 tokenId
    ) external {
        if (wrappedNFTs[copyrightContract][tokenId] != address(0))
            revert AlreadyWrapped();
        ICopyrightNFT(copyrightContract).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );
        wrappedNFTs[copyrightContract][tokenId] = msg.sender;
        _mint(msg.sender, rewardPerNFT);
        emit NFTWrapped(copyrightContract, tokenId, msg.sender);
    }

    function unwrapCopyright(
        address copyrightContract,
        uint256 tokenId
    ) external {
        if (wrappedNFTs[copyrightContract][tokenId] != msg.sender)
            revert NotTheWrapper();
        wrappedNFTs[copyrightContract][tokenId] = address(0);
        ICopyrightNFT(copyrightContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );
        emit NFTUnwrapped(copyrightContract, tokenId, msg.sender);
    }

    function teleport(
        uint32 paraId,
        bytes32 beneficiary,
        uint128 amount
    ) external {
        if (balanceOf(msg.sender) < amount) revert InsufficientFunds();
        _burn(msg.sender, amount);
        bytes memory message = ILibrary(INK_LIBRARY_ADDRESS).teleport(
            paraId,
            beneficiary,
            amount
        );
        IXcm xcm = IXcm(XCM_PRECOMPILE_ADDRESS);
        IXcm.Weight memory weight = xcm.weighMessage(message);
        try xcm.execute(message, weight) {
            emit TeleportSuccess(msg.sender, amount);
        } catch (bytes memory reason) {
            revert TeleportFailed(reason);
        }
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }

    function setRewardPerNFT(uint256 _rewardPerNFT) external onlyOwner {
        rewardPerNFT = _rewardPerNFT;
    }
}
