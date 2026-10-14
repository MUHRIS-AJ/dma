import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Plus, Minus, ExternalLink } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Where is Digitalmod Academy located?',
      a: 'Digitalmod Academy is located at Sungawila Junction, Polonnaruwa, Sri Lanka. You can find our listed location and get driving directions directly via Google Maps before planning your campus visit.',
      link: {
        text: 'View on Google Maps',
        url: 'https://www.google.com/maps/search/?api=1&query=Digitalmod+Academy+Sungavila+Polonnaruwa',
      },
    },
    {
      q: 'What courses are available?',
      a: 'Our proposed catalogue comprises 30 fully online certificate courses spanning Languages, Psychology, HRM, Computer & IT, Design, and Business Skills, plus 35 departmental IT modules covering Computer Fundamentals, Office Suites, Programming, Web Development, and Emerging Technologies.',
    },
    {
      q: 'What is the course fee structure?',
      a: 'Online certificates range from LKR 3,500 to LKR 7,999 depending on the discipline and duration. Departmental IT modules are proposed in standard brackets from LKR 3,500 to LKR 15,000. Fees are uniform and transparent, with zero hidden charges.',
    },
    {
      q: 'Are classes online or offline?',
      a: 'The academy provides classroom-based, instructor-led offline learning at our training facility at Sungawila Junction, Polonnaruwa, featuring practical computer workstations. In addition, proposed online certificate programmes provide flexible digital options.',
    },
    {
      q: 'Who can enrol?',
      a: 'Our programmes welcome students, school leavers (after O/L or A/L), teachers, job seekers, entrepreneurs, and working professionals looking to upgrade their digital and technical capabilities.',
    },
    {
      q: 'Will I receive an official certificate?',
      a: 'Yes. Students who successfully complete the applicable course requirements, practical projects, and assessments will be awarded an official certificate in accordance with the academy’s documented certification policy.',
    },
    {
      q: 'Is Digitalmod Academy accredited and registered?',
      a: 'Digitalmod Academy has an online academic recognition listing with the Universal Bureau of Education (UBE) and is committed to transparent institutional representation. The scope and validity of recognition are documented in our verified records.',
      link: {
        text: 'View UBE Verification Registry',
        url: 'https://edu.ube.education/index.php/7889-8282-3033/',
      },
    },
    {
      q: 'How can I register?',
      a: 'You can submit an expression of interest directly through the website registration form, which formats your application details and dispatches them to our official WhatsApp admissions desk for immediate review.',
    },
    {
      q: 'How can I contact Digitalmod Academy?',
      a: 'Reach our team directly on WhatsApp at +94 78 445 0088 or visit our academy at Sungawila Junction, Polonnaruwa during regular office hours.',
      link: {
        text: 'Chat on WhatsApp (+94 78 445 0088)',
        url: 'https://wa.me/94784450088',
      },
    },
  ];

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0E14] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FFD700]/30 text-xs font-semibold text-[#FFD700] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Questions & <span className="bg-gradient-to-r from-[#FFD700] via-[#E63946] to-[#0056B3] bg-clip-text text-transparent">Answers</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our programmes, admissions, certification policy, and campus facilities.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#FFD700]/40"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white">
                    <span className="font-mono text-xs text-[#FFD700] mr-2">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#FFD700] transition-transform duration-400 ${
                      isOpen ? 'rotate-180 bg-[#FFD700]/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 space-y-2">
                        <p>{faq.a}</p>
                        {faq.link && (
                          <a
                            href={faq.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFD700] hover:underline pt-1"
                          >
                            <span>{faq.link.text}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
