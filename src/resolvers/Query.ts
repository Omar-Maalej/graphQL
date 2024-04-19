import {
  getAllCVs,
  getCVById,
  getSkillById,
  getUserById,
} from "../Database/queries";

export const Query = {
  getAllCvs: () => getAllCVs(),
  getCvById: (_: any, { id }: { id: string }) => getCVById(id),
  getUserById: (_: any, { id }: { id: string }) => getUserById(id),
  getSkillById: (_: any, { id }: { id: string }) => getSkillById(id),
};
