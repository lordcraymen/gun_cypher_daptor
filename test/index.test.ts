import { withCypherSupport } from '../src';
import Gun from 'gun';

//set up a simple gun instance
const gun = Gun();

describe('withCypherSupport', () => {
  it('it should return an object with am execute method', async () => {
    const gunWithCypher = withCypherSupport(gun);
    expect(await gunWithCypher.execute("RETURN")).toStrictEqual({});
  });
});
