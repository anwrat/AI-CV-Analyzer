export interface AnalysisInput {
  jobTitle: string;
  jobDescription: string;
  cvContent: string;
}

export interface AnalysisOutput {
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  TotalExperience: string;
  Skills: string[];
  EducationDetails: string[];
  Certifications: string[];
  ProjectDetails: string[];
  PreviousCompanieswithDuration: string[];
  AICVScore: number;
  SkillMatchPercentage: number;
  ExperienceMatchPercentage: number;
  MissingSkills: string[];
  AISummary: string;
}
