import query from '../../db/queries/auth';
import db from '../../db';

const { getAdminByEmail, getAdminById } = query;

const fetchAdminByEmail = async(email) => db.oneOrNone(getAdminByEmail, [ email ]);

const fetchAdminById = async(id) => await db.oneOrNone(getAdminById, [ id ]);

export { fetchAdminByEmail, fetchAdminById };
