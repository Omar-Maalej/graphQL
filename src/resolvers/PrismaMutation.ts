import { createContext, type GraphQLContext } from "../context";
import { AsyncCvInfoInput } from "../Database/models";
import { GraphQLError } from "graphql";

const context = createContext();

export const Mutation = {
  async createCv(
    _: any,
    { input }: { input: AsyncCvInfoInput },
    contextPubSub: any
  ) {
    const cv = await createCv(input, context);
    contextPubSub.pubSub.publish("CV_ADDED", { cvAdded: cv });
    return cv;
  },
  async updateCv(
    _: any,
    { id, input }: { id: number; input: AsyncCvInfoInput },
    contextPubSub: any
  ) {
    const cv = await updateCv(id, input, context);
    contextPubSub.pubSub.publish("CV_UPDATED", { cvUpdated: cv });
    return cv;
  },
  async deleteCv(_: any, { id }: { id: number }, contextPubSub: any) {
    const deleteMessage = await deleteCv(id, context);
    contextPubSub.pubSub.publish("CV_DELETED", { cvDeleted: id });
    return deleteMessage;
  },
};

async function createCv(input: any, context: GraphQLContext): Promise<any> {
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
  const cv = await context.prisma.cv.findFirst({
    where: { id },
  });
  if (!cv) {
    throw new GraphQLError(`Cv with id ${id} doesn't exist`);
  }

  await context.prisma.cv.delete({
    where: { id },
  });

  return "Cv deleted successfully";
}
