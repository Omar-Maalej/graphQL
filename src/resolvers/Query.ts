import { getAllCVs, getCVById, getUserById, getSkillById } from '../mockData';

export const Query = {
    getAllCVs: () => getAllCVs(),
    getCVById: (_: any, { id }: { id: string }) => getCVById(id),
    getUserById: (_: any, { id }: { id: string }) => getUserById(id),
    getSkillById: (_: any, { id }: { id: string }) => getSkillById(id),
};