// authRoutes.ts

import express, { Request, Response } from 'express';
import { register, login, updateUser, deleteUser } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to login (generate token)
router.post('/login', login);

// Protected routes (require authentication middleware)
router.put('/update/:userId', authMiddleware, updateUser);
router.delete('/delete/:userId', authMiddleware, deleteUser);

export { router as authRouter};
