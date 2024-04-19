import { Cv, CvInfoInput } from "../Database/models";
import { cvs } from "../Database/mockdata";

let newCvs: Cv[] = cvs;
let cvIdCounter = 5;

export const Mutation = {
  createCv: (_: any, { input }: { input: CvInfoInput }) => {
    const { name, age, job, skillIds, userId } = input;

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
      throw new Error(`CV with ID ${id} not found.`);
    }
    cvs[index] = {
      ...cvs[index],
      ...input,
    };
    console.log(newCvs);

    return cvs[index];
  },
};
