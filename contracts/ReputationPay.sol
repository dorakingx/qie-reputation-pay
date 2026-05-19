// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title ReputationPay - Escrow-backed payment requests with on-chain reputation
contract ReputationPay is ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 public immutable refundDelay;

    struct PaymentRequest {
        uint256 id;
        address payer;
        address recipient;
        address token;
        uint256 amount;
        string title;
        string description;
        bool paid;
        bool completed;
        bool refunded;
        uint256 createdAt;
    }

    struct UserStats {
        uint256 completedPayments;
        uint256 totalReceived;
        uint256 reviewCount;
        uint256 ratingSum;
    }

    struct Review {
        uint256 requestId;
        address reviewer;
        address reviewee;
        uint8 rating;
        bytes32 reviewHash;
        uint256 createdAt;
    }

    uint256 public nextRequestId = 1;
    mapping(uint256 => PaymentRequest) public paymentRequests;
    mapping(uint256 => uint256) public escrowBalances;
    mapping(uint256 => Review) public reviews;
    mapping(uint256 => bool) public hasReview;
    mapping(address => UserStats) private userStats;

    event PaymentRequestCreated(
        uint256 indexed requestId,
        address indexed creator,
        address indexed recipient,
        uint256 amount
    );
    event PaymentEscrowed(uint256 indexed requestId, address indexed payer, uint256 amount);
    event PaymentReleased(uint256 indexed requestId, address indexed recipient, uint256 amount);
    event PaymentRefunded(uint256 indexed requestId, address indexed payer, uint256 amount);
    event ReviewLeft(
        uint256 indexed requestId,
        address indexed reviewer,
        address indexed reviewee,
        uint8 rating,
        bytes32 reviewHash
    );

    error InvalidToken();
    error RequestNotFound();
    error AlreadyPaid();
    error CannotPayOwnRequest();
    error NotPaid();
    error AlreadyCompleted();
    error OnlyRecipient();
    error OnlyPayer();
    error NotCompleted();
    error ReviewExists();
    error InvalidRating();
    error NotRefundable();
    error AlreadyRefunded();
    error InsufficientEscrow();
    error InvalidRecipient();
    error InvalidAmount();

    constructor(uint256 refundDelaySeconds) {
        refundDelay = refundDelaySeconds;
    }

    function createPaymentRequest(
        address recipient,
        address token,
        uint256 amount,
        string calldata title,
        string calldata description
    ) external returns (uint256 requestId) {
        if (recipient == address(0)) revert InvalidRecipient();
        if (token == address(0)) revert InvalidToken();
        if (amount == 0) revert InvalidAmount();

        requestId = nextRequestId++;
        paymentRequests[requestId] = PaymentRequest({
            id: requestId,
            payer: address(0),
            recipient: recipient,
            token: token,
            amount: amount,
            title: title,
            description: description,
            paid: false,
            completed: false,
            refunded: false,
            createdAt: block.timestamp
        });

        emit PaymentRequestCreated(requestId, msg.sender, recipient, amount);
    }

    function payRequest(uint256 requestId) external nonReentrant {
        PaymentRequest storage req = paymentRequests[requestId];
        if (req.id == 0) revert RequestNotFound();
        if (req.paid) revert AlreadyPaid();
        if (req.recipient == msg.sender) revert CannotPayOwnRequest();

        req.payer = msg.sender;
        req.paid = true;
        escrowBalances[requestId] = req.amount;

        IERC20(req.token).safeTransferFrom(msg.sender, address(this), req.amount);

        emit PaymentEscrowed(requestId, msg.sender, req.amount);
    }

    function markCompleted(uint256 requestId) external nonReentrant {
        PaymentRequest storage req = paymentRequests[requestId];
        if (req.id == 0) revert RequestNotFound();
        if (!req.paid) revert NotPaid();
        if (req.completed) revert AlreadyCompleted();
        if (req.refunded) revert AlreadyRefunded();
        if (msg.sender != req.recipient) revert OnlyRecipient();

        uint256 amount = escrowBalances[requestId];
        if (amount == 0) revert InsufficientEscrow();

        req.completed = true;
        escrowBalances[requestId] = 0;

        IERC20(req.token).safeTransfer(req.recipient, amount);

        UserStats storage stats = userStats[req.recipient];
        stats.completedPayments += 1;
        stats.totalReceived += amount;

        emit PaymentReleased(requestId, msg.sender, amount);
    }

    function refundRequest(uint256 requestId) external nonReentrant {
        PaymentRequest storage req = paymentRequests[requestId];
        if (req.id == 0) revert RequestNotFound();
        if (!req.paid) revert NotPaid();
        if (req.completed) revert AlreadyCompleted();
        if (req.refunded) revert AlreadyRefunded();
        if (msg.sender != req.payer) revert OnlyPayer();
        if (block.timestamp < req.createdAt + refundDelay) revert NotRefundable();

        uint256 amount = escrowBalances[requestId];
        if (amount == 0) revert InsufficientEscrow();

        req.refunded = true;
        escrowBalances[requestId] = 0;

        IERC20(req.token).safeTransfer(req.payer, amount);

        emit PaymentRefunded(requestId, msg.sender, amount);
    }

    function leaveReview(
        uint256 requestId,
        uint8 rating,
        bytes32 reviewHash
    ) external {
        if (rating < 1 || rating > 5) revert InvalidRating();
        PaymentRequest storage req = paymentRequests[requestId];
        if (req.id == 0) revert RequestNotFound();
        if (!req.completed) revert NotCompleted();
        if (msg.sender != req.payer) revert OnlyPayer();
        if (hasReview[requestId]) revert ReviewExists();

        hasReview[requestId] = true;
        reviews[requestId] = Review({
            requestId: requestId,
            reviewer: msg.sender,
            reviewee: req.recipient,
            rating: rating,
            reviewHash: reviewHash,
            createdAt: block.timestamp
        });

        UserStats storage stats = userStats[req.recipient];
        stats.reviewCount += 1;
        stats.ratingSum += rating;

        emit ReviewLeft(requestId, msg.sender, req.recipient, rating, reviewHash);
    }

    function getEscrowBalance(uint256 requestId) external view returns (uint256) {
        return escrowBalances[requestId];
    }

    function getPaymentRequest(uint256 requestId)
        external
        view
        returns (PaymentRequest memory)
    {
        return paymentRequests[requestId];
    }

    function getUserStats(address user) external view returns (UserStats memory) {
        return userStats[user];
    }

    function getReview(uint256 requestId) external view returns (Review memory) {
        return reviews[requestId];
    }
}
