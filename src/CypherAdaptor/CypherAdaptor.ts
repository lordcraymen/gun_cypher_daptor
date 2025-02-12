import { CypherQuery } from "../types";
import { clauseHandler } from "../types";

function CypherAdaptor<SupportedClauses>(db: any) {
  // Freeze the db instance once so it cannot be overwritten.
  const frozenDb = Object.freeze(db);

  const events: Record<keyof SupportedClauses, clauseHandler> =
    {} as Record<keyof SupportedClauses, clauseHandler>;

  const execute = (ast: CypherQuery) => {
    return new Promise((resolve, reject) => {
      // Use a fresh context per query execution.
      const context = {};
      ast.clauses.forEach((clause) => {
        const handler = events[clause.type as keyof SupportedClauses];
        if (handler) {
          // Pass the frozenDb so that handlers cannot modify it.
          handler({ parameters: clause.content, db: frozenDb, context });
        } else {
          reject(`Unsupported clause: ${clause.type}`);
        }
      });
      resolve(context);
    });
  };

  const AdaptorInstance = {
    on: function <K extends keyof SupportedClauses>(
      event: K,
      handler: clauseHandler
    ) {
      events[event] = handler;
      return AdaptorInstance;
    },
    build: () => execute,
  };

  return AdaptorInstance;
}

export { CypherAdaptor };