import dotenv from 'dotenv';

dotenv.config();

const devConfig = {
  user: process.env.dev_user,
  host: process.env.dev_host,
  database: process.env.dev_database,
  password: process.env.dev_password,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

export default devConfig;
