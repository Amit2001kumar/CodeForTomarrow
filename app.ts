import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './src/routes/authRoutes';
import { categoryRouter } from './src/routes/categoryRoutes';
import { serviceRouter } from './src/routes/serviceRoutes';
import { authMiddleware } from './src/middleware/authMiddleware';

const app: Express = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRouter);
app.use('/category', authMiddleware, categoryRouter); // Protected route with authentication middleware
app.use('/service', authMiddleware, serviceRouter); // Protected route with authentication middleware

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
