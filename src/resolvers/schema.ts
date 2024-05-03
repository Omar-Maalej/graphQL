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
      return createCv(input, context);
    },
    async updateCv(
      _: any,
      { id, input }: { id: number; input: AsyncCvInfoInput }
    ) {
      return updateCv(id, input, context);
    },
    async deleteCv(_: any, { id }: { id: number }) {
      return deleteCv(id, context);
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

async function createCv(input: any, context: GraphQLContext): Promise<any> {
  console.log("AAAAAAAAAAAAAAAAAAAAAAA");
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
    (skillId: any) => !skillIdsFromDB.includes(skillId)
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
}

async function updateCv(id: number, input: any, context: GraphQLContext) {
  const cv = context.prisma.cv.findFirst({
    where: { id },
  });

  if (!cv) throw new GraphQLError(`Cv with id ${id} doesn't exist`);

  const { name, age, job, skillIds } = input;

  const updateData: any = {};

  if (name) updateData.name = name;
  if (age) updateData.age = age;
  if (job) updateData.job = job;

  if (skillIds) {
    const skills = await context.prisma.skill.findMany({
      where: {
        id: {
          in: skillIds,
        },
      },
    });

    const skillIdsFromDB = skills.map((skill) => skill.id);

    const missingSkillIds = skillIds.filter(
      (skillId: any) => !skillIdsFromDB.includes(skillId)
    );

    if (missingSkillIds.length > 0) {
      throw new GraphQLError(
        `Skills with IDs ${missingSkillIds.join(",")} not found.`
      );
    }
    updateData.skills = {
      set: skills.map((skill) => ({ id: skill.id })),
    };
  }

  const updatedCv = await context.prisma.cv.update({
    where: { id },
    data: updateData,
    include: {
      skills: true,
      user: true,
    },
  });
  return updatedCv;
}

async function deleteCv(id: number, context: GraphQLContext) {
  const cv: any = await getCVById(id, context);
  if (!cv) {
    throw new GraphQLError(`Cv with id ${id} doesn't exist`);
  }

  await context.prisma.cv.delete({
    where: { id },
  });

  return "Cv deleted successfully";
}
