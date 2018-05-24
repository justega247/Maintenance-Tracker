import { Pool } from 'pg';
import dotenv from 'dotenv';
import devConfig from '../config/devconfig';
import testConfig from '../config/testconfig';

dotenv.config();

let connectionString;
const env = process.env.NODE_ENV;

if (env === 'development') {
  connectionString = devConfig;
} else {
  connectionString = testConfig;
}

const pool = new Pool(connectionString);

export default pool;
