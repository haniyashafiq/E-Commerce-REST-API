const express = require("express");
const router = express.Router();
const service = require("../services/orders.service");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
    const { items } = req.body; // [{product_id, quantity}]
    const userId = req.user.id;

    try {
        const orderId = await service.placeOrder(userId, items);
        res.status(201).json({ message: "Order placed", orderId });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    const userId = req.user.id;
    const orders = await service.getOrdersByUser(userId);
    res.json(orders);
});

module.exports = router;
