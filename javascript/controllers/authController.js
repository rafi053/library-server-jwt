var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { registerUser, authenticateUser } from "../services/userService.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const user = yield registerUser(userName, password);
        res.status(201).json({ userId: user.id, userName: user.userName });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const user = yield authenticateUser(userName, password);
        const token = jwt.sign({ userId: user.id, userName: user.userName }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        if (error.message === "Invalid username or password.") {
            res.status(401).json({ error: error.message });
        }
        else {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error." });
        }
        next(error);
    }
});
