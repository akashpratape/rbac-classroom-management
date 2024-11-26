import express from "express";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";
import fs from "fs";

const teacherRouter = express.Router();

// Path to the static JSON file
const DATA_FILE = "./data/users.json";

// Helper function to read data from the JSON file
const readData = () => {
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Helper function to write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Route: Get all students
teacherRouter.get("/dashboard", verifyToken, checkRole(["Teacher"]), (req, res) => {
    const data = readData();
    const students = data.filter(user => user.role === "Student");

    res.json({ students });
});

// Route: Edit student details
teacherRouter.put("/edit-student/:id", verifyToken, checkRole(["Teacher"]), (req, res) => {
    const { id } = req.params;
    const { name, email, classroom } = req.body;

    const data = readData();
    const studentIndex = data.findIndex(user => user.id === parseInt(id) && user.role === "Student");

    if (studentIndex === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    // Update the student's details
    if (name) data[studentIndex].name = name;
    if (email) data[studentIndex].email = email;
    if (classroom) data[studentIndex].classroom = classroom;

    writeData(data);

    res.json({ message: "Student updated successfully", student: data[studentIndex] });
});

export { teacherRouter };







