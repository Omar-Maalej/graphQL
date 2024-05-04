import { createContext, type GraphQLContext } from "../context";
import { AsyncCvInfoInput } from "../Database/models";
import { GraphQLError } from "graphql";

const context = createContext();

export const Query = {
  getAllCvs: () => getAllCVs(context),
  getCvById: (_: any, { id }: { id: number }) => getCVById(id, context),
  getUserById: (_: any, { id }: { id: number }) => getUserById(id, context),
  getSkillById: (_: any, { id }: { id: number }) => getSkillById(id, context),
};

async function getAllCVs(context: GraphQLContext) {
  return await context.prisma.cv.findMany({
    include: {
      skills: true,
      user: true,
    },
  });
}

async function getCVById(id: number, context: GraphQLContext) {
  const cv = await context.prisma.cv.findFirst({
    where: { id },
    include: {
      user: true,
      skills: true,
    },
  });
  return cv ? cv : null;
}

async function getUserById(id: number, context: GraphQLContext) {
  const user = await context.prisma.user.findFirst({
    where: { id },
  });
  return user ? user : null;
}

async function getSkillById(id: number, context: GraphQLContext) {
  const skill = await context.prisma.skill.findFirst({
    where: { id },
  });
  return skill ? skill : null;
}
