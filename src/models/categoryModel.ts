import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database';

class Category extends Model {
  public id!: number;
  public categoryName!: string;
}

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
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false,
  }
);

export { Category };
