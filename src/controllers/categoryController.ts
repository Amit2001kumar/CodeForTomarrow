// categoryController.ts

import { Request, Response } from 'express';
import { Category } from '../models/categoryModel';
import { Service } from '../models/serviceModel';

// Controller function to create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;

    // Check if categoryName is provided
    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Create a new category
    const newCategory = await Category.create({ categoryName });

    res.status(201).json({ category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a list of all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a category by ID
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    const categoryId = parseInt(req.params.categoryId, 10);

    // Check if categoryName is provided
    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Update the category
    const updatedCategory = await Category.update({ categoryName }, { where: { id: categoryId } });

    if (updatedCategory[0] === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to remove a category by ID
export const removeEmptyCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    // Check if categoryId is provided
    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    // Check if the category has associated services
    const serviceCount = await Service.count({ where: { categoryId } });
    if (serviceCount > 0) {
      return res.status(400).json({ message: 'Cannot delete category with associated services' });
    }

    // Remove the category
    const deletedCategoryCount = await Category.destroy({ where: { id: categoryId } });

    if (deletedCategoryCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
