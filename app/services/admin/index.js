import query from "../../db/queries/auth";
import db from '../../db'

const { getAdminByEmail , getAdminById} = query;

const fetchAdminByEmail = async(email) => {
    return db.oneOrNone(getAdminByEmail, [email])
};

const fetchAdminById = async(id) => {
    return await db.oneOrNone(getAdminById, [id])
};



export { fetchAdminByEmail, fetchAdminById };