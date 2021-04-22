import db from '../db';
import query from '../db/queries/auth';
import { DBError } from '../utils';
import { moduleErrLogMessager } from '../utils/helpers';

const { createUser } = query;

/**
/**
 * Contains a schema that describes the user resource on the app.
 * @class UserModel
 */
class UserModel {
  /**
     * Creates an instance of UserModel.
     * @param {object} options - contains the required properties for creating a user
     * @memberof UserModel
     * @returns { UserModel } - An instance of the UserModel Model.
     * @constructor UserModel
     */
  constructor(options) {
    this.id = options.id;
    this.first_name = options.firstName;
    this.last_name = options.lastName;
    this.email = options.email;
    this.password = options.hash;
    this.salt = options.salt;
    this.phone_number = options.phoneNumber;
  }

  /**
     * save a user details in the database
     * @returns { object } - an object containing the user's details
     * @memberof UserModel
     */
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
        this.salt,
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: 500,
        message: e.message,
        stack: e.stack,
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default UserModel;
