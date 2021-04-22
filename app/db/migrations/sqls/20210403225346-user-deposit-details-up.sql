CREATE TABLE IF NOT EXISTS user_deposit_bank_details(
    id SERIAL PRIMARY KEY,
    customer_id VARCHAR(20) NOT NULL,
    customer_code VARCHAR(20) NOT NULL,
    reference VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    auth_code VARCHAR(30) NOT NULL,
    last_four_digits NUMERIC NOT NULL,
    card_holder_name VARCHAR(100) NOT NULL,
    user_id VARCHAR REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);