'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Resume } from '@/lib/types';
import { X, Upload, Loader } from 'lucide-react';

interface ImportModalProps {
  onClose: () => void;
  onSuccess: (resume: Resume) => void;
  onError: (error: string) => void;
}

export default function ImportModal({
  onClose,
  onSuccess,
  onError,
}: ImportModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      onError('Please upload a PDF or DOCX file');
      return;
    }

    const file = acceptedFiles[0];
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (!validTypes.includes(file.type)) {
      onError('Only PDF and DOCX files are supported');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      onError('File size must be less than 10MB');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to import resume');
      }

      const data = await response.json();

      if (data.success && data.data) {
        onSuccess(data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to import resume';
      onError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    disabled: isLoading,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Import Resume
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center gap-3">
              {isLoading ? (
                <>
                  <Loader size={40} className="text-blue-600 animate-spin" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Processing your resume...
                  </p>
                </>
              ) : (
                <>
                  <Upload size={40} className="text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      Drag and drop your resume here
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      or click to select a file
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Supported formats: PDF, DOCX (Max 10MB)
                  </p>
                </>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
            We use AI to extract and parse your resume data. This may take a few seconds.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
