export default {
  createAdmin: ` INSERT INTO admin(
    id,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    salt,
    role,
    is_active,
    updated_at
    ) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, first_name, last_name, email, role 
    `,
  getAdminByEmail: `
   SELECT
	  *
  FROM
	  admin
  WHERE
    email = $1
  `,
  getAdminById: `
  SELECT
	  *
  FROM
	  admin
  WHERE
    id = $1
  `,
  createUsers: `INSERT INTO customers(
    id,
    phone_number,
    step
  )VALUES($1, $2, $3)
  `
  
};


