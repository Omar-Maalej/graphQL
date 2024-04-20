import { addCv, updateCv, deleteCv } from "../database/queries";

export const Mutation = {
    addCV: (_: any, { input }: { input: any }, { pubsub }: { pubsub: any }) => {
        const newCv = addCv(input);
        
        pubsub.publish('CV_ADDED', { cvAdded: newCv });
        
        return newCv;
    },
    updateCV: (_: any, { id, input }: { id: string, input: any }, { pubsub }: { pubsub: any }) => {
        const updatedCv = updateCv(id, input);
        
        pubsub.publish('CV_UPDATED', { cvUpdated: updatedCv });
        
        return updatedCv;
    },
    deleteCV: (_: any, { id }: { id: string }, { pubsub }: { pubsub: any }) => {
        deleteCv(id);
        
        pubsub.publish('CV_DELETED', { cvDeleted: id });
        
        return id;
    }
};