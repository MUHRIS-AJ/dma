import React from 'react';
import { Home, BookOpen, ShieldCheck, Compass, MessageSquare, Send } from 'lucide-react';
import { useSmoothScroll } from './SmoothScroll';
import { useMascot } from '../../context/MascotContext';

export const MobileTabBar: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const { activeSection, playSound } = useMascot();

  const tabs = [
    { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
    { id: 'courses', label: 'Courses', icon: BookOpen, href: '#courses' },
    { id: 'approvals', label: 'Approvals', icon: ShieldCheck, href: '#approvals' },
    { id: 'why-us', label: 'Why Us', icon: Compass, href: '#why-us' },
    { id: 'feedback', label: 'Reviews', icon: MessageSquare, href: '#feedback' },
    { id: 'contact', label: 'Enroll', icon: Send, href: '#contact' },
  ];

  const handleTabClick = (href: string) => {
    playSound('click');
    scrollTo(href, -70);
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 lg:hidden px-3 pointer-events-none">
      <div className="max-w-md mx-auto glass-3 p-1.5 rounded-full shadow-glass-lg border border-white/50 dark:border-white/20 flex items-center justify-around pointer-events-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.href)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-brand-gold font-bold scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-brand-ink dark:hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-brand-gold/15 rounded-full -z-10" />
              )}
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[9px] tracking-tight whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
