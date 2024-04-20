// @ts-nocheck

import {  createYoga } from "graphql-yoga";
import { createPubSub } from '@graphql-yoga/subscription';
import { createServer } from "http";
import { schema } from "./schema/schema";



type PubSubEvents = {
    cvAdded: { cvAdded: any };
    cvUpdated: { cvUpdated: any };
    cvDeleted: { cvDeleted: any };
};


function main() {
    const pubSub = createPubSub<PubSubEvents>();
    const yoga = createYoga({ 
        schema,
        context: { pubSub } 
    });
    const server = createServer(yoga);
    server.listen(4000, () => {
        console.info("Server is running on http://localhost:4000/graphql");
    });
}

main();