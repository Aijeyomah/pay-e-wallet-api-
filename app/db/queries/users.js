export default {
  create_users: ` INSERT INTO USERS(
    id,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    salt,
    role,
    profile_pics,
    is_active
    ) VALUES( $1, $2, $3, $4, $5, $7, $8, $9, $10) RETURNING first_name, last_name, email, phone_number
    `,

};
