import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { principalRouter } from "./routes/principal.js";
import { teacherRouter } from "./routes/teacher.js";
import { studentRouter } from "./routes/student.js";

dotenv.config();

const app = express();

// Use CORS for cross-origin requests
app.use(cors());

// Use body-parser to parse incoming JSON requests
app.use(bodyParser.json());

// Define routes
app.use("/auth", authRouter);               //handles /auth routes(login)
app.use("/principal", principalRouter);      //handle /principal route
app.use("/teacher", teacherRouter);          //handle /teacher route
app.use("/student", studentRouter);          //handle student route

// Start the server
app.listen(8080, "localhost", () => {
    console.log(`Server running on port 8080`);
});
