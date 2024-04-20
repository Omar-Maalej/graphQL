import { PubSub, createYoga } from "graphql-yoga";
import { createPubSub } from '@graphql-yoga/subscription';
import { createServer } from "http";
import { schema } from "./schema/schema";


type PubSubEvents = {
    cvAdded: [payload : any]
    cvUpdated: [payload : any]
    cvDeleted: [payload : any]
}

function main() {
    const pubSub = createPubSub(); // Change the type of pubSub
    const yoga = createYoga({ 
        schema,
        // context: {  pubSub } // Change 'pubsub' to 'pubSub'
    });
    const server = createServer(yoga);
    server.listen(4000, () => {
        console.info("Server is running on http://localhost:4000/graphql");
    });
}

main();