import { Cv, Role, Skill, User } from "./models";

export const skills: Skill[] = [
    { id: "1", designation: "Programming", cvIds: ["1", "2", "3"] },
    { id: "2", designation: "Design", cvIds: ["4"] },
    { id: "3", designation: "Marketing", cvIds: ["5"] },
    { id: "4", designation: "Customer Service", cvIds: ["6"] },
  ];
  
  export const cvs: Cv[] = [
    {
      id: "1",
      name: "Michael Johnson",
      age: 28,
      job: "Software Developer",
      skillIds: ["1", "2"],
      userId: "1",
    },
    {
      id: "2",
      name: "Emily Watson",
      age: 25,
      job: "Graphic Designer",
      skillIds: ["2"],
      userId: "2",
    },
    {
      id: "3",
      name: "David Lee",
      age: 30,
      job: "Marketing Specialist",
      skillIds: ["3"],
      userId: "3",
    },
    {
      id: "4",
      name: "Sophia Martinez",
      age: 32,
      job: "Customer Support Manager",
      skillIds: ["4"],
      userId: "4",
    },
    {
      id: "5",
      name: "Oliver Brown",
      age: 27,
      job: "Marketing Analyst",
      skillIds: ["3"],
      userId: "5",
    },
    {
      id: "6",
      name: "Isabella Taylor",
      age: 29,
      job: "Customer Service Representative",
      skillIds: ["4"],
      userId: "6",
    },
  ];
  
  export const users: User[] = [
    {
      id: "1",
      name: "Admin",
      email: "admin@example.com",
      role: Role.ADMIN,
      cvIds: ["1"],
    },
    {
      id: "2",
      name: "Marketing Manager",
      email: "manager@example.com",
      role: Role.USER,
      cvIds: ["2", "3"],
    },
    {
      id: "3",
      name: "Customer Support Supervisor",
      email: "supervisor@example.com",
      role: Role.USER,
      cvIds: ["4", "6"],
    },
    {
      id: "4",
      name: "Marketing Director",
      email: "director@example.com",
      role: Role.USER,
      cvIds: ["5"],
    },
    {
      id: "5",
      name: "Customer Service Manager",
      email: "csmanager@example.com",
      role: Role.USER,
      cvIds: ["6"],
    },
  ];
  