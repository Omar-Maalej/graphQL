enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const users = [
  {
    id: "1",
    name: "Aymen",
    email: "aymen@gmail.com",
    role: Role.ADMIN,
  },
];

export const cvs = [
  {
    id: "12345",
    name: "FullStack Developer",
    age: 41,
    job: "Freelancer",
    user: "1",
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
