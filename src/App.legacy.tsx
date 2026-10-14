import React, { useState, useEffect } from 'react';
import { MascotProvider, useMascot } from './context/MascotContext';
import { SmoothScroll } from './components/common/SmoothScroll';
import { CustomCursor } from './components/common/CustomCursor';
import { BackgroundGradientMesh } from './components/common/BackgroundGradientMesh';
import { GlassNavbar } from './components/common/GlassNavbar';
import { MobileTabBar } from './components/common/MobileTabBar';
import { ScrollCanvas } from './components/3d/ScrollCanvas';
import { HeroSection } from './components/sections/HeroSection';
import { CoursesSection } from './components/sections/CoursesSection';
import { ApprovalsSection } from './components/sections/ApprovalsSection';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { LearningJourneySection } from './components/sections/LearningJourneySection';
import { InstructorsSection } from './components/sections/InstructorsSection';
import { FeedbackSection } from './components/sections/FeedbackSection';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { CTAContactSection } from './components/sections/CTAContactSection';
import { FooterSection } from './components/sections/FooterSection';
import { CinematicSceneWrapper } from './components/common/CinematicSceneWrapper';
import { EnrollmentModal } from './components/ui/EnrollmentModal';
import { ActiveSection } from './types/mascot';

const AppContent: React.FC = () => {
  const { setActiveSection } = useMascot();

  // Automatically detect dark/light mode based on the user's system OS preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dma_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen to OS system theme changes automatically
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('dma_theme');
      if (!stored) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Manage Dark Mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('dma_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Synchronize Scroll Intersection with Active Section
  useEffect(() => {
    const sections: ActiveSection[] = [
      'hero',
      'courses',
      'approvals',
      'why-us' as any,
      'journey' as any,
      'feedback',
      'pricing',
      'contact',
    ];
    const elements = ['hero', 'courses', 'approvals', 'why-us', 'journey', 'feedback', 'pricing', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as ActiveSection);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.15,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [setActiveSection]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-brand-gold selection:text-brand-ink">
        {/* 1. Fluid Background Gradient Mesh (Floating Gold/Cyan/Red Orbs) */}
        <BackgroundGradientMesh />

        {/* 2. Apple-Style Frame Scrubbing & Real-Time Background Particles Canvas */}
        <ScrollCanvas />

        {/* 3. Soft iOS-Style Liquid Glass Custom Cursor (Desktop) */}
        <CustomCursor />

        {/* 4. Floating Liquid Glass Navbar with Official Logo */}
        <GlassNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* 5. Mobile iOS Bottom Navigation Bar */}
        <MobileTabBar />

        {/* 6. Main Storytelling Sections with Smooth 120Hz Transitions */}
        <main className="relative z-10">
          <CinematicSceneWrapper>
            <HeroSection />
          </CinematicSceneWrapper>

          <CinematicSceneWrapper>
            <CoursesSection />
          </CinematicSceneWrapper>

          <CinematicSceneWrapper>
            <ApprovalsSection />
          </CinematicSceneWrapper>

          <CinematicSceneWrapper>
            <WhyUsSection />
          </CinematicSceneWrapper>

          <CinematicSceneWrapper>
            <LearningJourneySection />
          </CinematicSceneWrapper>

          <CinematicSceneWrapper>
            <InstructorsSection />
          </CinematicSceneWrapper>

          <CinematicSceneWrapper>
            <FeedbackSection />
          </CinematicSceneWrapper>

          <CinematicSceneWrapper>
            <PricingSection />
          </CinematicSceneWrapper>

          <CinematicSceneWrapper>
            <FAQSection />
          </CinematicSceneWrapper>

          <CinematicSceneWrapper>
            <CTAContactSection />
          </CinematicSceneWrapper>
        </main>

        {/* 8. Frosted Glass Footer */}
        <FooterSection />

        {/* 9. Global Instant WhatsApp Enrollment Modal */}
        <EnrollmentModal />
      </div>
    </SmoothScroll>
  );
};

export default function App() {
  return (
    <MascotProvider>
      <AppContent />
    </MascotProvider>
  );
}
