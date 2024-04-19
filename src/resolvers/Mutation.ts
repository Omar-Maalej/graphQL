import { Cv, CvInfoInput } from "../Database/models";
import { cvs, skills, users } from "../Database/mockdata";
import { GraphQLError } from "graphql";

let newCvs: Cv[] = cvs;
let cvIdCounter = 5;

function checkSkills(skillIds: String[]): void {
  if (skillIds.length > 0) {
    skillIds.forEach((skillId) => {
      const skillIndex = skills.findIndex((skill) => skill.id === skillId);
      if (skillIndex === -1) {
        throw new GraphQLError(`Skill with id ${skillId} not found`);
      }
    });
  }
}

function checkUser(userId: String): void {
  if (userId) {
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new GraphQLError(`User with id ${userId} not found`);
    }
  }
}

export const Mutation = {
  createCv: (_: any, { input }: { input: CvInfoInput }) => {
    const { name, age, job, skillIds, userId } = input;

    checkSkills(skillIds);
    checkUser(userId);

    const newCv: Cv = {
      id: String(cvIdCounter++),
      name,
      age,
      job,
      skillIds,
      userId,
    };

    cvs.push(newCv);
    console.log(newCvs);
    return newCv;
  },

  updateCv: (_: any, { id, input }: { id: string; input: CvInfoInput }) => {
    const index = cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      throw new GraphQLError(`CV with ID ${id} not found.`);
    }
    checkSkills(input.skillIds);
    checkUser(input.userId);

    cvs[index] = {
      ...cvs[index],
      ...input,
    };
    console.log(newCvs);

    return cvs[index];
  },
  deleteCv: (_: any, { id }: { id: string }) => {
    const index = cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      throw new GraphQLError(`CV with ID ${id} not found.`);
    }
    const deletedCvs = cvs.splice(index, 1)[0];
    console.log(deletedCvs);

    return "Cv deleted successfully";
  },
};
