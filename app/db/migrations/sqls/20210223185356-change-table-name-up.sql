--ALTER TABLE customers ADD COLUMN registration_step VARCHAR(20) NOT NULL;

ALTER TABLE customers RENAME TO users;

