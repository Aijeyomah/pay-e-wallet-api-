import query from "../../db/queries/auth";
import db from '../../db';

export const getUserByEmail = async(email) => {
    return db.oneOrNone(query.getUserByEmail, [email])
};

export const getUserByUserByPhoneNumber = async(phoneNumber) => {
    return db.oneOrNone(query.getUserByPhoneNumber, [phoneNumber])
};