export interface Theme {
  id: string;
  name: string;
  nameAr: string;
  description: string;
}

export const THEMES: Theme[] = [
  { id: 'standard', name: 'Standard', nameAr: 'كلاسيكي', description: 'Professional and clean' },
  { id: 'modern', name: 'Modern', nameAr: 'عصري', description: 'Bold header with sidebar accent' },
  { id: 'elegant', name: 'Elegant', nameAr: 'أنيق', description: 'Serif font, centered header' },
  { id: 'minimal', name: 'Minimal', nameAr: 'بسيط', description: 'Light and minimal spacing' },
  { id: 'creative', name: 'Creative', nameAr: 'إبداعي', description: 'Two-column with colored sidebar' },
  { id: 'tech', name: 'Tech', nameAr: 'تقني', description: 'Dark theme, monospace font' },
];
