'use client';

import { useState, useEffect } from 'react';
import { Resume, EMPTY_RESUME } from '@/lib/types';
import { saveResume, loadResume } from '@/lib/storage';
import { THEMES } from '@/lib/themes';
import ImportModal from '@/components/ImportModal';
import AnalysisPanel from '@/components/AnalysisPanel';
import ResumePreview from '@/components/ResumePreview';
import ResumeForm from '@/components/ResumeForm';
import Toast from '@/components/Toast';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [resume, setResume] = useState<Resume>(EMPTY_RESUME);
  const [activeTab, setActiveTab] = useState('personal');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Load resume from localStorage on mount
  useEffect(() => {
    const savedResume = loadResume();
    setResume(savedResume);
    
    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Save resume to localStorage whenever it changes
  useEffect(() => {
    saveResume(resume);
  }, [resume]);

  const handleResumeChange = (updatedResume: Resume) => {
    setResume(updatedResume);
  };

  const handleImportSuccess = (importedResume: Resume) => {
    setResume(importedResume);
    setShowImportModal(false);
    showToast('Resume imported successfully!', 'success');
  };

  const handleAnalyzeClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeContent: resume }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      setShowAnalysisPanel(true);
      showToast('Resume analyzed successfully!', 'success');
    } catch (error) {
      showToast('Failed to analyze resume', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'work', label: 'Work Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between max-w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مسار</h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">Resume Builder</span>
          </div>

          {/* Toolbar */}
          <div className="flex gap-2 flex-wrap justify-end">
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Import
            </button>
            <button
              onClick={handleAnalyzeClick}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Form */}
        <div
          className={`${
            sidebarOpen ? 'w-full lg:w-1/2' : 'hidden lg:w-1/2'
          } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-all duration-300`}
        >
          {/* Tabs */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <div className="flex gap-1 px-4 py-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <ResumeForm
              resume={resume}
              activeTab={activeTab}
              onResumeChange={handleResumeChange}
            />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div
          className={`${
            sidebarOpen ? 'hidden lg:flex' : 'flex'
          } w-full lg:w-1/2 bg-gray-100 dark:bg-gray-900 flex-col overflow-hidden transition-all duration-300`}
        >
          <ResumePreview resume={resume} />
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <ImportModal
          onClose={() => setShowImportModal(false)}
          onSuccess={handleImportSuccess}
          onError={(error) => showToast(error, 'error')}
        />
      )}

      {/* Analysis Panel */}
      {showAnalysisPanel && (
        <AnalysisPanel
          resume={resume}
          onClose={() => setShowAnalysisPanel(false)}
          onApplySuggestion={(updatedResume) => {
            setResume(updatedResume);
            showToast('Suggestion applied!', 'success');
          }}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
