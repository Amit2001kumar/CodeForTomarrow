export const config = {
  secretKey: 'your_secret_key',
  db: {
    host: 'localhost',
    user: 'root',
    password: '2001',
    database: 'test'
  },
};


import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost',
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
});

export { sequelize };
