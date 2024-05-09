// authRoutes.ts

import express from 'express';
import { register, updateUser, deleteUser, login } from '../controllers/authController';

const router = express.Router();

// Register route
router.post('/register', register);

// Update user details route
router.put('/user/:userId', updateUser);

// Delete user account route
router.delete('/user/:userId', deleteUser);

// Login route
router.post('/login', login);

// export default router;
export { router as authRouter};

