import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

type AuthenticatedRequest = Request & { userId?: string };

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Bearer token missing.' });
  }

  const token = authHeader.split(' ')[1];


  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.userId = (decoded as any).userId;

    next();
  } catch (error) {

    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export { authMiddleware };
