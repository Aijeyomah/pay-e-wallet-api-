import { assert } from 'chai';

describe('Basic Mocha String Test', () => {
  it('should return first character of the string', () => {
    assert.equal('Hello'.charAt(0), 'H');
  });
});
