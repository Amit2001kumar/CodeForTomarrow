// serviceModel.ts

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database'; // Assuming you have a Sequelize instance named 'sequelize'

// Define the Service model
class Service extends Model {
  public id!: number;
  public categoryId!: number;
  public serviceName!: string;
  public type!: string;
  public priceOptions!: string; // Assuming priceOptions is a JSON string representing an array of price options
  public readonly createdAt!: Date; // Add createdAt field
  public readonly updatedAt!: Date; // Add updatedAt field
}

// Initialize the Service model with attributes and options
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceOptions: {
      type: DataTypes.STRING,
      allowNull: false,
      // Add validation or JSON parsing logic if necessary
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'Service', // Set the model name
    tableName: 'services', // Set the table name (optional)
    timestamps: false, // Disable automatic management of createdAt and updatedAt columns
  }
);

export { Service };
