import query from '../../db/queries/auth';
import db from '../../db';

export const getUserByEmail = async(email) => db.oneOrNone(query.getUserByEmail, [ email ]);

export const getUserByUserByPhoneNumber = async(phoneNumber) => (
  db.oneOrNone(query.getUserByPhoneNumber, [ phoneNumber ])
);
