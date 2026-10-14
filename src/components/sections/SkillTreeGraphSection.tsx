import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  Palette, 
  TrendingUp, 
  Cpu, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Info
} from 'lucide-react';
import { CurvedReveal, CosmicCurvedRibbon } from '../common/CurvedReveal';
import { useMascot } from '../../context/MascotContext';

interface SkillNode {
  id: string;
  branch: 'software' | 'security' | 'design' | 'ai' | 'marketing';
  title: string;
  level: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  tagline: string;
  tools: string[];
  careers: string[];
  targetSalary: string;
  curriculum: string[];
}

const skillTreeData: SkillNode[] = [
  {
    id: 'software',
    branch: 'software',
    title: 'Full-Stack Software Engineering',
    level: 'Diploma → HND',
    icon: <Terminal className="w-6 h-6 text-[#00F0FF]" />,
    accentColor: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.35)',
    tagline: 'Architect robust web applications, modern reactive frontends, and cloud databases.',
    tools: ['JavaScript / TypeScript', 'React & Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    careers: ['Junior Frontend Developer', 'Full-Stack Engineer', 'Web Consultant'],
    targetSalary: 'LKR 80,000 – 250,000+ / mo',
    curriculum: [
      'HTML5, Modern CSS, Responsive Flexbox/Grid',
      'JavaScript ES6+ & TypeScript Essentials',
      'React Components, State & Hooks Mastery',
      'REST APIs & Database Integration',
      'Deployment & Hosting on Vercel / GitHub',
    ],
  },
  {
    id: 'security',
    branch: 'security',
    title: 'Cyber Security & Network Defense',
    level: 'Certificate → Diploma',
    icon: <ShieldCheck className="w-6 h-6 text-[#E63946]" />,
    accentColor: '#E63946',
    glowColor: 'rgba(230, 57, 70, 0.35)',
    tagline: 'Safeguard digital infrastructure, analyze security posture, and stop vulnerabilities.',
    tools: ['Kali Linux', 'Wireshark', 'Nmap', 'Metasploit', 'Firewalls & VPNs'],
    careers: ['Security Operations Analyst', 'Network Administrator', 'IT Support Specialist'],
    targetSalary: 'LKR 90,000 – 300,000+ / mo',
    curriculum: [
      'TCP/IP Protocols & Network Topologies',
      'Operating System Hardening & Patching',
      'Vulnerability Assessment & Port Scanning',
      'Firewall Rules & Threat Mitigation',
      'Incident Response & Forensics Basics',
    ],
  },
  {
    id: 'design',
    branch: 'design',
    title: 'Visual Design, UI/UX & Motion',
    level: 'Certificate → Advanced Diploma',
    icon: <Palette className="w-6 h-6 text-[#FFD700]" />,
    accentColor: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.35)',
    tagline: 'Create cinematic brand identities, interactive user interfaces, and engaging video edits.',
    tools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Premiere Pro', 'After Effects'],
    careers: ['UI/UX Product Designer', 'Motion Graphics Editor', 'Brand Identity Lead'],
    targetSalary: 'LKR 75,000 – 220,000+ / mo',
    curriculum: [
      'Design Principles, Typography & Golden Ratio',
      'Vector Illustration & Logo Architecture',
      'Figma Wireframing & Interactive Prototyping',
      'Color Grading & 4K Video Editing Cuts',
      'Client Presentation & Design Systems',
    ],
  },
  {
    id: 'ai',
    branch: 'ai',
    title: 'AI Tools & Intelligent Automation',
    level: 'Certificate → Diploma',
    icon: <Cpu className="w-6 h-6 text-[#A855F7]" />,
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    tagline: 'Harness LLMs, generative creativity, and modern workflow automation to achieve 10x output.',
    tools: ['ChatGPT Plus', 'Midjourney', 'Claude', 'Make.com', 'Zapier Automation'],
    careers: ['AI Productivity Consultant', 'Automation Specialist', 'Tech Content Strategist'],
    targetSalary: 'LKR 70,000 – 200,000+ / mo',
    curriculum: [
      'Prompt Engineering & Cognitive Frameworks',
      'Generative Image, Sound & Video Synthesis',
      'No-Code Workflow & CRM Automation',
      'AI-Assisted Research, Coding & Copywriting',
      'Ethical AI Deployment & Data Privacy',
    ],
  },
  {
    id: 'marketing',
    branch: 'marketing',
    title: 'Growth Marketing & Social Ads',
    level: 'Certificate → Advanced Diploma',
    icon: <TrendingUp className="w-6 h-6 text-[#10B981]" />,
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    tagline: 'Run multi-channel ad campaigns, drive high-conversion funnels, and build brand presence.',
    tools: ['Meta Business Suite', 'Google Ads', 'Google Analytics 4', 'TikTok Ads', 'Canva'],
    careers: ['Performance Marketer', 'Social Media Manager', 'Growth Lead'],
    targetSalary: 'LKR 70,000 – 240,000+ / mo',
    curriculum: [
      'Audience Persona Research & Funnel Strategy',
      'Meta Ad Campaign Setup, Budgets & Scaling',
      'SEO Fundamentals & Search Engine Ranking',
      'Conversion Rate Optimization & A/B Testing',
      'Social Media Content Strategy & Viral Reels',
    ],
  },
];

export const SkillTreeGraphSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SkillNode>(skillTreeData[0]);
  const { playSound, setEnrollModalOpen } = useMascot();

  return (
    <section
      id="skill-tree"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#05070A] dark:bg-[#05070A] light:bg-slate-50 overflow-hidden"
    >
      {/* Background Energy Flow */}
      <CosmicCurvedRibbon />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0056B3]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <CurvedReveal direction="curve-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#FFD700]/30 backdrop-blur-md text-xs font-bold text-[#FFD700] mb-4">
            <GitBranch className="w-4 h-4 text-[#FFD700]" />
            <span>NEURAL CURRICULUM TREE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white dark:text-white light:text-slate-950 tracking-tight leading-tight mb-4">
            The Interactive{' '}
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#FFD700] to-[#E63946] bg-clip-text text-transparent">
              Skill Tree Graph
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how our foundational digital curriculum branches into 5 high-income global technology disciplines. Click any branch node to explore.
          </p>
        </CurvedReveal>

        {/* Tree Visual Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Tree Branches (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Tree Root Node (Central Anchor) */}
            <CurvedReveal direction="curve-down" delay={0.05}>
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0056B3]/40 via-[#0B0E14] to-[#0056B3]/40 border-2 border-[#FFD700]/60 backdrop-blur-2xl shadow-xl shadow-[#FFD700]/10 text-center relative overflow-hidden group">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-[10px] font-mono font-bold uppercase mb-2">
                  <Zap className="w-3 h-3 text-[#FFD700]" />
                  <span>FOUNDATION TRUNK • START HERE</span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  DMA Core Computing & Digital Literacy
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
                  Universal springboard for all students: Computer Applications, Office Suites, Windows 11, Internet Architecture, and Data Hygiene.
                </p>
              </div>
            </CurvedReveal>

            {/* Connecting Vertical SVG Branching Web */}
            <div className="w-full flex justify-center -my-2 pointer-events-none">
              <svg width="240" height="40" viewBox="0 0 240 40" fill="none">
                <path
                  d="M120 0 V15 C120 28, 40 28, 40 40 M120 15 C120 28, 200 28, 200 40 M120 15 V40"
                  stroke="url(#tree-branch-grad)"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
                <defs>
                  <linearGradient id="tree-branch-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#00F0FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* 5 Distinct Branch Nodes with Curved Stagger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillTreeData.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                const curvedDir = index % 2 === 0 ? 'curve-left' : 'curve-right';
                return (
                  <CurvedReveal key={node.id} direction={curvedDir} delay={0.1 + index * 0.08}>
                    <div
                      onClick={() => {
                        playSound('click');
                        setSelectedNode(node);
                      }}
                      style={{
                        borderColor: isSelected ? node.accentColor : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: isSelected ? `0 0 25px ${node.glowColor}` : 'none',
                      }}
                      className={`p-5 rounded-3xl backdrop-blur-2xl transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? 'bg-white/[0.08] dark:bg-white/[0.08] light:bg-white scale-[1.02]'
                          : 'bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-100 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          style={{ backgroundColor: `${node.accentColor}20`, borderColor: `${node.accentColor}50` }}
                          className="w-11 h-11 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform"
                        >
                          {node.icon}
                        </div>
                        <span
                          style={{ color: node.accentColor, borderColor: `${node.accentColor}40` }}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border bg-black/40"
                        >
                          {node.level}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900 mb-1 group-hover:text-[#FFD700] transition-colors">
                        {node.title}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 line-clamp-2">
                        {node.tagline}
                      </p>

                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-white">
                        <span>Inspect Branch</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CurvedReveal>
                );
              })}
            </div>
          </div>

          {/* Right Column: Node Detail Inspector (iPhone Frosted Glass Card) (5 cols) */}
          <CurvedReveal direction="curve-right" delay={0.2} className="lg:col-span-5 lg:sticky lg:top-28">
            <div
              style={{
                borderColor: `${selectedNode.accentColor}50`,
                boxShadow: `0 12px 40px -10px ${selectedNode.glowColor}`,
              }}
              className="p-8 rounded-[36px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] dark:from-white/[0.08] dark:to-white/[0.02] light:from-white light:to-slate-100 backdrop-blur-3xl border shadow-2xl relative overflow-hidden"
            >
              {/* Glowing Specular Highlight */}
              <div
                style={{ backgroundColor: `${selectedNode.accentColor}20` }}
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
              />

              <div className="flex items-center gap-2 mb-4">
                <span
                  style={{ color: selectedNode.accentColor }}
                  className="text-xs font-mono font-bold uppercase tracking-wider"
                >
                  Branch Selected
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-semibold">{selectedNode.level}</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2 leading-tight">
                {selectedNode.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {selectedNode.tagline}
              </p>

              {/* Target Salary & Earning Badge */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    Typical Industry Earning
                  </div>
                  <div className="text-sm font-bold text-[#FFD700] font-mono">{selectedNode.targetSalary}</div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[10px] font-bold text-[#FFD700]">
                  High Growth
                </div>
              </div>

              {/* Structured Curriculum Modules */}
              <div className="mb-6">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Curriculum Blueprint</span>
                </h5>
                <ul className="space-y-2">
                  {selectedNode.curriculum.map((m, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-1.5 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Careers */}
              <div className="mb-6">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Target Roles & Careers</span>
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.careers.map((career) => (
                    <span
                      key={career}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-slate-200"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enrol CTA */}
              <button
                onClick={() => {
                  playSound('magic');
                  setEnrollModalOpen(true);
                }}
                style={{
                  background: `linear-gradient(135deg, ${selectedNode.accentColor}, #FFD700)`,
                }}
                className="w-full py-3.5 rounded-2xl text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all"
              >
                <span>Enrol In This Discipline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </CurvedReveal>
        </div>
      </div>
    </section>
  );
};
