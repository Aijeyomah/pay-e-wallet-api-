import { assert } from 'chai';
import add from '../index';

describe('Basic Mocha String Test', () => {
  it('should return number of characters in a string', () => {
    assert.equal(add(4, 6), 10);
  });
  it('should return first character of the string', () => {
    assert.equal('Hello'.charAt(0), 'H');
  });
});
