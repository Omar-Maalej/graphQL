import { cvs, skills, users } from './mockData';

export function getAllCVs() {
    return cvs.map(cv => ({
      ...cv,
      owner: users.find(user => user.id === cv.owner),
      skills: cv.skillIds.map(skillId => skills.find(skill => skill.id === skillId)),
    }));
  }
  
export function getCVById(id: string) {
  console.log(id);
    const cv = cvs.find(cv => cv.id == id);
    console.log(cv);
    return cv ? {
      ...cv,
      owner: users.find(user => user.id === cv.owner),
      skills: cv.skillIds.map(skillId => skills.find(skill => skill.id === skillId)),
    } : null;
}
  
export function getUserById(userId: string) {
  return users.find(user => user.id === userId);
}
  

export function getSkillById(skillId: string) {
  return skills.find(skill => skill.id === skillId);
}


// export function addCv
export function addCv(input: any) {
  console.log(input.name);
  console.log(input.ownerId);
  const userExists = users.some(user => user.id === input.ownerId);
      if (!userExists) {
        throw new Error("Owner user does not exist.");
      }

      console.log(userExists);

      // Vérifier l'existence de toutes les compétences
      const allSkillsExist = input.skillIds.every((skillId: string) => skills.some(skill => skill.id === skillId));
      if (!allSkillsExist) {
        throw new Error("One or more skills do not exist.");
      }

      // Générer un nouvel ID pour le CV
        const newCVId = (parseInt(cvs[cvs.length - 1].id) + 1).toString();

        // Créer le nouveau CV
        const newCV = {
          id: newCVId,
          name: input.name,
          age: input.age,
          job: input.job,
          owner: input.ownerId, // Update the type to string
          skillIds: input.skillIds,
      };
        // Ajouter le nouveau CV à la liste des CVs
        console.log("newCV", newCV);
        cvs.push(newCV);

      // Renvoyer le nouveau CV
      return getCVById(newCVId);

}


export const updateCv = (id : String, input: any) => {
  console.log("updateCv", id);
  console.log("updateCv", input);
  const cv = cvs.find(cv => cv.id === id);
  if (!cv) {
    throw new Error("CV not found.");
  }

  // Vérifier l'existence de toutes les compétences
  if(input.skillIds){
    const allSkillsExist = input.skillIds.every((skillId: string) => skills.some(skill => skill.id === skillId));
    if (!allSkillsExist) {
      throw new Error("One or more skills do not exist.");
    }
    cv.skillIds = input.skillIds;
  }

  if(input.ownerId){
    const userExists = users.some(user => user.id === input.ownerId);
    if (!userExists) {
      throw new Error("Owner user does not exist.");
    }
    cv.owner = input.ownerId;
  }

  // Mettre à jour le CV
  // cv.name = input.name;
  // cv.age = input.age;
  // cv.job = input.job;
  //update them dynamically using keys
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