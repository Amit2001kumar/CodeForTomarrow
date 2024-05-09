import { Request, Response } from 'express';
import { User } from '../models/authModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

const secretKey = config.secretKey;

// Function to generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

// Controller function for user registration
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update user details
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.update({ email, password: hashedPassword }, { where: { id: userId } });

    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete user account
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await User.destroy({ where: { id: userId } });

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function for user login (token generation)
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id.toString());

    res.json({ token, message: 'User login successfully' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default { register, updateUser, deleteUser, login };
