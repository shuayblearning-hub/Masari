'use client';

import { useState } from 'react';
import { Resume } from '@/lib/types';
import { THEMES } from '@/lib/themes';
import { Download, Loader } from 'lucide-react';

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const [selectedTheme, setSelectedTheme] = useState('standard');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume,
          themeId: selectedTheme,
          filename: resume.basics.name || 'resume',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to export resume');
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'resume.html';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create a blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export resume');
    } finally {
      setIsExporting(false);
    }
  };

  const hasContent = resume.basics.name || resume.work.length > 0 || resume.education.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="border-b border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resume Theme
          </label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {THEMES.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name} - {theme.description}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting || !hasContent}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
        >
          {isExporting ? (
            <>
              <Loader size={18} className="animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download size={18} />
              Export as HTML
            </>
          )}
        </button>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto bg-gray-200 dark:bg-gray-900 p-4">
        {hasContent ? (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <ResumePreviewContent resume={resume} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium">No resume data yet</p>
              <p className="text-sm mt-2">Start filling in your resume details to see a preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResumePreviewContent({ resume }: { resume: Resume }) {
  return (
    <div className="p-8 text-gray-900 dark:text-gray-100 space-y-6 max-w-4xl mx-auto text-sm">
      {/* Header */}
      <div className="border-b-2 border-gray-300 dark:border-gray-700 pb-4">
        <h1 className="text-3xl font-bold">{resume.basics.name || 'Your Name'}</h1>
        {resume.basics.label && (
          <p className="text-lg text-gray-600 dark:text-gray-400">{resume.basics.label}</p>
        )}

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mt-2 text-xs">
          {resume.basics.email && <span>{resume.basics.email}</span>}
          {resume.basics.phone && <span>{resume.basics.phone}</span>}
          {resume.basics.location?.city && (
            <span>
              {resume.basics.location.city}
              {resume.basics.location.region && `, ${resume.basics.location.region}`}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.basics.summary && (
        <div>
          <h2 className="text-lg font-bold mb-2">Professional Summary</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {resume.basics.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resume.work.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Work Experience</h2>
          <div className="space-y-4">
            {resume.work.map((job, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{job.position}</p>
                    <p className="text-gray-600 dark:text-gray-400">{job.name}</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {job.startDate} - {job.endDate || 'Present'}
                  </p>
                </div>
                {job.summary && (
                  <p className="text-gray-700 dark:text-gray-300 mt-1 text-xs leading-relaxed">
                    {job.summary}
                  </p>
                )}
                {job.highlights.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-xs text-gray-700 dark:text-gray-300 space-y-1">
                    {job.highlights.map((highlight, hIdx) => (
                      <li key={hIdx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Education</h2>
          <div className="space-y-3">
            {resume.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{edu.studyType} in {edu.area}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {edu.institution}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                {edu.score && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    GPA: {edu.score}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Skills</h2>
          <div className="space-y-2">
            {resume.skills.map((skill, idx) => (
              <div key={idx}>
                <p className="font-semibold text-xs">
                  {skill.name}
                  {skill.level && ` • ${skill.level}`}
                </p>
                {skill.keywords.length > 0 && (
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {skill.keywords.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resume.languages.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {resume.languages.map((lang, idx) => (
              <div key={idx} className="text-xs">
                <p className="font-semibold">{lang.language}</p>
                <p className="text-gray-600 dark:text-gray-400">{lang.fluency}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Projects</h2>
          <div className="space-y-3">
            {resume.projects.map((project, idx) => (
              <div key={idx}>
                <p className="font-semibold">{project.name}</p>
                {project.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-xs mt-1 leading-relaxed">
                    {project.description}
                  </p>
                )}
                {project.keywords.length > 0 && (
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                    {project.keywords.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificates */}
      {resume.certificates.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Certificates</h2>
          <div className="space-y-2">
            {resume.certificates.map((cert, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-xs">{cert.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {cert.issuer}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
