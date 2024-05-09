// authController.ts

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

    // Check if email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
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

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user details
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

    // Delete user
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

    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user.id.toString());

    // Send token along with response
    res.json({ token, message: 'User login successfully' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default { register, updateUser, deleteUser, login };
