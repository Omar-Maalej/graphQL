import { cvs, skills, users } from "./mockdata";

export function getAllCVs() {
  return cvs.map((cv) => ({
    ...cv,
    user: users.find((user) => user.id === cv.userId),
    skills: cv.skillIds.map((skillId) =>
      skills.find((skill) => skill.id === skillId)
    ),
  }));
}

export function getCVById(id: string) {
  const cv = cvs.find((cv) => cv.id === id);
  return cv
    ? {
        ...cv,
        user: users.find((user) => user.id === cv.userId),
        skills: cv.skillIds.map((skillId) =>
          skills.find((skill) => skill.id === skillId)
        ),
      }
    : null;
}

export function getUserById(userId: string) {
  return users.find((user) => user.id === userId);
}

export function getSkillById(skillId: string) {
  return skills.find((skill) => skill.id === skillId);
}
