import express from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config()

const router = express.Router();
const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));


// login route
router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    const user = users.find((u) => u.email === email);
    if  (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password) {
        return res.status(400).json({ message: "invalid credentials" });
    }

    // generating a jwt token
    const token = jwt.sign({id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: 60,
    });

    res.json({token, role: user.role})

})

export { router as authRouter };