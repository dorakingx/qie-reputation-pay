// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/// @title ReputationPay - Payment requests with on-chain reputation tracking
contract ReputationPay {
    using SafeERC20 for IERC20;

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
        string reviewText;
        uint256 createdAt;
    }

    uint256 public nextRequestId = 1;
    mapping(uint256 => PaymentRequest) public paymentRequests;
    mapping(uint256 => Review) public reviews;
    mapping(uint256 => bool) public hasReview;
    mapping(address => UserStats) private userStats;

    event PaymentRequestCreated(
        uint256 indexed requestId,
        address indexed creator,
        address indexed recipient,
        uint256 amount
    );
    event PaymentPaid(uint256 indexed requestId, address indexed payer, uint256 amount);
    event PaymentCompleted(uint256 indexed requestId, address indexed recipient);
    event ReviewLeft(
        uint256 indexed requestId,
        address indexed reviewer,
        address indexed reviewee,
        uint8 rating
    );

    function createPaymentRequest(
        address recipient,
        address token,
        uint256 amount,
        string calldata title,
        string calldata description
    ) external returns (uint256 requestId) {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be > 0");

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
            createdAt: block.timestamp
        });

        emit PaymentRequestCreated(requestId, msg.sender, recipient, amount);
    }

    function payRequest(uint256 requestId) external {
        PaymentRequest storage req = paymentRequests[requestId];
        require(req.id != 0, "Request not found");
        require(!req.paid, "Already paid");
        require(req.recipient != msg.sender, "Cannot pay own request");

        req.payer = msg.sender;
        req.paid = true;

        IERC20(req.token).safeTransferFrom(msg.sender, req.recipient, req.amount);

        emit PaymentPaid(requestId, msg.sender, req.amount);
    }

    function markCompleted(uint256 requestId) external {
        PaymentRequest storage req = paymentRequests[requestId];
        require(req.id != 0, "Request not found");
        require(req.paid, "Not paid yet");
        require(!req.completed, "Already completed");
        require(msg.sender == req.recipient, "Only recipient");

        req.completed = true;

        UserStats storage stats = userStats[req.recipient];
        stats.completedPayments += 1;
        stats.totalReceived += req.amount;

        emit PaymentCompleted(requestId, msg.sender);
    }

    function leaveReview(
        uint256 requestId,
        uint8 rating,
        string calldata reviewText
    ) external {
        require(rating >= 1 && rating <= 5, "Rating 1-5");
        PaymentRequest storage req = paymentRequests[requestId];
        require(req.id != 0, "Request not found");
        require(req.completed, "Not completed");
        require(msg.sender == req.payer, "Only payer");
        require(!hasReview[requestId], "Review exists");

        hasReview[requestId] = true;
        reviews[requestId] = Review({
            requestId: requestId,
            reviewer: msg.sender,
            reviewee: req.recipient,
            rating: rating,
            reviewText: reviewText,
            createdAt: block.timestamp
        });

        UserStats storage stats = userStats[req.recipient];
        stats.reviewCount += 1;
        stats.ratingSum += rating;

        emit ReviewLeft(requestId, msg.sender, req.recipient, rating);
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
