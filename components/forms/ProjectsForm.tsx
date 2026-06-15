'use client';

import { Resume, ResumeProject } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  resume: Resume;
  onResumeChange: (resume: Resume) => void;
}

export default function ProjectsForm({
  resume,
  onResumeChange,
}: ProjectsFormProps) {
  const handleProjectChange = (index: number, field: string, value: string | string[]) => {
    const newProjects = [...resume.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onResumeChange({ ...resume, projects: newProjects });
  };

  const handleHighlightChange = (projectIndex: number, highlightIndex: number, value: string) => {
    const newProjects = [...resume.projects];
    const highlights = [...newProjects[projectIndex].highlights];
    highlights[highlightIndex] = value;
    newProjects[projectIndex] = { ...newProjects[projectIndex], highlights };
    onResumeChange({ ...resume, projects: newProjects });
  };

  const addHighlight = (projectIndex: number) => {
    const newProjects = [...resume.projects];
    newProjects[projectIndex].highlights.push('');
    onResumeChange({ ...resume, projects: newProjects });
  };

  const removeHighlight = (projectIndex: number, highlightIndex: number) => {
    const newProjects = [...resume.projects];
    newProjects[projectIndex].highlights = newProjects[projectIndex].highlights.filter(
      (_, i) => i !== highlightIndex
    );
    onResumeChange({ ...resume, projects: newProjects });
  };

  const handleKeywordChange = (projectIndex: number, keywordIndex: number, value: string) => {
    const newProjects = [...resume.projects];
    const keywords = [...newProjects[projectIndex].keywords];
    keywords[keywordIndex] = value;
    newProjects[projectIndex] = { ...newProjects[projectIndex], keywords };
    onResumeChange({ ...resume, projects: newProjects });
  };

  const addKeyword = (projectIndex: number) => {
    const newProjects = [...resume.projects];
    newProjects[projectIndex].keywords.push('');
    onResumeChange({ ...resume, projects: newProjects });
  };

  const removeKeyword = (projectIndex: number, keywordIndex: number) => {
    const newProjects = [...resume.projects];
    newProjects[projectIndex].keywords = newProjects[projectIndex].keywords.filter(
      (_, i) => i !== keywordIndex
    );
    onResumeChange({ ...resume, projects: newProjects });
  };

  const addProject = () => {
    const newProject: ResumeProject = {
      name: '',
      description: '',
      highlights: [],
      keywords: [],
    };
    onResumeChange({ ...resume, projects: [...resume.projects, newProject] });
  };

  const removeProject = (index: number) => {
    onResumeChange({
      ...resume,
      projects: resume.projects.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Projects
        </h3>
        <button
          onClick={addProject}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Project
        </button>
      </div>

      <div className="space-y-6">
        {resume.projects.map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Project {index + 1}
              </h4>
              <button
                onClick={() => removeProject(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Project Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, 'description', e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Brief description of the project..."
              />
            </div>

            {/* Highlights */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Key Features/Achievements
                </label>
                <button
                  onClick={() => addHighlight(index)}
                  className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-2">
                {project.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) =>
                        handleHighlightChange(index, hIndex, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Feature or achievement..."
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

            {/* Keywords */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Technologies/Keywords
                </label>
                <button
                  onClick={() => addKeyword(index)}
                  className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-2">
                {project.keywords.map((keyword, kIndex) => (
                  <div key={kIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) =>
                        handleKeywordChange(index, kIndex, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Technology or keyword..."
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

      {resume.projects.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No projects added yet. Click "Add Project" to get started.</p>
        </div>
      )}
    </div>
  );
}
