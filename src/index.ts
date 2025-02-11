import Gun, { IGunInstance } from "gun";
const withCypherSupport = (gunInstance: IGunInstance = Gun()) => {
    return { execute: (query: string) => ({}) };
};
export { withCypherSupport };
