// src/routes/categoryRoutes.ts

import express from 'express';
import { createCategory, getAllCategories, updateCategory, removeCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// POST /category - Create a new category
router.post('/', authMiddleware, createCategory);

// GET /categories - Get all categories
router.get('/', getAllCategories);

// PUT /category/:categoryId - Update a category by ID
router.put('/:categoryId', authMiddleware, updateCategory);

// DELETE /category/:categoryId - Remove an empty category by ID
router.delete('/:categoryId', authMiddleware, removeCategory);

export { router as categoryRouter };
