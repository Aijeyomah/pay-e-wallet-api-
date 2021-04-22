import db from '../db';
import query from '../db/queries/user';
import { DBError } from '../utils';
import { moduleErrLogMessager } from '../utils/helpers';

/**
/**
 * Contains a schema that describes the bank resource on the app.
 * @class BankModel
 */
class DepositModel {
  constructor(options) {
    this.customer_id = options.customer_id;
    this.customer_code = options.customer_code;
    this.reference = options.reference;
    this.email = options.email;
    this.auth_code = options.authorization_code;
    this.last_four_digits = options.last4;
    this.card_holder_name = options.fullName;
    this.user_id = options.user_id;
    this.card_type = options.card_type;
    this.signature = options.signature;
    this.card_expiry_date = options.expiryDate;
  }

  async save() {
    try {
      await db.oneOrNone(query.addDepositBankDetails, [
        this.customer_id,
        this.customer_code,
        this.reference,
        this.email,
        this.auth_code,
        this.last_four_digits,
        this.card_holder_name,
        this.user_id,
        this.card_type,
        this.signature,
        this.card_expiry_date,
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: 500,
        message: e.message,
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default DepositModel;
