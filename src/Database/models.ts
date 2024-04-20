export interface Cv {
  id: string;
  name: string;
  age: number;
  job: string;
  skillIds: string[];
  userId: string;
}

export interface Skill {
  id: string;
  designation: string;
  cvIds: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  cvIds: string[];
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface CvInfoInput {
  name: string;
  age: number;
  job: string;
  skillIds: string[];
  userId: string;
}

export interface AsyncCvInfoInput {
  name: string;
  age: number;
  job: string;
  skillIds: number[];
  userId: number;
}
