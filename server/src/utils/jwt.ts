import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signToken = (id: string): string => {
  // @ts-ignore - signOptions types can be picky with string vs number for expiresIn
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, env.JWT_SECRET);
};
