import { Sequelize, QueryTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '2001',
  database: 'test',
});

export const executeQuery = async (query: string) => {
  try {
    const result = await sequelize.query(query, { type: QueryTypes.SELECT });
    return result;
  } catch (error) {
    throw new Error('Failed to execute query');
  }
};

export { sequelize };
