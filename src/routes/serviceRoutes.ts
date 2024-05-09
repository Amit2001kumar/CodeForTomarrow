// serviceRoutes.ts

import express from 'express';
import { addServiceToCategory, getAllServices, updateService, removeService } from '../controllers/serviceController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/:categoryId/service', addServiceToCategory);

router.get('/:categoryId/services', getAllServices);

router.put('/:categoryId/service/:serviceId', updateService);

router.delete('/:categoryId/service/:serviceId', removeService);

export { router as serviceRouter };
