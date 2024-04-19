import { Cv, Role, Skill, User } from "./models";

export const skills: Skill[] = [
  { id: "1", designation: "Programming", cvIds: ["1", "2"] },
  { id: "2", designation: "Communication", cvIds: ["3"] },
  { id: "3", designation: "Project Management", cvIds: ["4"] },
  { id: "4", designation: "Problem Solving", cvIds: ["1"] },
];

export const cvs: Cv[] = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    job: "Software Engineer",
    skillIds: ["1", "4"],
    userId: "1",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 28,
    job: "Marketing Manager",
    skillIds: ["1"],
    userId: "2",
  },
  {
    id: "3",
    name: "Alice Johnson",
    age: 35,
    job: "Sales Executive",
    skillIds: ["2"],
    userId: "3",
  },
  {
    id: "4",
    name: "Bob Brown",
    age: 32,
    job: "Project Manager",
    skillIds: ["3"],
    userId: "4",
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: Role.ADMIN,
    cvIds: ["1"],
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: Role.USER,
    cvIds: ["2"],
  },
  {
    id: "3",
    name: "Sales Manager",
    email: "salesmanager@example.com",
    role: Role.USER,
    cvIds: ["3"],
  },
  {
    id: "4",
    name: "Project Manager",
    email: "projectmanager@example.com",
    role: Role.USER,
    cvIds: ["4"],
  },
];
