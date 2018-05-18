import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Maintenance-Tracker App (version 1).',
}));

app.get('*', (req, res) => res.status(200).send({
  message: 'Please, check your route details',
}));

export default app;
