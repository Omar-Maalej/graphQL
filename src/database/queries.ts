import { cvs, skills, users } from './mockData';

export function getAllCVs() {
    return cvs.map(cv => ({
      ...cv,
      owner: users.find(user => user.id === cv.owner),
      skills: cv.skillIds.map(skillId => skills.find(skill => skill.id === skillId)),
    }));
  }
  
export function getCVById(id: string) {
    const cv = cvs.find(cv => cv.id === id);
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