import { GraphQLError } from "graphql";
import { cvs, skills, users } from "../database/database"

export const Query = {
  getAllCVs: () => {
    return cvs.map(cv => ({
      ...cv,
      user: users.find(user => user.id === cv.user),  
      skills: cv.skillIds.map(skillId => skills.find(skill => skill.id === skillId)),
    }));
  }

}