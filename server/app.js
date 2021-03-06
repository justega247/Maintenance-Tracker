import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import requestRoutes from './routes/requestRoutes';

const app = express();

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/requests', requestRoutes);

app.use('/', express.static(path.join(__dirname, '../client/public/dist')));

app.get('/api/v1', (req, res) => res.status(200).json({
  message: 'Welcome to the maintenance tracker app version(1)',
}));

app.get('*', (req, res) => res.status(400).json({
  message: 'Please, check your route details',
}));

export default app;
