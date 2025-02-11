import Gun, { IGunInstance } from "gun";
import { CypherAdaptor } from "./CypherAdaptor/CypherAdaptor";

const withCypherSupport = (gunInstance: IGunInstance = Gun()) => {
    const CypherAdaptorInstance = CypherAdaptor(gunInstance).build();

    return { execute: (query:string) => CypherAdaptorInstance({ type: "Query", clauses: [] }) };
};
export { withCypherSupport };
