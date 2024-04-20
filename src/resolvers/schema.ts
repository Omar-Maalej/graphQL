import { makeExecutableSchema } from "@graphql-tools/schema";
import { createContext, type GraphQLContext } from "../context";
import { AsyncCvInfoInput } from "../Database/models";
import { GraphQLError } from "graphql";

const context = createContext();

export const resolvers = {
  Query: {
    getAllCvs: () => getAllCVs(context),
    getCvById: (_: any, { id }: { id: number }) => getCVById(id, context),
    getUserById: (_: any, { id }: { id: number }) => getUserById(id, context),
    getSkillById: (_: any, { id }: { id: number }) => getSkillById(id, context),
  },

  Mutation: {
    async createCv(_: any, { input }: { input: AsyncCvInfoInput }) {
      const { name, age, job, skillIds, userId } = input;
      const skills = await context.prisma.skill.findMany({
        where: {
          id: {
            in: skillIds,
          },
        },
      });

      const skillIdsFromDB = skills.map((skill) => skill.id);

      const missingSkillIds = skillIds.filter(
        (skillId) => !skillIdsFromDB.includes(skillId)
      );

      if (missingSkillIds.length > 0) {
        throw new GraphQLError(
          `Skills with IDs ${missingSkillIds.join(",")} not found.`
        );
      }

      const newCv = await context.prisma.cv.create({
        data: {
          name,
          age,
          job,
          userId: userId as number,
          skills: {
            connect: skills.map((skill) => ({ id: skill.id })),
          },
        },

        include: {
          skills: true,
          user: true,
        },
      });
      return newCv;
    },
    async updateCv(
      _: any,
      { id, input }: { id: number; input: AsyncCvInfoInput }
    ) {
      const cv = context.prisma.cv.findFirst({
        where: { id },
      });

      const { name, age, job, skillIds, userId } = input;

      if (!cv) throw new GraphQLError(`Cv with id ${id} doesn't exist`);

      const skills = await context.prisma.skill.findMany({
        where: {
          id: {
            in: skillIds,
          },
        },
      });

      const skillIdsFromDB = skills.map((skill) => skill.id);

      const missingSkillIds = skillIds.filter(
        (skillId) => !skillIdsFromDB.includes(skillId)
      );

      if (missingSkillIds.length > 0) {
        throw new GraphQLError(
          `Skills with IDs ${missingSkillIds.join(",")} not found.`
        );
      }

      const updatedCv = await context.prisma.cv.update({
        where: { id },
        data: {
          name,
          age,
          job,
          userId: userId as number,
          skills: {
            connect: skills.map((skill) => ({ id: skill.id })),
          },
        },
        include: {
          skills: true,
          user: true,
        },
      });
      return updatedCv;
    },
    async deleteCv(_: any, { id }: { id: number }, context: GraphQLContext) {
      const cv = await getCVById(id, context);

      if (1 == 1) {
        throw new GraphQLError(`Cv with id ${id} doesn't exist`);
      }

      await context.prisma.cv.delete({
        where: { id },
      });

      return "Cv deleted successfully";
    },
  },
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
