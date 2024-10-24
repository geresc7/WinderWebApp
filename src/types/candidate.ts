export interface Candidate {
  name: string;
  surnames: string;
  dateBirth: number;
  city: string;
  country: string;
  phoneNumber: number;
  email: string;
  studies: Array<{ school: string; title: string; startDate: number; endDate: number }>;
  workHistory: Array<{ company: string; position: string; startDate: number; endDate: number; description: string }>;
  softSkills: string[];
  hardSkills: string[];
  languages: Array<{ language: string; level: string; certificate: string }>;
  aboutMe: string;
  image: string | null;
}