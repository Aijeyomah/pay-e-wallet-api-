import query from "../../db/queries/users";
import db from '../../db'

const { getUserByEmail } = query;

const fechUserByEmail = async(email) => {
    return db.oneOrNone(getUserByEmail, [email])
};

export { fechUserByEmail };