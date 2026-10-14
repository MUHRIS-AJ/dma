import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveSection, AcademyContextType, CourseData, FeedbackItem, ThemeMode } from '../types/mascot';
import { soundSynth } from '../utils/audio';

const MascotContext = createContext<AcademyContextType | undefined>(undefined);

// Initial real student feedback from Polonnaruwa and online cohorts
const initialFeedbacks: FeedbackItem[] = [
  {
    id: 'fb-1',
    name: 'Mohomed Aasik',
    course: 'Diploma in Information Technology',
    rating: 5,
    comment:
      'Digitalmod Academy changed my career path completely. The practical labs at the Sungavila campus and Suhith Sir’s direct coaching gave me the confidence to pass with distinction and land a junior IT support role!',
    date: 'March 2026',
    verified: true,
  },
  {
    id: 'fb-2',
    name: 'Kavindi Weerasinghe',
    course: 'Certificate in Graphic Design',
    rating: 5,
    comment:
      'The hands-on Photoshop, Illustrator, and Canva modules were amazing. We were assigned real brand projects instead of just theory. Highly recommend Digitalmod Academy to everyone in Polonnaruwa!',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 'fb-3',
    name: 'Rashmika Bandara',
    course: 'Diploma in Cyber Security',
    rating: 5,
    comment:
      'The best cyber security fundamentals training in North Central Province. Network scanning, firewall basics, and threat defense were taught step-by-step with real virtual machines.',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 'fb-4',
    name: 'Fathima Sahana',
    course: 'Certificate in Digital Marketing',
    rating: 5,
    comment:
      'I enrolled in the online batch from Colombo. The live Zoom screen sharing, recorded portal access, and campaign setup guidance were top-tier. The Rs. 5,000 fee is the most affordable investment for such quality.',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 'fb-5',
    name: 'Janaka Dissanayake',
    course: 'HND in Computing',
    rating: 5,
    comment:
      'Structured curriculum, friendly environment, and UBE recognized academic standard. The instructors are always ready to clear doubts even after class hours.',
    date: 'December 2025',
    verified: true,
  },
];

export const MascotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('hero');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(initialFeedbacks);
  const [enrollModalOpen, setEnrollModalOpen] = useState<boolean>(false);
  const [burstTrigger, setBurstTrigger] = useState<number>(0);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const playSound = (soundName: 'click' | 'magic' | 'success') => {
    if (!soundEnabled) return;
    if (soundName === 'click') soundSynth.playClick();
    else if (soundName === 'magic') soundSynth.playMagic();
    else if (soundName === 'success') soundSynth.playMagic();
  };

  const triggerBurst = () => {
    setBurstTrigger(Date.now());
  };

  const addFeedback = (item: Omit<FeedbackItem, 'id' | 'date' | 'verified'>) => {
    const newEntry: FeedbackItem = {
      ...item,
      id: `fb-${Date.now()}`,
      date: 'Just now',
      verified: true,
    };
    setFeedbacks((prev) => [newEntry, ...prev]);
    playSound('magic');
    triggerBurst();
  };

  // Tri-state Theme Manager: 'dark' | 'light' | 'system'
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dma_theme_mode') as ThemeMode;
      if (stored === 'dark' || stored === 'light' || stored === 'system') return stored;
    }
    return 'dark'; // Default to cinematic dark
  });

  const [isSystemDark, setIsSystemDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Listen to OS system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isDarkEffective = themeMode === 'system' ? isSystemDark : themeMode === 'dark';

  // Apply dark class to <html> root
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    if (isDarkEffective) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkEffective]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dma_theme_mode', mode);
    }
  };

  return (
    <MascotContext.Provider
      value={{
        activeSection,
        setActiveSection,
        soundEnabled,
        toggleSound,
        playSound,
        selectedCourse,
        setSelectedCourse,
        feedbacks,
        addFeedback,
        enrollModalOpen,
        setEnrollModalOpen,
        triggerBurst,
        burstTrigger,
        themeMode,
        setThemeMode,
        isDarkEffective,
      }}
    >
      {children}
    </MascotContext.Provider>
  );
};

export const useMascot = () => {
  const context = useContext(MascotContext);
  if (!context) {
    throw new Error('useMascot must be used within MascotProvider');
  }
  return context;
};
