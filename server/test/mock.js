import jwt from 'jsonwebtoken';

const { SECRET } = process.env;

export const expiredToken = jwt.sign({ id: 100 }, SECRET, {
  expiresIn: '.1s',
});

export const fakeToken = jwt.sign({ id: 1 }, SECRET, {
  expiresIn: '1d',
});

export const secondfakeToken = jwt.sign({ id: 111 }, SECRET, {
  expiresIn: '1d',
});
