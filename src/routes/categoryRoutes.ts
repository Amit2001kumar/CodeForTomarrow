import express from 'express';
import { createCategory, getAllCategories, updateCategory, removeEmptyCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createCategory);

router.get('/', getAllCategories);

router.put('/:categoryId', updateCategory);

router.delete('/:categoryId', removeEmptyCategory);

export { router as categoryRouter };
