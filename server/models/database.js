import { Client } from 'pg';
import dotenv from 'dotenv';
import winston from 'winston';
import queries from './databaseModels';

dotenv.config();

let connectionString;
const env = process.env.NODE_ENV || 'development';

if (env === 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
} else if (env === 'development') {
  connectionString = process.env.DATABASE_URL_DEV;
} else {
  connectionString = process.env.DATABASE_URL_PROD;
}

const client = new Client(connectionString);

client.connect();

client.query(queries, (err, res) => {
  winston.log('info', (err, res));
  client.end();
});
