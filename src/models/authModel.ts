// authModel.ts

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database'; // Import the Sequelize instance

// Define the User model
class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model with attributes and options
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'User', // Set the model name
    tableName: 'UserList', // Set the table name (optional)
  }
);

export { User };
