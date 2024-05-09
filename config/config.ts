// config/config.ts
export const config = {
  secretKey: 'your_secret_key',
  db: {
    //   host: 'localhost',
    //   user: 'root',
    //   password: 'password',
    //   database: 'category_service_db',
    host: 'localhost',
    user: 'root',
    password: '2001',
    database: 'test'
  },
};


import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql', // Change this to your database dialect (e.g., 'mysql', 'postgres', 'sqlite')
  host: 'localhost',
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
});

export { sequelize };
