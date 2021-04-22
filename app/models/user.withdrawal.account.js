import db from '../db';
import query from '../db/queries/user';
import { DBError } from '../utils';
import { moduleErrLogMessager } from '../utils/helpers';

/**
/**
 * Contains a schema that describes the bank resource on the app.
 * @class WithdrawalModel
 */
class WithdrawalModel {
  constructor(options) {
    this.bank_code = options.bank_code;
    this.user_id = options.user_id;
    this.account_name = options.account_name;
    this.account_number = options.account_number;
    this.bank_name = options.bank_name;
    this.recipient_code = options.recipient_code;
  }

  async saveUser() {
    try {
      logger.info('Saving bank details.....');
      await db.oneOrNone(query.addWithdrawalBankDetails, [
        this.bank_code,
        this.user_id,
        this.account_number,
        this.account_name,
        this.bank_name,
        this.recipient_code,
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

export default WithdrawalModel;
