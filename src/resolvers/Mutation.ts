import { addCv, updateCv, deleteCv } from "../database/queries";

export const Mutation = {
    addCV: (_: any, { input }: { input: any }, context: any) => {
        const newCv = addCv(input);
        context.pubSub.publish('CV_ADDED', { cvAdded: newCv }); // Access pubSub from context
        return newCv;
    },
    updateCV: (_: any, { id, input }: { id: string, input: any }, context: any) => {
        const updatedCv = updateCv(id, input);
        
        context.pubSub.publish('CV_UPDATED', { cvUpdated: updatedCv }); // Access pubSub from context
        
        return updatedCv;
    },
    deleteCV: (_: any, { id }: { id: string }, context: any) => {
        deleteCv(id);
        
        context.pubSub.publish('CV_DELETED', { cvDeleted: id }); // Access pubSub from context
        
        return id;
    }
};