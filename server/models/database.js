import { Pool } from 'pg';
import dotenv from 'dotenv';
import winston from 'winston';
import devConfig from '../config/devconfig';
import testConfig from '../config/testconfig';
import queries from './databaseModels';

dotenv.config();

let connectionString;
const env = process.env.NODE_ENV;

if (env === 'development') {
  connectionString = devConfig;
} else {
  connectionString = testConfig;
}

const pool = new Pool(connectionString);

pool.query(queries, (err, res) => {
  winston.log('info', (err, res));
  pool.end();
});