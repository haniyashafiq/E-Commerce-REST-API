const express = require("express");
const router = express.Router();
const service = require("../services/users.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

router.post("/register", async (req, res) => {
    try{
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await service.register({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User registered", userId });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
});

router.post("/login", async (req, res) => {
    
    const { email, password } = req.body;
    const user = await service.getByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;

// {
//     alice"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNzU2OTE4MjA5LCJleHAiOjE3NTY5MjE4MDl9.HsAvvXOhInCSKVAWf5-syvsW4Fg-giC1nGqNwQA_aLo"
// bob: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkJvYiIsImlhdCI6MTc1NjkxOTYzNSwiZXhwIjoxNzU2OTIzMjM1fQ.TRj0WEo5xheOg8oGYElqfGqQw5TjW-T5gtH57JYQonw

//}