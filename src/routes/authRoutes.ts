import express from 'express';
import { register, updateUser, deleteUser, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);

router.put('/user/:userId', updateUser);

router.delete('/user/:userId', deleteUser);

router.post('/login', login);

export { router as authRouter};

