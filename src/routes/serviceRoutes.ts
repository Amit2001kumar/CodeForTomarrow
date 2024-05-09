// src/routes/serviceRoutes.ts

import express from 'express';
import { createService, getAllServices, updateService, deleteService } from '../controllers/serviceController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// POST /service - Create a new service
router.post('/', authMiddleware, createService);

// GET /service - Get all services
router.get('/', getAllServices);

// PUT /service/:serviceId - Update a service by ID
router.put('/:serviceId', authMiddleware, updateService);

// DELETE /service/:serviceId - Delete a service by ID
router.delete('/:serviceId', authMiddleware, deleteService);

export { router as serviceRouter };
