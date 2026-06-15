'use client';

import { Resume } from '@/lib/types';
import PersonalInfoForm from './forms/PersonalInfoForm';
import WorkExperienceForm from './forms/WorkExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import LanguagesForm from './forms/LanguagesForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificatesForm from './forms/CertificatesForm';

interface ResumeFormProps {
  resume: Resume;
  activeTab: string;
  onResumeChange: (resume: Resume) => void;
}

export default function ResumeForm({
  resume,
  activeTab,
  onResumeChange,
}: ResumeFormProps) {
  return (
    <div>
      {activeTab === 'personal' && (
        <PersonalInfoForm resume={resume} onResumeChange={onResumeChange} />
      )}
      {activeTab === 'work' && (
        <WorkExperienceForm resume={resume} onResumeChange={onResumeChange} />
      )}
      {activeTab === 'education' && (
        <EducationForm resume={resume} onResumeChange={onResumeChange} />
      )}
      {activeTab === 'skills' && (
        <SkillsForm resume={resume} onResumeChange={onResumeChange} />
      )}
      {activeTab === 'languages' && (
        <LanguagesForm resume={resume} onResumeChange={onResumeChange} />
      )}
      {activeTab === 'projects' && (
        <ProjectsForm resume={resume} onResumeChange={onResumeChange} />
      )}
      {activeTab === 'certificates' && (
        <CertificatesForm resume={resume} onResumeChange={onResumeChange} />
      )}
    </div>
  );
}
