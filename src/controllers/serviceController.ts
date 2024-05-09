// src/controllers/serviceController.ts

import { Request, Response } from 'express';
import { executeQuery } from '../database/database';

// Controller function to create a new service
export const createService = async (req: Request, res: Response) => {
  try {
    // Extract service data from request body
    const { categoryId, serviceName, type, priceOptions } = req.body;

    // Perform validation of input data
    // Your validation logic goes here

    // Example SQL query to insert a new service into the database
    const query = `INSERT INTO services (categoryId, serviceName, type) 
                   VALUES (${categoryId}, '${serviceName}', '${type}')`;

    // Execute the SQL query
    await executeQuery(query);

    res.status(201).json({ message: 'Service created successfully' });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Failed to create service' });
  }
};

// Controller function to retrieve all services
export const getAllServices = async (req: Request, res: Response) => {
  try {
    // Example SQL query to retrieve all services from the database
    const query = 'SELECT * FROM services';

    // Execute the SQL query
    const services = await executeQuery(query);

    res.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

// Controller function to update a service
export const updateService = async (req: Request, res: Response) => {
  try {
    // Extract service ID from request parameters
    const { serviceId } = req.params;

    // Extract updated service data from request body
    const { serviceName, type, priceOptions } = req.body;

    // Perform validation of input data
    // Your validation logic goes here

    // Example SQL query to update a service in the database
    const query = `UPDATE services 
                   SET serviceName = '${serviceName}', type = '${type}'
                   WHERE id = ${serviceId}`;

    // Execute the SQL query
    await executeQuery(query);

    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Failed to update service' });
  }
};

// Controller function to delete a service
export const deleteService = async (req: Request, res: Response) => {
  try {
    // Extract service ID from request parameters
    const { serviceId } = req.params;

    // Example SQL query to delete a service from the database
    const query = `DELETE FROM services WHERE id = ${serviceId}`;

    // Execute the SQL query
    await executeQuery(query);

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Failed to delete service' });
  }
};
