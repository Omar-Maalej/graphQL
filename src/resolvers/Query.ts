import { GraphQLError } from "graphql";
import { cvs, skills, users } from "../database/database"

export const Query = {
  getAllCVs: () => {
    return cvs.map(cv => ({
      ...cv,
      user: users.find(user => user.id === cv.user),  
      skills: cv.skillIds.map(skillId => skills.find(skill => skill.id === skillId)),
    }));
  },

  getCVById: (_ : any, { id } : {id : string}) => {
    const cv= cvs.find((cv) => cv.id === id);
    console.log(cv);
    if(cv) return cv;
    else throw new GraphQLError("CV not found 404 error",
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

}