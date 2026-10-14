import React from 'react';
import { MascotProvider, useMascot } from './context/MascotContext';
import { SmoothScroll } from './components/common/SmoothScroll';
import { CustomCursor } from './components/common/CustomCursor';
import { Loader } from './components/ui/Loader';
import { GlassNavbar } from './components/common/GlassNavbar';
import { HeroSection } from './components/sections/HeroSection';
import { AcademicRoadmapSection } from './components/sections/AcademicRoadmapSection';
import { SkillTreeGraphSection } from './components/sections/SkillTreeGraphSection';
import { LearningTimelineSection } from './components/sections/LearningTimelineSection';
import { CoursesSection } from './components/sections/CoursesSection';
import { SecondHeroSection } from './components/sections/SecondHeroSection';
import { ShowcaseGallerySection } from './components/sections/ShowcaseGallerySection';
import { BrandRevealTheaterSection } from './components/sections/BrandRevealTheaterSection';
import { ApprovalsSection } from './components/sections/ApprovalsSection';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { InstructorsSection } from './components/sections/InstructorsSection';
import { FeedbackSection } from './components/sections/FeedbackSection';
import { FAQSection } from './components/sections/FAQSection';
import { CTAContactSection } from './components/sections/CTAContactSection';
import { FooterSection } from './components/sections/FooterSection';
import { EnrollmentModal } from './components/ui/EnrollmentModal';

const MainApp: React.FC = () => {
  const { isDarkEffective } = useMascot();

  return (
    <SmoothScroll>
      <div
        className={`relative min-h-screen font-sans selection:bg-[#FFD700] selection:text-slate-950 overflow-x-hidden transition-colors duration-500 ${
          isDarkEffective
            ? 'bg-[#05070A] text-slate-100'
            : 'bg-slate-50 text-slate-900'
        }`}
      >
        {/* Fullscreen Cinematic Preloader */}
        <Loader />

        {/* Custom Glass Cursor */}
        <CustomCursor />

        {/* Morphing Floating Glassmorphism Navbar with Tri-State Theme Selector */}
        <GlassNavbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* 1. Cinematic Hero with HD Video Loop, Hero 1/Hero 2 Selector & Curved Reveal Orbs */}
          <HeroSection />

          {/* 2. Interactive 5-Stage Academic Progression Roadmap */}
          <AcademicRoadmapSection />

          {/* 3. Neural Skill Tree Graph (Cosmic Branching Architecture) */}
          <SkillTreeGraphSection />

          {/* 4. Practical Learning Journey & Transformation Timeline */}
          <LearningTimelineSection />

          {/* 5. Comprehensive 65-Course Filterable Hub with Infinite Marquee */}
          <CoursesSection />

          {/* 6. Dimension II: Mid-Page Epic Hero (Powered by Hero 2 & cosmic_action video) */}
          <SecondHeroSection />

          {/* 7. Official Student Showcase: All 16 Verified Certificates & 5 Live Project Videos */}
          <ShowcaseGallerySection />

          {/* 8. 4K Cinema Theater: Official Brand Reveal Video */}
          <BrandRevealTheaterSection />

          {/* 9. Institutional Approvals & Accreditation */}
          <ApprovalsSection />

          {/* 10. Why Digitalmod Academy / Smart Lab & Offline Learning */}
          <WhyUsSection />

          {/* 11. Dedicated Faculty & Mentors */}
          <InstructorsSection />

          {/* 12. Student Experiences & Testimonials */}
          <FeedbackSection />

          {/* 13. Frequently Asked Questions Accordion */}
          <FAQSection />

          {/* 14. Direct Admissions Desk & Campus Google Maps */}
          <CTAContactSection />
        </main>

        {/* Footer with Developer Attribution */}
        <FooterSection />

        {/* Global WhatsApp Registration Modal */}
        <EnrollmentModal />
      </div>
    </SmoothScroll>
  );
};

export default function App() {
  return (
    <MascotProvider>
      <MainApp />
    </MascotProvider>
  );
}
