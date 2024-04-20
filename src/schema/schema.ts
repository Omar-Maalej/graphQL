import { createSchema } from "graphql-yoga";
import  { Query }  from "../resolvers/Query";
import { Mutation } from "../resolvers/Mutation";
import { Subscription } from "../resolvers/Subsicription";

const fs = require("fs");
const path = require("path");


export const schema = createSchema({
    typeDefs: fs.readFileSync(path.join(__dirname, "./schema.graphql"),"utf-8"),
    resolvers: {
        Query,
        Mutation,
        Subscription,
    },
});
