interface ASTNode {
    type: string;
  }

interface Query extends ASTNode {
  type: "Query";
  clauses: Array<Clause>;
};



interface Clause extends ASTNode {
  type: string;
  content: any;
}

interface ReturnClause extends Clause {
  type: "ReturnClause";
  // A list of projections. In Cypher, you can return expressions, properties, or computed values.
  projections: Projection[];
  // Optional modifier for distinct values.
  distinct?: boolean;
  // Optionally, an ORDER BY clause, as well as SKIP and LIMIT expressions.
  orderBy?: OrderByClause;
  skip?: Expression;
  limit?: Expression;
}

/**
 * ORDER BY clause used within RETURN to order results.
 */
interface OrderByClause extends ASTNode {
  type: "OrderByClause";
  // List of individual ordering items.
  orderItems: OrderItem[];
}

/**
 * A single ordering item.
 */
interface OrderItem extends ASTNode {
  type: "OrderItem";
  expression: Expression;
  // Either ascending (ASC) or descending (DESC).
  direction: "ASC" | "DESC";
}

/**
 * A projection in a RETURN clause.
 */
interface Projection extends ASTNode {
  type: "Projection";
  // The expression to be projected.
  expression: Expression;
  // Optional alias (AS clause).
  alias?: string;
}

/**
 * Base interface for expressions.
 *
 * This can be refined to include literal expressions, identifiers,
 * function calls, operator expressions, etc.
 */
interface Expression extends ASTNode {
  // A discriminant for the type of expression.
  type:
    | "Literal"
    | "Identifier"
    | "FunctionCall"
    | "OperatorExpression"
    | string;
  // Additional properties would depend on the expression kind.
  // For example, a literal might have a `value` property.
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

export { type Query, type Clause, type clauseHandler, type ReturnClause };
