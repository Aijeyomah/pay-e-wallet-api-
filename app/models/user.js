import db from '../db';
import query from '../db/queries/users';
import { generateId } from '../utils/helpers';

const { create_users } = query;
/**
/**
 * Contains a schema that describes the user resource on the app.
 * @class userModel
 */

class UserModel {
  /**
   *Creates an instance of UserModel.
   * @param {object} options - contains the required properties for creating a user
   * @memberof UserModel
   * @returns { UserModel } - An instance of the User Model.
   * @constructor UserModel
   */
  constructor(options) {
    this.id = generateId;
    this.first_name = options.firstName;
    this.last_name = options.lastName;
    this.email = options.email;
    this.password = options.hash;
    this.salt = options.salt;
    this.phone_number = options.phone;
    this.role = options.role;
    this.profile_pics = options.profilePics;
    this.is_active = options.isActive;
    this.created_at = options.createdAt;
    this.updated_at = options.updatedAt;
  }

  async save() {
    db.oneOrNone(create_users, [
      this.id,
      this.first_name,
      this.last_name,
      this.email,
      this.password,
      this.salt,
      this.phone_number,
      this.role,
      this.profile_pics,
      this.is_active,
      this.created_at,
      this.updated_at,
    ]);
  }
}

export default UserModel;
