'use client';

import { Resume, ResumeEducation } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface EducationFormProps {
  resume: Resume;
  onResumeChange: (resume: Resume) => void;
}

export default function EducationForm({
  resume,
  onResumeChange,
}: EducationFormProps) {
  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...resume.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onResumeChange({ ...resume, education: newEducation });
  };

  const addEducation = () => {
    const newEducation: ResumeEducation = {
      institution: '',
      area: '',
      studyType: '',
      startDate: '',
      endDate: '',
      score: '',
    };
    onResumeChange({
      ...resume,
      education: [...resume.education, newEducation],
    });
  };

  const removeEducation = (index: number) => {
    onResumeChange({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Education
        </h3>
        <button
          onClick={addEducation}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Education
        </button>
      </div>

      <div className="space-y-6">
        {resume.education.map((edu, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Education {index + 1}
              </h4>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, 'institution', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.area}
                  onChange={(e) => handleEducationChange(index, 'area', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Degree Type
                </label>
                <input
                  type="text"
                  value={edu.studyType}
                  onChange={(e) =>
                    handleEducationChange(index, 'studyType', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Bachelor's"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GPA/Score
                </label>
                <input
                  type="text"
                  value={edu.score}
                  onChange={(e) => handleEducationChange(index, 'score', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="3.8"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date (YYYY-MM)
                </label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleEducationChange(index, 'startDate', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="2018-09"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date (YYYY-MM)
                </label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleEducationChange(index, 'endDate', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="2022-05"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {resume.education.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No education added yet. Click "Add Education" to get started.</p>
        </div>
      )}
    </div>
  );
}
