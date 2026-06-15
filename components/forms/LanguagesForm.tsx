'use client';

import { Resume, ResumeLanguage } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface LanguagesFormProps {
  resume: Resume;
  onResumeChange: (resume: Resume) => void;
}

export default function LanguagesForm({
  resume,
  onResumeChange,
}: LanguagesFormProps) {
  const handleLanguageChange = (index: number, field: string, value: string) => {
    const newLanguages = [...resume.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    onResumeChange({ ...resume, languages: newLanguages });
  };

  const addLanguage = () => {
    const newLanguage: ResumeLanguage = {
      language: '',
      fluency: '',
    };
    onResumeChange({
      ...resume,
      languages: [...resume.languages, newLanguage],
    });
  };

  const removeLanguage = (index: number) => {
    onResumeChange({
      ...resume,
      languages: resume.languages.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Languages
        </h3>
        <button
          onClick={addLanguage}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Language
        </button>
      </div>

      <div className="space-y-4">
        {resume.languages.map((lang, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Language
                  </label>
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) =>
                      handleLanguageChange(index, 'language', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., English"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fluency Level
                  </label>
                  <select
                    value={lang.fluency}
                    onChange={(e) =>
                      handleLanguageChange(index, 'fluency', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select Fluency</option>
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => removeLanguage(index)}
                className="text-red-600 hover:text-red-700 p-2 mt-6"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {resume.languages.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No languages added yet. Click "Add Language" to get started.</p>
        </div>
      )}
    </div>
  );
}
