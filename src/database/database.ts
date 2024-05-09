import { Sequelize, QueryTypes } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '2001',
  database: 'test',
});

// Function to execute SQL query
export const executeQuery = async (query: string) => {
  try {
    // Execute the SQL query
    const result = await sequelize.query(query, { type: QueryTypes.SELECT });
    return result;
  } catch (error) {
    throw new Error('Failed to execute query');
  }
};

export { sequelize };
