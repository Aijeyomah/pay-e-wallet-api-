CREATE TYPE user_roles AS ENUM (
  'super admin',
  'staff',
  'user'

);
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number INT,
    salt VARCHAR(100) NOT NULL,
    profile_pics VARCHAR,
    role user_roles NOT NULL DEFAULT ('user'),
    is_active BOOLEAN,
    created_at TIMESTAMPTZ ,
    updated_at TIMESTAMPTZ 
 );
