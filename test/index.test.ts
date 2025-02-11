import { execute } from '../src';

describe('execute', () => {
  it('it should return an empty object', () => {
    const result = execute("MATCH (n) RETURN n");
    expect(result).toEqual({});
  });
});
