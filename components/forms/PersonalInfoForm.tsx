'use client';

import { Resume } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface PersonalInfoFormProps {
  resume: Resume;
  onResumeChange: (resume: Resume) => void;
}

export default function PersonalInfoForm({
  resume,
  onResumeChange,
}: PersonalInfoFormProps) {
  const handleBasicsChange = (field: string, value: string) => {
    onResumeChange({
      ...resume,
      basics: {
        ...resume.basics,
        [field]: value,
      },
    });
  };

  const handleLocationChange = (field: string, value: string) => {
    onResumeChange({
      ...resume,
      basics: {
        ...resume.basics,
        location: {
          ...resume.basics.location,
          [field]: value,
        },
      },
    });
  };

  const handleProfileChange = (index: number, field: string, value: string) => {
    const newProfiles = [...resume.basics.profiles];
    newProfiles[index] = { ...newProfiles[index], [field]: value };
    onResumeChange({
      ...resume,
      basics: {
        ...resume.basics,
        profiles: newProfiles,
      },
    });
  };

  const addProfile = () => {
    onResumeChange({
      ...resume,
      basics: {
        ...resume.basics,
        profiles: [
          ...resume.basics.profiles,
          { network: '', username: '', url: '' },
        ],
      },
    });
  };

  const removeProfile = (index: number) => {
    onResumeChange({
      ...resume,
      basics: {
        ...resume.basics,
        profiles: resume.basics.profiles.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={resume.basics.name}
            onChange={(e) => handleBasicsChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Professional Title
          </label>
          <input
            type="text"
            value={resume.basics.label}
            onChange={(e) => handleBasicsChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={resume.basics.email}
            onChange={(e) => handleBasicsChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={resume.basics.phone}
            onChange={(e) => handleBasicsChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            City
          </label>
          <input
            type="text"
            value={resume.basics.location.city}
            onChange={(e) => handleLocationChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="San Francisco"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Region/State
          </label>
          <input
            type="text"
            value={resume.basics.location.region}
            onChange={(e) => handleLocationChange('region', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="California"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Country Code
          </label>
          <input
            type="text"
            value={resume.basics.location.countryCode}
            onChange={(e) => handleLocationChange('countryCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="US"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Professional Summary
        </label>
        <textarea
          value={resume.basics.summary}
          onChange={(e) => handleBasicsChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Brief overview of your professional background and goals..."
        />
      </div>

      {/* Social Profiles */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Social Profiles
          </h3>
          <button
            onClick={addProfile}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Add Profile
          </button>
        </div>

        <div className="space-y-3">
          {resume.basics.profiles.map((profile, index) => (
            <div
              key={index}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg space-y-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={profile.network}
                  onChange={(e) =>
                    handleProfileChange(index, 'network', e.target.value)
                  }
                  placeholder="Network (e.g., LinkedIn)"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) =>
                    handleProfileChange(index, 'username', e.target.value)
                  }
                  placeholder="Username"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="url"
                  value={profile.url}
                  onChange={(e) =>
                    handleProfileChange(index, 'url', e.target.value)
                  }
                  placeholder="URL"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button
                onClick={() => removeProfile(index)}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
