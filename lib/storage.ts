import { Resume, EMPTY_RESUME } from './types';

const KEY = 'massar_resume';

export function saveResume(resume: Resume): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(resume));
}

export function loadResume(): Resume {
  if (typeof window === 'undefined') return EMPTY_RESUME;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY_RESUME;
    return { ...EMPTY_RESUME, ...JSON.parse(raw) };
  } catch {
    return EMPTY_RESUME;
  }
}

export function clearResume(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}
