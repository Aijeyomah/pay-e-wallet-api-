export default {
  addBankDetails: `INSERT INTO bank_details(
        bank_id,
        user_id,
        account_number,
        account_name
    ) VALUES($1, $2, $3, $4) RETURNING account_name
    `,
};
