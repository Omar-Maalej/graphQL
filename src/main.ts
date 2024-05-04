// @ts-nocheck

import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";
import { resolvers } from "./resolvers/schema";

const fs = require("fs");
const path = require("path");

type PubSubEvents = {
  cvAdded: { cvAdded: any };
  cvUpdated: { cvUpdated: any };
  cvDeleted: { cvDeleted: any };
};

export const schema = createSchema({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "schema/schema.graphql"),
    "utf-8"
  ),
  // resolvers: {
  //   Query,
  //   Mutation,
  // },
  resolvers,
});

function main() {
  const pubSub = createPubSub<PubSubEvents>();
  const yoga = createYoga({ schema: schema, context: { pubSub } });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
