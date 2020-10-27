import constant from '../constants';

const { MODULE_ERROR, MODULE_ERROR_STATUS } = constant;
/**
 *
 * a custom error class taht handles module error
 * @class ModuleError
 * @extends {Error}
 */
export default class ModuleError extends Error {
  /**
   * The ModuleError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @param {Array} options.errors - Additional error details if any.
   * @constructor ModuleError
   */
  constructor(options = {}) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = options.message || MODULE_ERROR;
    this.status = options.status || MODULE_ERROR_STATUS;
    if (options.errors) this.errors = options.errors;
  }
}
