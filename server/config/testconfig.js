import dotenv from 'dotenv';

dotenv.config();

const testConfig = {
  user: process.env.test_user,
  host: process.env.test_host,
  database: process.env.test_database,
  password: process.env.test_password,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

export default testConfig;
