import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

// Define a custom interface extending Request to include userId property
interface AuthenticatedRequest extends Request {
  userId?: string; // Define userId property as optional
}

// Middleware function to authenticate requests
const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.secretKey);
    
    // Attach the decoded user ID to the request for further use
    req.userId = (decoded as any).userId;
    
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export { authMiddleware };
