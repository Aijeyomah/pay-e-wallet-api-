CREATE TABLE  IF NOT EXISTS bank_details(
    id  SERIAL PRIMARY KEY, 
    bank_id INT NOT NULL,
    user_id VARCHAR REFERENCES users(id) NOT NULL,
    account_number INT NOT NULL,
    account_name VARCHAR NOT NULL
);