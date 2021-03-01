import db from '../db';
import query from '../db/queries/auth';
import { DBError } from '../utils';
import { moduleErrLogMessager } from '../utils/helpers';

const { createUser } = query;
class UserModel {
  constructor(options) {
    this.id = options.id;
    this.first_name = options.firstName;
    this.last_name = options.lastName;
    this.email = options.email;
    this.password = options.hash;
    this.salt = options.salt;
    this.phone_number = options.phoneNumber;
  }

  async save() {
    try {
      logger.info('Saving Users details.....');
      return db.oneOrNone(createUser, [
        this.id,
        this.first_name,
        this.last_name,
        this.email,
        this.phone_number,
        this.password,
        this.salt
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: 500,
        message: e.message,
        stack: e.stack
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default UserModel;
