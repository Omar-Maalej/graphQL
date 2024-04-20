const CV_ADDED = 'CV_ADDED';
const CV_UPDATED = 'CV_UPDATED';
const CV_DELETED = 'CV_DELETED';

export const Subscription = {
    cvAdded: {
        subscribe: (pubsub: any) => pubsub.subscribe(CV_ADDED),
        resolve: (payload: any) => {
            return payload;
        }
    },
    cvUpdated: {
        subscribe: (pubsub: any) => pubsub.subscribe(CV_UPDATED),
        resolve: (payload: any) => {
            return payload;
        }
    },
    cvDeleted: {
        subscribe: (pubsub: any) => pubsub.subscribe(CV_DELETED),
        resolve: (payload: any) => {
            return payload;
        }
    }
};
