//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract PaymentPattern {
    /*//////////////////////////////////////////////////////////////
                                ERRORS
    //////////////////////////////////////////////////////////////*/

    error InvalidAddress();
    error InvalidAmount();
    error NoPendingWithdrawal();
    error WithdrawalFailed();

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/
    event PaymentQueued(address indexed recipient, uint256 amount);

    event PaymentWithdrawn(address indexed recipient, uint256 amount);

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    mapping(address => uint256) public pendingWithdrawals;

    /*//////////////////////////////////////////////////////////////
                        SAFE PAYMENT FUNCTIONS (PVM safe) PULL PATTERN
    //////////////////////////////////////////////////////////////*/

    /// @notice Queue payment for pull pattern (PVM safe)
    function _queuePayment(address recipient, uint256 amount) internal {
        if (recipient == address(0)) revert InvalidAddress();
        if (amount == 0) revert InvalidAmount();
        pendingWithdrawals[recipient] += amount;
        emit PaymentQueued(recipient, amount);
    }

    /// @notice Withdraw pending payments (pull pattern)
    function _withdrawPending() internal {
        uint256 amount = pendingWithdrawals[msg.sender];
        if (amount == 0) revert NoPendingWithdrawal();

        pendingWithdrawals[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) revert WithdrawalFailed();

        emit PaymentWithdrawn(msg.sender, amount);
    }
}
