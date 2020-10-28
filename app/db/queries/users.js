export default {
  create_users: ` INSERT INTO user(
    id,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    salt,
    role,
    profile_pics,
    is_active,
    created_at,
    updated_at
    ) VALUES( $1, $2, $3, $4, $5, $7, $8, $9, $10, $12, $13) RETURNING first_name, last_name, email, phone_number
    `,
  getUserByEmail: `
   SELECT
	  *
  FROM
	  users
  WHERE
    email = $1
    `
};
