import React from 'react';
import { Award, GraduationCap, Linkedin, Mail, Sparkles, UserCheck } from 'lucide-react';

export const InstructorsSection: React.FC = () => {
  const mentors = [
    {
      name: 'Suheeth',
      credentials: 'B.ICT (Hons)',
      role: 'Lead ICT & Technology Educator',
      bio: 'Graduated with a Bachelor of Information and Communication Technology Honours. Specializes in practical ICT education, structured computational logic, and curriculum excellence.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      badge: 'B.ICT (Hons)',
      badgeColor: 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30',
    },
    {
      name: 'Safran',
      credentials: 'Senior Faculty Member',
      role: 'Digital Media & Business Specialist',
      bio: 'Experienced educator focusing on professional digital business workflows, marketing funnels, and student practical skill acquisition across our online and classroom cohorts.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      badge: 'Senior Faculty',
      badgeColor: 'bg-[#0056B3]/20 text-[#5CE1E6] border-[#0056B3]/30',
    },
    {
      name: 'Nihla',
      credentials: 'Academic Staff',
      role: 'Academic Coordinator & Student Counselor',
      bio: 'Oversees student engagement, classroom practical scheduling, and foundational IT support, ensuring every learner thrives in an encouraging and inclusive atmosphere.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      badge: 'Coordinator',
      badgeColor: 'bg-[#E63946]/20 text-[#E63946] border-[#E63946]/30',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#05070A] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FFD700]/30 text-xs font-semibold text-[#FFD700] mb-4">
            <UserCheck className="w-3.5 h-3.5" />
            <span>DEDICATED ACADEMIC TEAM</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Meet Our <span className="bg-gradient-to-r from-[#FFD700] via-[#E63946] to-[#0056B3] bg-clip-text text-transparent">Faculty</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Our instructional team is committed to delivering structured lessons, practical exercises, and personalized guidance for every student at Digitalmod Academy.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((m) => (
            <div
              key={m.name}
              className="p-8 rounded-[28px] bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#FFD700]/50 hover:-translate-y-2 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 p-0.5 group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <img src={m.avatar} alt={m.name} className="w-full h-full object-cover rounded-[14px]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-[#FFD700] transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-xs text-slate-400">{m.role}</p>
                    <span
                      className={`inline-block text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full mt-1 border ${m.badgeColor}`}
                    >
                      {m.badge}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{m.bio}</p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px] text-[#FFD700]">{m.credentials}</span>
                <span className="text-[11px] text-slate-500">Digitalmod Faculty</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
