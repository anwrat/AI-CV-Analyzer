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
  EducationDetails: {
    Degree: string;
    Institution: string;
    Year: string;
  }[];
  Certifications: string[];
  ProjectDetails: {
    Name: string;
    Description: string;
  }[];
  PreviousCompanieswithDuration: {
    Company: string;
    StartDate: string;
    EndDate: string;
    Role: string;
  }[];
  AICVScore: number;
  SkillMatchPercentage: number;
  ExperienceMatchPercentage: number;
  MissingSkills: string[];
  AISummary: string;
}
