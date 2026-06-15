'use client';

import { Resume, ResumeCertificate } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface CertificatesFormProps {
  resume: Resume;
  onResumeChange: (resume: Resume) => void;
}

export default function CertificatesForm({
  resume,
  onResumeChange,
}: CertificatesFormProps) {
  const handleCertificateChange = (index: number, field: string, value: string) => {
    const newCertificates = [...resume.certificates];
    newCertificates[index] = { ...newCertificates[index], [field]: value };
    onResumeChange({ ...resume, certificates: newCertificates });
  };

  const addCertificate = () => {
    const newCertificate: ResumeCertificate = {
      name: '',
      issuer: '',
      date: '',
    };
    onResumeChange({
      ...resume,
      certificates: [...resume.certificates, newCertificate],
    });
  };

  const removeCertificate = (index: number) => {
    onResumeChange({
      ...resume,
      certificates: resume.certificates.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Certificates & Licenses
        </h3>
        <button
          onClick={addCertificate}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Certificate
        </button>
      </div>

      <div className="space-y-4">
        {resume.certificates.map((cert, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Certificate Name
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      handleCertificateChange(index, 'name', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., AWS Solutions Architect"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) =>
                      handleCertificateChange(index, 'issuer', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Issue Date (YYYY-MM)
                  </label>
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) =>
                      handleCertificateChange(index, 'date', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="2023-06"
                  />
                </div>
              </div>

              <button
                onClick={() => removeCertificate(index)}
                className="text-red-600 hover:text-red-700 p-2 mt-6"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {resume.certificates.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No certificates added yet. Click "Add Certificate" to get started.</p>
        </div>
      )}
    </div>
  );
}
