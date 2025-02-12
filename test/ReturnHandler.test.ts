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

import { CypherAdaptor } from "../src/CypherAdaptor";
import { Query } from "../src/types";
import { ReturnHandler } from "../src/Handler/ReturnHandler";

type SupportedClauses = {
  ReturnClause: { variable: string };
};

const execute = CypherAdaptor<SupportedClauses>({})
  .on("ReturnClause", ReturnHandler)
  .build();

describe("ReturnHandler", () => {
  test("should return a single primitive value", () => {
    const context = {};
    const QueryWithReturnClause: Query = {
      type: "Query",
      clauses: [{ type: "ReturnClause", content: { variable: "42" } }],
    };

    expect(execute(QueryWithReturnClause)).toStrictEqual([
      {
        keys: ["42"],
        length: 1,
        _fields: [{ low: 42, high: 0 }],
        _fieldLookup: { "42": 0 },
      },
    ]);
  });

  test("should return multiple primitive values", () => {
    const context = {};
    const QueryWithReturnClause: Query = {
      type: "Query",
      clauses: [
        { type: "ReturnClause", content: { variable: "42" } },
        { type: "ReturnClause", content: { variable: "53" } },
      ],
    };

    expect(execute(QueryWithReturnClause)).toStrictEqual([
      {
        keys: ["42", "53"],
        length: 2,
        _fields: [
          { low: 42, high: 0 },
          { low: 53, high: 0 },
        ],
        _fieldLookup: { "42": 0, "53": 1 },
      },
    ]);
  });

  test("should return a single string value", () => {
    const context = {};
    const QueryWithReturnClause: Query = {
      type: "Query",
      clauses: [{ type: "ReturnClause", content: { variable: "name" } }],
    };

    expect(execute(QueryWithReturnClause)).toStrictEqual([
      {
        keys: ["name"],
        length: 1,
        _fields: ["Alison"],
        _fieldLookup: { name: 0 },
      },
    ]);
  });

  test("should return multiple string values", () => {
    const context = {};
    const QueryWithReturnClause: Query = {
      type: "Query",
      clauses: [
        { type: "ReturnClause", content: { variable: "name" } },
        { type: "ReturnClause", content: { variable: "age" } },
      ],
    };

    expect(execute(QueryWithReturnClause)).toStrictEqual([
      {
        keys: ["name", "age"],
        length: 2,
        _fields: ["Alison", "Bob"],
        _fieldLookup: { name: 0, age: 1 },
      },
    ]);
  });

  it("should return a list of objects for RETURN a,b,c", () => {
    const context = {
      a: {
        label: "Person",
        values: [
          {
            _id: "4:63c35a9c-7786-4358-ab32-aef0ea07e1f5:0",
            name: "Alison",
            age: 42,
          },
        ],
      },
      b: {
        label: "Person",
        values: [
          {
            _id: "4:63c35a9c-7786-4358-ab32-aef0ea07e1f5:1",
            name: "Bob",
            age: 42,
          },
        ],
      },
      c: {
        label: "Person",
        values: [
          {
            _id: "4:63c35a9c-7786-4358-ab32-aef0ea07e1f5:2",
            name: "Charles",
            age: 41,
          },
        ],
      },
    };
    //Return a,b,c
    const QueryWithReturnClause: Query = {
        type: "Query",
        clauses: [
            { type: "ReturnClause", content: { variable: "a" } },
            { type: "ReturnClause", content: { variable: "b" } },
            { type: "ReturnClause", content: { variable: "c" } },
        ],
        };

    expect(execute(QueryWithReturnClause)).toStrictEqual([
        {
          keys: ["a", "b", "c"],
          length: 3,
          _fields: [
            {
              labels: ["Person"],
              properties: {
                name: "Alison",
                age: {
                  low: 42,
                  high: 0,
                },
              },
              elementId: "4:63c35a9c-7786-4358-ab32-aef0ea07e1f5:0",
            },
            {
              labels: ["Person"],
              properties: {
                name: "Bob",
                age: {
                  low: 42,
                  high: 0,
                },
              },
              elementId: "4:63c35a9c-7786-4358-ab32-aef0ea07e1f5:1",
            },
            {
              labels: ["Person"],
              properties: {
                name: "Charles",
                age: {
                  low: 41,
                  high: 0,
                },
              },
              elementId: "4:63c35a9c-7786-4358-ab32-aef0ea07e1f5:2",
            },
          ],
          _fieldLookup: { a: 0, b: 1, c: 2 },
        },
      ]);
  });
});
