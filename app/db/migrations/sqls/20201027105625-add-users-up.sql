CREATE TYPE admin_staff_role AS ENUM (
  'super_admin',
  'admin'

);
CREATE TABLE IF NOT EXISTS admin(
    id VARCHAR NOT NULL PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number INT,
    salt VARCHAR(100) NOT NULL,
    profile_pics VARCHAR,
    role admin_staff_role  NOT NULL DEFAULT ('admin'),
    is_active BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ 
 );

CREATE TYPE users_gender AS ENUM (
  'Female',
  'Male'
);
 CREATE TABLE IF NOT EXISTS customers(
    id VARCHAR NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    date_of_birth VARCHAR,
    gender users_gender NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number INT  NOT NULL,
    state VARCHAR(100) NOT NULL,
    lga  VARCHAR(100) NOT NULL,
    home_address  VARCHAR(100) NOT NULL,
    registration_step INT NULL,
    otp INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ 
)
