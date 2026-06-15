'use client';

import { Resume, ResumeWork } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface WorkExperienceFormProps {
  resume: Resume;
  onResumeChange: (resume: Resume) => void;
}

export default function WorkExperienceForm({
  resume,
  onResumeChange,
}: WorkExperienceFormProps) {
  const handleWorkChange = (index: number, field: string, value: string | string[]) => {
    const newWork = [...resume.work];
    newWork[index] = { ...newWork[index], [field]: value };
    onResumeChange({ ...resume, work: newWork });
  };

  const handleHighlightChange = (workIndex: number, highlightIndex: number, value: string) => {
    const newWork = [...resume.work];
    const highlights = [...newWork[workIndex].highlights];
    highlights[highlightIndex] = value;
    newWork[workIndex] = { ...newWork[workIndex], highlights };
    onResumeChange({ ...resume, work: newWork });
  };

  const addHighlight = (workIndex: number) => {
    const newWork = [...resume.work];
    newWork[workIndex].highlights.push('');
    onResumeChange({ ...resume, work: newWork });
  };

  const removeHighlight = (workIndex: number, highlightIndex: number) => {
    const newWork = [...resume.work];
    newWork[workIndex].highlights = newWork[workIndex].highlights.filter(
      (_, i) => i !== highlightIndex
    );
    onResumeChange({ ...resume, work: newWork });
  };

  const addWork = () => {
    const newWork: ResumeWork = {
      name: '',
      position: '',
      startDate: '',
      endDate: '',
      summary: '',
      highlights: [],
    };
    onResumeChange({ ...resume, work: [...resume.work, newWork] });
  };

  const removeWork = (index: number) => {
    onResumeChange({
      ...resume,
      work: resume.work.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Work Experience
        </h3>
        <button
          onClick={addWork}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Position
        </button>
      </div>

      <div className="space-y-6">
        {resume.work.map((work, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Position {index + 1}
              </h4>
              <button
                onClick={() => removeWork(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={work.name}
                  onChange={(e) => handleWorkChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={work.position}
                  onChange={(e) => handleWorkChange(index, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date (YYYY-MM)
                </label>
                <input
                  type="text"
                  value={work.startDate}
                  onChange={(e) => handleWorkChange(index, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="2020-01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date (YYYY-MM)
                </label>
                <input
                  type="text"
                  value={work.endDate}
                  onChange={(e) => handleWorkChange(index, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="2023-06"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Summary
              </label>
              <textarea
                value={work.summary}
                onChange={(e) => handleWorkChange(index, 'summary', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Brief description of your role and responsibilities..."
              />
            </div>

            {/* Highlights */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Key Achievements
                </label>
                <button
                  onClick={() => addHighlight(index)}
                  className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-2">
                {work.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, hIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Achievement or accomplishment..."
                    />
                    <button
                      onClick={() => removeHighlight(index, hIndex)}
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

      {resume.work.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No work experience added yet. Click "Add Position" to get started.</p>
        </div>
      )}
    </div>
  );
}
