import moment from 'moment';
import db from '../db';
import query from '../db/queries/auth';
import { DBError } from '../utils';
import { moduleErrLogMessager } from '../utils/helpers';

const { createAdmin } = query;
/**
/**
 * Contains a schema that describes the admin resource on the app.
 * @class AdminModel
 */

class AdminModel {
  /**
     *Creates an instance of AdminModel.
     * @param {object} options - contains the required properties for creating an admin
     * @memberof AdminModel
     * @returns { AdminModel } - An instance of the AdminModel Model.
     * @constructor UserModel
     */
  constructor(options) {
    this.id = options.id;
    this.first_name = options.firstName;
    this.last_name = options.lastName;
    this.email = options.email;
    this.password = options.hash;
    this.salt = options.salt;
    this.phone_number = options.phone;
    this.role = options.role;
    this.profile_pics = options.profilePics;
    this.is_active = options.isActive;
    this.updated_at = moment();
  }

  /**
     * save an admin details in the database
     * @returns { object } - an object containing the admin's details
     * @memberof AdminModel
     */
  async save() {
    try {
      return db.oneOrNone(createAdmin, [
        this.id,
        this.first_name,
        this.last_name,
        this.email,
        this.phone_number,
        this.password,
        this.salt,
        this.role,
        this.is_active,
        this.updated_at,
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: '',
        message: e.message,
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default AdminModel;
