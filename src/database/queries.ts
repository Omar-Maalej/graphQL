import { cvs, skills, users } from './database';

export function getAllCVs() {
    return cvs.map(cv => ({
      ...cv,
      user: users.find(user => user.id === cv.user),
      skills: cv.skillIds.map(skillId => skills.find(skill => skill.id === skillId)),
    }));
  }
  
export function getCVById(id: string) {
  console.log(id);
    const cv = cvs.find(cv => cv.id == id);
    console.log(cv);
    return cv ? {
      ...cv,
      user: users.find(user => user.id === cv.user),
      skills: cv.skillIds.map(skillId => skills.find(skill => skill.id === skillId)),
    } : null;
}
  
export function getUserById(userId: string) {
  return users.find(user => user.id === userId);
}
  

export function getSkillById(skillId: string) {
  return skills.find(skill => skill.id === skillId);
}


export function addCv(input: any) {
  console.log(input.name);
  console.log(input.userId);
  const userExists = users.some(user => user.id === input.userId);
      if (!userExists) {
        throw new Error("user user does not exist.");
      }

      console.log(userExists);

   
      const allSkillsExist = input.skillIds.every((skillId: string) => skills.some(skill => skill.id === skillId));
      if (!allSkillsExist) {
        throw new Error("One or more skills do not exist.");
      }

    
        const newCVId = (parseInt(cvs[cvs.length - 1].id) + 1).toString();

       
        const newCV = {
          id: newCVId,
          name: input.name,
          age: input.age,
          job: input.job,
          user: input.userId, 
          skillIds: input.skillIds,
      };
       
        console.log("newCV", newCV);
        cvs.push(newCV);

    
      return getCVById(newCVId);

}


export const updateCv = (id : String, input: any) => {
  console.log("updateCv", id);
  console.log("updateCv", input);
  const cv = cvs.find(cv => cv.id === id);
  if (!cv) {
    throw new Error("CV not found.");
  }

  
  if(input.skillIds){
    const allSkillsExist = input.skillIds.every((skillId: string) => skills.some(skill => skill.id === skillId));
    if (!allSkillsExist) {
      throw new Error("One or more skills do not exist.");
    }
    cv.skillIds = input.skillIds;
  }

  if(input.userId){
    const userExists = users.some(user => user.id === input.userId);
    if (!userExists) {
      throw new Error("user user does not exist.");
    }
    cv.user = input.userId;
  }

 
  if(input.name){
    cv.name = input.name;
  }

  if(input.age){
    cv.age = input.age;
  }

  if(input.job){
    cv.job = input.job;
  }

  

  // Renvoyer le CV mis à jour
  return getCVById(cv.id);

}

export const deleteCv = (id: string) => {
  const cv = cvs.find(cv => cv.id === id);
  if (!cv) {
    throw new Error("CV not found.");
  }

  const cvIndex = cvs.findIndex(cv => cv.id === id);
  cvs.splice(cvIndex, 1);

  return id;
}