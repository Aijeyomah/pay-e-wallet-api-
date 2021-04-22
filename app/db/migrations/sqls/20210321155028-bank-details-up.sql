CREATE TABLE IF NOT EXISTS user_withdrawal_bank_details(
    id  SERIAL PRIMARY KEY, 
    bank_code VARCHAR NOT NULL,
    user_id VARCHAR REFERENCES users(id) NOT NULL,
    account_number VARCHAR NOT NULL,
    account_name VARCHAR NOT NULL, 
    bank_name VARCHAR NOT NULL,
    recipient_code VARCHAR(50)  NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);