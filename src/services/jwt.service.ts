import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import JwtToken from '../interfaces/jwt.interface';

dotenv.config();

const secret: Secret = process.env.JWT_SECRET || 'secret';

const signOptions: SignOptions = {
  expiresIn: '1h',
};

const getToken = (payload: JwtPayload): string => jwt.sign(payload, secret, signOptions);

const validateToken = (token: string): JwtToken => {
  try {
    const data = jwt.verify(token, secret) as JwtToken;
    return data;
  } catch (error) {
    const myError = new Error('Invalid token');
    myError.name = 'UnauthorizedError';
    throw myError;
  }
};

export { getToken, validateToken };