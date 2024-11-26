import express from "express";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";
import fs from "fs";

const studentRouter = express.Router();

// Path to the static JSON file
const DATA_FILE = "./data/users.json";

// Helper function to read data from the JSON file
const readData = () => {
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Route: Get all students (read-only)
studentRouter.get("/", verifyToken, checkRole(["Student", "Teacher", "Principal"]), (req, res) => {
    try {
        const data = readData();
        const students = data.filter(user => user.role === "Student");
        res.json({ students });
    } catch (err) {
        console.error("Error reading student data:", err);
        res.status(500).json({ error: "Failed to fetch student data" });
    }
});

export { studentRouter };
