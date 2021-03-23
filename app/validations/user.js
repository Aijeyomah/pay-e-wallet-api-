import Joi from '@hapi/joi';
import { textSchema, emailSchema } from './generic';

export const signUpAdminSchema = Joi.object({
  firstName: textSchema(Joi, 'first_name', 32, 2),
  lastName: textSchema(Joi, 'last_name', 32, 2),
  email: emailSchema(Joi),
  password: textSchema(Joi, 'password', 100, 5),
  role: textSchema(Joi, 'role', 10, 5),
  userType: textSchema(Joi, 'userType', 10, 5),
});

export const loginSchema = Joi.object({
  password: textSchema(Joi, 'password', 100, 5),
  email: emailSchema(Joi, 'email'),
  userType: textSchema(Joi, 'userType', 10, 2),
});

export const createUserSchema = Joi.object({
  firstName: textSchema(Joi, 'first_name', 32, 2),
  lastName: textSchema(Joi, 'last_name', 32, 2),
  email: emailSchema(Joi),
  password: textSchema(Joi, 'password', 100, 5),
  gender: textSchema(Joi, 'gender', 10, 2),
  phoneNumber: textSchema(Joi, 'phone_number', 11, 6),
  userType: textSchema(Joi, 'userType', 10, 5),
});
