export type ActiveSection =
  | 'hero'
  | 'courses'
  | 'approvals'
  | 'why-us'
  | 'journey'
  | 'feedback'
  | 'pricing'
  | 'contact';

export type CourseLevel = 'Certificate' | 'Diploma' | 'Advanced' | 'HND';

export interface CourseData {
  id: string;
  level: CourseLevel;
  title: string;
  duration: string;
  fee: string;
  category: 'ICT & Computing' | 'Design & Media' | 'Marketing' | 'Security & AI';
  image: string;
  description: string;
  skills: string[];
}

export interface FeedbackItem {
  id: string;
  name: string;
  course: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export type ThemeMode = 'dark' | 'light' | 'system';

export interface AcademyContextType {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (soundName: 'click' | 'magic' | 'success') => void;
  selectedCourse: CourseData | any;
  setSelectedCourse: (course: any) => void;
  feedbacks: FeedbackItem[];
  addFeedback: (item: Omit<FeedbackItem, 'id' | 'date' | 'verified'>) => void;
  enrollModalOpen: boolean;
  setEnrollModalOpen: (open: boolean) => void;
  triggerBurst: () => void;
  burstTrigger: number;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDarkEffective: boolean;
}
