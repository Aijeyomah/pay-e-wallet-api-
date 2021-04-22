export default {
  addWithdrawalBankDetails: `INSERT INTO user_withdrawal_bank_details(
        bank_code,
        user_id,
        account_number,
        account_name,
        bank_name, 
        recipient_code
    ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `,
  addDepositBankDetails: `INSERT INTO user_deposit_bank_details(
        customer_id,
        customer_code,
        reference,
        email,
        auth_code,
        last_four_digits,
        card_holder_name,
        user_id,
        card_type,
        signature,
        card_expiry_date
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
  `,
  getWalletUserByAccountNumber: `
      SELECT 
        *
      FROM
        user_withdrawal_bank_details
      WHERE
        account_number = $1
 `,
};
