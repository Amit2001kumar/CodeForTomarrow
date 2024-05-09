import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

// Define a custom interface extending Request to include userId property
type AuthenticatedRequest = Request & { userId?: string };

// Middleware function to authenticate requests
const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;

  // Check if Authorization header is missing or does not start with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Bearer token missing.' });
  }
  
  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];
  
  // Continue with token verification and processing
  

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
