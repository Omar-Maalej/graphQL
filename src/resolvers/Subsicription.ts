const CV_ADDED = 'CV_ADDED';
const CV_UPDATED = 'CV_UPDATED';
const CV_DELETED = 'CV_DELETED';

export const Subscription = {
    cvAdded: {
        subscribe: (parent: any, args: any, context: any) => { 
            return context.pubSub.subscribe(CV_ADDED) },
        resolve: (payload: any) => {
            return payload.cvAdded;
        }
    },
    cvUpdated: {
        subscribe: (parent: any, args: any, context: any) => context.pubSub.subscribe(CV_UPDATED),
        resolve: (payload: any) => {
            return payload.cvUpdated;
        }
    },
    cvDeleted: {
        subscribe: (parent: any, args: any, context: any) => context.pubSub.subscribe(CV_DELETED),
        resolve: (payload: any) => {
            return payload.cvDeleted;
        }
    }
};

