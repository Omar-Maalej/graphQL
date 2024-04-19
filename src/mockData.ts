export const users = [
    {
      id: "1",
      name: "Aymen",
      email: "aymen@gmail.com",
      role: "ADMIN",
    },
  ];
  
  export const cvs = [
    {
      id: "12345",
      name: "FullStack Developer",
      age: 41,
      job: "Freelancer",
      owner: "1",
      skillIds: ["101", "102"],
    },
  ];
  
  export const skills = [
    {
      id: "101",
      designation: "JavaScript",
    },
    {
      id: "102",
      designation: "React",
    },
  ];
  
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