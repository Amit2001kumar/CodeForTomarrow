// src/routes/categoryRoutes.ts

// categoryRoutes.ts

import express from 'express';
import { createCategory, getAllCategories, updateCategory, removeEmptyCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Middleware to authenticate requests
router.use(authMiddleware);

// Create category route
router.post('/', createCategory);

// Get all categories route
router.get('/', getAllCategories);

// Update category route
router.put('/:categoryId', updateCategory);

// Remove category route
router.delete('/:categoryId', removeEmptyCategory);

// export default router;


export { router as categoryRouter };
