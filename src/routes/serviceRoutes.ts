// serviceRoutes.ts

import express from 'express';
import { addServiceToCategory, getAllServices, updateService, removeService } from '../controllers/serviceController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Middleware to authenticate requests
router.use(authMiddleware);

// Add service route
router.post('/:categoryId/service', addServiceToCategory);

// Get all services route
router.get('/:categoryId/services', getAllServices);

// Update service route
router.put('/:categoryId/service/:serviceId', updateService);

// Remove service route
router.delete('/:categoryId/service/:serviceId', removeService);

// export default router;

export { router as serviceRouter };
