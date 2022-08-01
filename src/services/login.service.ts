import Joi from 'joi';
import User from '../interfaces/users.interface';

function validateUser(data: User) {
  const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = loginSchema.validate(data);
  if (error) {
    error.name = 'ValidationError';
    throw error;
  }
  return data;
}

export default validateUser;