
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database'; // Assuming you have a Sequelize instance named 'sequelize'

// Define the Service model
class Service extends Model {
  public id!: number;
  public categoryId!: number;
  public serviceName!: string;
  public type!: string;

  // Add associations or methods here if needed
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
      type: DataTypes.ENUM('Normal', 'VIP'),
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'Service', // Set the model name
    tableName: 'services', // Set the table name (optional)
  }
);

export { Service };
