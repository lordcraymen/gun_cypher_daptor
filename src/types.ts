type CypherQuery = {
    type: "Query";
    clauses: Array<CypherClause>;
};

interface CypherClause {
    type: string;
    content: any;
}

export { CypherQuery };