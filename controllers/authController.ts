import { Request, Response, NextFunction } from 'express';
import { userNamePassword } from '../models/types.js'
import { registerUser, authenticateUser } from "../services/userService.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

import { User } from '../models/types.js';


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password }: userNamePassword = req.body;

    if (!userName || !password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }

    const user:User = await registerUser(userName, password);
    res.status(201).json({ userId: user.id, userName: user.userName });
  } catch (error: any) {
    if (error.message === "Username already exists.") {
      res.status(409).json({ error: error.message });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }
    const user:User = await authenticateUser(userName, password);

    const token: string = jwt.sign({ userId: user.id, userName: user.userName }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error: any) {
    if (error.message === "Invalid username or password.") {
      res.status(401).json({ error: error.message });
    } else {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error." });
    }
    next(error);
  }
};
