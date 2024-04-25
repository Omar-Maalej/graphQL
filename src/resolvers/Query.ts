import { getAllCVs, getCVById, getUserById, getSkillById } from '../database/queries';

export const Query = {
    getAllCVs: () => getAllCVs(),
    getCVById: (_: any, { id }: { id: string }) => getCVById(id),
};