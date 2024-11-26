import express from "express";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";
import fs from "fs";

const principalRouter = express.Router();

// Fetch all teachers and students
principalRouter.get("/dashboard", verifyToken, checkRole(["Principal"]), (req, res) => {
    fs.readFile("./data/users.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading data file" });
        }
        const users = JSON.parse(data);
        const teachers = users.filter(user => user.role === "Teacher");
        const students = users.filter(user => user.role === "Student");

        res.json({ teachers, students });
    });
});

// Edit teacher or student data
principalRouter.put("/edit-user/:id", verifyToken, checkRole(["Principal"]), (req, res) => {
    const { id } = req.params;
    const { name, email, password, classroom, subject } = req.body;

    fs.readFile("./data/users.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading data file" });
        }
        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.id === parseInt(id));

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        if (name) users[userIndex].name = name;
        if (email) users[userIndex].email = email;
        if (password) users[userIndex].password = password;
        if (classroom) users[userIndex].classroom = classroom;
        if (subject) users[userIndex].subject = subject;

        fs.writeFile("./data/users.json", JSON.stringify(users, null, 2), err => {
            if (err) {
                return res.status(500).json({ message: "Error writing data file" });
            }
            res.json({ message: "User updated successfully" });
        });
    });
});

export { principalRouter };

