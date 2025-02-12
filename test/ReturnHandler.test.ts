/* Example result of the query CREATE (a:Person {name:"Alison", age:42}), (b:Person {name:"Bob", age:42}), (c:Person {name:"Charles", age:41}) RETURN a, b, c
[
    {
      "keys": [
        "a",
        "b",
        "c"
      ],
      "length": 3,
      "_fields": [
        {
          "labels": [
            "Person"
          ],
          "properties": {
            "name": "Alison",
            "age": {
              "low": 42,
              "high": 0
            }
          },
          "elementId": "4:63c35a9c-7786-4358-ab32-aef0ea07e1f5:0"
        },
        {
          "labels": [
            "Person"
          ],
          "properties": {
            "name": "Bob",
            "age": {
              "low": 42,
              "high": 0
            }
          },
          "elementId": "4:63c35a9c-7786-4358-ab32-aef0ea07e1f5:1"
        },
        {
          "labels": [
            "Person"
          ],
          "properties": {
            "name": "Charles",
            "age": {
              "low": 41,
              "high": 0
            }
          },
          "elementId": "4:63c35a9c-7786-4358-ab32-aef0ea07e1f5:2"
        }
      ],
      "_fieldLookup": {
        "a": 0,
        "b": 1,
        "c": 2
      }
    }
  ]
*/

/* Example result of the query MATCH (a:Person) RETURN a.name
[
  {
    "keys": [
      "a.name"
    ],
    "length": 1,
    "_fields": [
      "Alison"
    ],
    "_fieldLookup": {
      "a.name": 0
    }
  },
  {
    "keys": [
      "a.name"
    ],
    "length": 1,
    "_fields": [
      "Bob"
    ],
    "_fieldLookup": {
      "a.name": 0
    }
  },
  {
    "keys": [
      "a.name"
    ],
    "length": 1,
    "_fields": [
      "Charles"
    ],
    "_fieldLookup": {
      "a.name": 0
    }
  },
] */

  /* Example for RETURN 42, 53
  [
  {
    "keys": [
      "42",
      "53"
    ],
    "length": 2,
    "_fields": [
      {
        "low": 42,
        "high": 0
      },
      {
        "low": 53,
        "high": 0
      }
    ],
    "_fieldLookup": {
      "42": 0,
      "53": 1
    }
  }
] */

import { ReturnHandler } from '../src/Handler/ReturnHandler';

describe('ReturnHandler', () => {
    it('should return an array of objects with the properties of the elements', async () => {
        const result = ReturnHandler({
        parameters: { variable: 'a' },
        context: { a: 10 }
        });
        expect(result).toStrictEqual({ a: 10 });
    });
    
    it('should return an array of objects with the properties of the elements', async () => {
        const result = ReturnHandler({
        parameters: { variable: 'a' },
        context: { a: { name: 'Alison', age: 42 } }
        });
        expect(result).toStrictEqual({ a: { name: 'Alison', age: 42 } });
    });
    
    it('should return an array of objects with the properties of the elements', async () => {
        const result = ReturnHandler({
        parameters: { variable: 'a' },
        context: { a: { name: 'Alison', age: 42 }, b: { name: 'Bob', age: 42 }, c: { name: 'Charles', age: 41 } }
        });
        expect(result).toStrictEqual({ a: { name: 'Alison', age: 42 }, b: { name: 'Bob', age: 42 }, c: { name: 'Charles', age: 41 } });
    });
    
    it('should return an array of objects with the properties of the elements', async () => {
        const result = ReturnHandler({
        parameters: { variable: 'a' },
        context: { a: { name: 'Alison', age: 42 }, b: { name: 'Bob', age: 42 }, c: { name: 'Charles', age: 41 } }
        });
        expect(result).toStrictEqual({ a: { name: 'Alison', age: 42 }, b: { name: 'Bob', age: 42 }, c: { name: 'Charles', age: 41 } });
    });
    
    it('should return an array of objects with the properties of the elements', async () => {
        const result = ReturnHandler({
        parameters: { variable: 'a' },
        context: { a: { name: 'Alison', age: 42 }, b: { name: 'Bob', age: 42 }, c: { name: 'Charles', age: 41 } }
        });
        expect(result).toStrictEqual({ a: { name: 'Alison', age: 42 }, b: { name: 'Bob', age: 42 }, c: { name: 'Charles', age: 41 } });
    });
});