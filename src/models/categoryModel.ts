// src/models/categoryModel.ts

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database'; // Assuming you have a Sequelize instance named 'sequelize'

// Define the Category model
class Category extends Model {
  public id!: number;
  public categoryName!: string;
}

// Initialize the Category model with attributes and options
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'Category', // Set the model name
    tableName: 'categories', // Set the table name (optional)
  }
);

export { Category };
