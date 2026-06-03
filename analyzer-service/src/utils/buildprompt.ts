import type { AnalysisInput } from "../interfaces/analysis.interface.js";

export const buildPrompt = (
  input: AnalysisInput,
  extraContext?: string,
): string => {
  const { jobTitle, jobDescription, cvContent } = input;
  const prompt = `You are an expert AI recruitment analyst and Applicant Tracking System (ATS).

Your task is to analyze a candidate's CV against a job posting and return ONLY a valid JSON object matching the required schema.

JOB TITLE:
${jobTitle}

JOB DESCRIPTION:
${jobDescription}

CANDIDATE CV:
${cvContent}

ANALYSIS INSTRUCTIONS:

1. Extract the following candidate information from the CV, ensure the data is consistent for all candidates:
   - Name
   - Email
   - Phone
   - Address
   - Total professional experience
   - Technical and non-technical skills
   - Education history
   - Certifications
   - Projects
   - Previous companies and employment durations

2. Compare the candidate profile against the job description.

3. Calculate:
   - SkillMatchPercentage (0-100)
   - ExperienceMatchPercentage (0-100)
   - AICVScore (0-100)

4. Scoring Guidelines:
   - Skills Match = 40%
   - Experience Relevance = 35%
   - Education & Certifications = 15%
   - Project Relevance = 10%

5. MissingSkills:
   - List important skills explicitly required in the job description but not found in the CV.
   - Do not invent missing skills.

6. AISummary:
   - Write a concise recruiter-style summary (3-5 sentences).
   - Highlight strengths.
   - Mention major gaps.
   - Explain why the candidate is or is not a strong fit.

7. Data Extraction Rules:
   - Use information only from the provided CV.
   - Do not hallucinate information.
   - If information is missing, use:
     - "" for strings
     - [] for arrays
     - 0 for numeric values

8. Experience Rules:
   - Estimate TotalExperience from employment history when possible.
   - If exact duration cannot be determined, provide a reasonable approximation.
   - Format example:
     "3 years 4 months"

9. Output Requirements:
   - Return ONLY valid JSON.
   - Do not include markdown.
   - Do not include explanations.
   - Do not include code blocks.

EXTRA CONTEXT:
${extraContext || ""}

Required JSON Schema:

{
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
}`;
  return prompt;
};
