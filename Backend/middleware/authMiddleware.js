import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1]       // extracting token from header

    if (!token) {
        return res.stauts(403).json({ message: "Token required "});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "invalid or expired token" });
    }
};

export const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.stauts(403).json({ message: "You do not have access to this route"});
    }
    next();
};