'use client';

import { useState, useEffect } from 'react';
import { Resume, ResumeAnalysis, AnalysisSuggestion } from '@/lib/types';
import { X, Loader, CheckCircle, AlertCircle } from 'lucide-react';

interface AnalysisPanelProps {
  resume: Resume;
  onClose: () => void;
  onApplySuggestion: (updatedResume: Resume) => void;
}

export default function AnalysisPanel({
  resume,
  onClose,
  onApplySuggestion,
}: AnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeContent: resume }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze resume');
        }

        const data = await response.json();
        setAnalysis(data.analysis);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to analyze resume');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [resume]);

  const handleApplySuggestion = (suggestion: AnalysisSuggestion) => {
    const updatedResume = { ...resume };

    // Apply the suggestion to the appropriate field
    const section = suggestion.section as keyof Resume;
    const field = suggestion.field;

    if (section === 'basics') {
      (updatedResume.basics as any)[field] = suggestion.suggestedContent;
    } else if (Array.isArray(updatedResume[section])) {
      // For array sections, update the first item for now
      // In a real app, you might want to let the user choose which item to update
      const items = updatedResume[section] as any[];
      if (items.length > 0) {
        items[0][field] = suggestion.suggestedContent;
      }
    }

    onApplySuggestion(updatedResume);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border-red-300 dark:border-red-700';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 border-yellow-300 dark:border-yellow-700';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-300 dark:border-blue-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/5 bg-white dark:bg-gray-800 shadow-xl flex flex-col animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Resume Analysis
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader size={40} className="text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">Analyzing your resume...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle size={40} className="text-red-600 mx-auto mb-3" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : analysis ? (
            <>
              {/* Score */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-300 dark:text-gray-600"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={`${(analysis.score / 100) * 351.86} 351.86`}
                        className="text-blue-600 dark:text-blue-400 transition-all"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {analysis.score}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {analysis.summary}
                </p>
              </div>

              {/* Strengths */}
              {analysis.strengths.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-600" />
                    Strengths
                  </h3>
                  <div className="space-y-2">
                    {analysis.strengths.map((strength, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-800 dark:text-green-100"
                      >
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Improvements */}
              {analysis.improvements.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <AlertCircle size={20} className="text-orange-600" />
                    Areas for Improvement
                  </h3>
                  <div className="space-y-2">
                    {analysis.improvements.map((improvement, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg text-sm text-orange-800 dark:text-orange-100"
                      >
                        {improvement}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {analysis.suggestions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Suggestions ({analysis.suggestions.length})
                  </h3>
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className={`p-4 border rounded-lg ${getPriorityColor(suggestion.priority)}`}
                      >
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{suggestion.title}</p>
                            <p className="text-xs opacity-75 mt-1">{suggestion.description}</p>
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 bg-white/30 rounded whitespace-nowrap">
                            {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)}
                          </span>
                        </div>

                        {suggestion.currentContent && (
                          <div className="mt-2 mb-2 text-xs">
                            <p className="opacity-75 mb-1">Current:</p>
                            <p className="bg-white/20 p-2 rounded italic truncate">
                              {suggestion.currentContent}
                            </p>
                          </div>
                        )}

                        {suggestion.suggestedContent && (
                          <div className="mt-2 mb-3 text-xs">
                            <p className="opacity-75 mb-1">Suggested:</p>
                            <p className="bg-white/20 p-2 rounded italic">
                              {suggestion.suggestedContent}
                            </p>
                          </div>
                        )}

                        <button
                          onClick={() => handleApplySuggestion(suggestion)}
                          className="w-full mt-2 px-3 py-2 bg-white/30 hover:bg-white/50 rounded text-xs font-semibold transition"
                        >
                          Apply Suggestion
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
