import { Request, Response } from 'express';
import { Service } from '../models/serviceModel';

export const addServiceToCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { serviceName, type, priceOptions } = req.body;

    if (!categoryId || !serviceName || !type || !priceOptions) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newService = await Service.create({
      categoryId,
      serviceName,
      type,
      priceOptions,
    });

    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a list of all services inside a category
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const services = await Service.findAll({ where: { categoryId } });

    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to remove a service from a category
export const removeService = async (req: Request, res: Response) => {
  try {
    const { categoryId, serviceId } = req.params;

    await Service.destroy({ where: { id: serviceId, categoryId } });

    res.status(200).json({ message: 'Service removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a service in a category
export const updateService = async (req: Request, res: Response) => {
  try {
    const { categoryId, serviceId } = req.params;
    const { serviceName, type, priceOptions } = req.body;

    const [updatedRows] = await Service.update(
      { serviceName, type, priceOptions },
      { where: { id: serviceId, categoryId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
