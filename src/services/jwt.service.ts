import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret: Secret = process.env.JWT_SECRET || 'secret';

const signOptions: SignOptions = {
  expiresIn: '1h',
};

const getToken = (payload: JwtPayload): string => jwt.sign(payload, secret, signOptions);

export default getToken;