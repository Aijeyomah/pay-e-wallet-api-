ALTER TABLE user_deposit_bank_details ADD COLUMN card_type VARCHAR NOT NULL;
ALTER TABLE user_deposit_bank_details ADD COLUMN signature VARCHAR NOT NULL;
ALTER TABLE user_deposit_bank_details ADD COLUMN card_expiry_date VARCHAR NOT NULL;