import { GraphQLError } from "graphql";
import { cvs, skills, users } from "../database/database";

export const Mutation = {
  createCv : (_ : any, {input} : any) => {
    console.log(input);
    const { name, age, job, skillIds, userId } = input;
    const id = cvs.length + 1;
    const newSkills = skills.filter((skill) => skillIds.includes(skill.id));
    const user = users.find((user) => user.id === userId);
    if (!user) {
      throw new GraphQLError (`user d'id ${userId} n'existe pas`
      ,
      {
        extensions: {
            http: {
                status: 404,
                headers: {
                "x-custom-header": "some-value",
                },
            },
        }
    });
    }
    const newCV = {
      id : id+"",
      name,
      age,
      job,
      skillIds,
      user: userId,
    };
    console.log(newCV);
    cvs.push(newCV);
    const returnCv = {
      id : id+"",
      name,
      age,
      job,
      user,
      skills : newSkills
    }
    return returnCv;
  }
}