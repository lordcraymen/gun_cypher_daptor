type CypherQuery = {
    type: "Query";
    clauses: Array<CypherClause>;
};

interface CypherClause {
    type: string;
    content: any;
}

// Define the clause handler type so that the db parameter is read‑only.
type clauseHandler = ({
    parameters,
    db,
    context,
  }: {
    parameters: any;
    db: Readonly<any>;
    context: any;
  }) => void;

export { type CypherQuery, type CypherClause, type clauseHandler };