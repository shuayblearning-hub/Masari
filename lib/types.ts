export interface ResumeLocation {
  city: string;
  region: string;
  countryCode: string;
}

export interface ResumeProfile {
  network: string;
  username: string;
  url: string;
}

export interface ResumeBasics {
  name: string;
  label: string;
  email: string;
  phone: string;
  summary: string;
  location: ResumeLocation;
  profiles: ResumeProfile[];
}

export interface ResumeWork {
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface ResumeEducation {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
}

export interface ResumeSkill {
  name: string;
  level: string;
  keywords: string[];
}

export interface ResumeLanguage {
  language: string;
  fluency: string;
}

export interface ResumeProject {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
}

export interface ResumeCertificate {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeAward {
  title: string;
  awarder: string;
  date: string;
  summary: string;
}

export interface Resume {
  basics: ResumeBasics;
  work: ResumeWork[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  languages: ResumeLanguage[];
  projects: ResumeProject[];
  certificates: ResumeCertificate[];
  awards: ResumeAward[];
}

export interface AnalysisSuggestion {
  id: string;
  section: string;
  field: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  currentContent: string;
  suggestedContent: string;
}

export interface ResumeAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  suggestions: AnalysisSuggestion[];
}

export const EMPTY_RESUME: Resume = {
  basics: {
    name: '',
    label: '',
    email: '',
    phone: '',
    summary: '',
    location: { city: '', region: '', countryCode: '' },
    profiles: [],
  },
  work: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  certificates: [],
  awards: [],
};
