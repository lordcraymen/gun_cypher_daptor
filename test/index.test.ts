import { withCypherSupport } from '../src';
import Gun from 'gun';

//set up a simple gun instance
const gun = Gun();

describe('withCypherSupport', () => {
  it('it should return an object with am execute method', () => {
    const gunWithCypher = withCypherSupport(gun);
    expect(gunWithCypher.execute("CREATE (a:Person) RETURN a")).toEqual({});
  });
});
