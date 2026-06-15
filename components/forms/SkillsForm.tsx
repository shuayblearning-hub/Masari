'use client';

import { Resume, ResumeSkill } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface SkillsFormProps {
  resume: Resume;
  onResumeChange: (resume: Resume) => void;
}

export default function SkillsForm({
  resume,
  onResumeChange,
}: SkillsFormProps) {
  const handleSkillChange = (index: number, field: string, value: string | string[]) => {
    const newSkills = [...resume.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    onResumeChange({ ...resume, skills: newSkills });
  };

  const handleKeywordChange = (skillIndex: number, keywordIndex: number, value: string) => {
    const newSkills = [...resume.skills];
    const keywords = [...newSkills[skillIndex].keywords];
    keywords[keywordIndex] = value;
    newSkills[skillIndex] = { ...newSkills[skillIndex], keywords };
    onResumeChange({ ...resume, skills: newSkills });
  };

  const addKeyword = (skillIndex: number) => {
    const newSkills = [...resume.skills];
    newSkills[skillIndex].keywords.push('');
    onResumeChange({ ...resume, skills: newSkills });
  };

  const removeKeyword = (skillIndex: number, keywordIndex: number) => {
    const newSkills = [...resume.skills];
    newSkills[skillIndex].keywords = newSkills[skillIndex].keywords.filter(
      (_, i) => i !== keywordIndex
    );
    onResumeChange({ ...resume, skills: newSkills });
  };

  const addSkill = () => {
    const newSkill: ResumeSkill = {
      name: '',
      level: '',
      keywords: [],
    };
    onResumeChange({ ...resume, skills: [...resume.skills, newSkill] });
  };

  const removeSkill = (index: number) => {
    onResumeChange({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Skills
        </h3>
        <button
          onClick={addSkill}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Skill
        </button>
      </div>

      <div className="space-y-6">
        {resume.skills.map((skill, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Skill {index + 1}
              </h4>
              <button
                onClick={() => removeSkill(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="e.g., JavaScript"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Proficiency Level
                </label>
                <select
                  value={skill.level}
                  onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Related Keywords
                </label>
                <button
                  onClick={() => addKeyword(index)}
                  className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-2">
                {skill.keywords.map((keyword, kIndex) => (
                  <div key={kIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => handleKeywordChange(index, kIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Keyword..."
                    />
                    <button
                      onClick={() => removeKeyword(index, kIndex)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {resume.skills.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No skills added yet. Click "Add Skill" to get started.</p>
        </div>
      )}
    </div>
  );
}
