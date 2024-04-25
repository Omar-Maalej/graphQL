import { addCv, updateCv, deleteCv } from "../database/queries";

export const Mutation = {
    createCV: (_: any, { input }: { input: any }, context: any) => {
        const newCv = addCv(input);
       
        return newCv;
    },
    updateCV: (_: any, { id, input }: { id: string, input: any }, context: any) => {
        const updatedCv = updateCv(id, input);
        
       
        
        return updatedCv;
    },
    deleteCV: (_: any, { id }: { id: string }, context: any) => {
        deleteCv(id);
        
        
        return id;
    }
};