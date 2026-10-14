import React, { useState } from 'react';
import { ArrowUp, Facebook, MessageCircle, Send, ShieldCheck, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useSmoothScroll } from '../common/SmoothScroll';
import { useMascot } from '../../context/MascotContext';

export const FooterSection: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const { playSound, triggerBurst } = useMascot();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playSound('magic');
    triggerBurst();
    setSubscribed(true);
  };

  const handleScrollTop = () => {
    playSound('click');
    scrollTo('#hero', 0);
  };

  return (
    <footer className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#05070A] text-slate-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info (Span 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden p-1 bg-white/10 border border-[#FFD700]/40 shadow-sm flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="Digitalmod Academy"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-tight text-white">
                  DIGITAL<span className="text-[#FFD700]">MOD</span> ACADEMY
                </span>
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                  Approved & Registered Institute • Sri Lanka
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Digitalmod Academy is committed to helping students, school leavers, and aspiring professionals develop the digital literacy, technical expertise, and practical skills needed to thrive in a digital world.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#E63946]" />
              <span>Sungawila Junction, Polonnaruwa, Sri Lanka</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/94784450088"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
                title="WhatsApp Admissions"
              >
                <MessageCircle className="w-4 h-4" />
                <span>+94 78 445 0088</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Digitalmod+Academy+Sungavila+Polonnaruwa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:text-[#FFD700] hover:border-[#FFD700]/40 transition-colors"
                title="View on Google Maps"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Programmes
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#courses" className="hover:text-[#FFD700] transition-colors">
                  Language Courses (6)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#FFD700] transition-colors">
                  Psychology & Counselling (6)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#FFD700] transition-colors">
                  HRM & Administration (5)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#FFD700] transition-colors">
                  Computer & IT Certificates (5)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#FFD700] transition-colors">
                  Design & Digital Media (4)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#FFD700] transition-colors">
                  Departmental IT Modules (35)
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Academy
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-[#FFD700] transition-colors">
                  About Digitalmod
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-[#FFD700] transition-colors">
                  5-Stage Roadmap
                </a>
              </li>
              <li>
                <a href="#verification" className="hover:text-[#FFD700] transition-colors">
                  Verify a Certificate
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-[#FFD700] transition-colors">
                  Student Feedback
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FFD700] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FFD700] transition-colors">
                  Contact Admissions Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Notifications */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Receive notifications about upcoming batch intakes, workshops, and scholarship announcements.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#FFD700]/15 text-[#FFD700] text-xs font-bold">
                ✓ Subscribed to Digitalmod Updates!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/60"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar / Foot Reader with Developer Attribution */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>
              © 2026 Digitalmod Academy (Pvt) Ltd. All rights reserved.
            </p>
            <span className="hidden sm:inline text-slate-600">•</span>
            {/* Developer Credit Hyperlinked to 0775551712 */}
            <p className="font-mono text-xs text-slate-400">
              THIS WEBSITE DEVELOPED BY{' '}
              <a
                href="tel:0775551712"
                className="text-[#FFD700] hover:text-white font-bold underline transition-colors"
                title="Call A.J.MUHRIS at 0775551712"
              >
                A.J.MUHRIS (0775551712)
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-slate-400">
              Learn Skills. Build Your Future.
            </span>
            <button
              onClick={handleScrollTop}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#FFD700] hover:border-[#FFD700]/40 transition-colors"
              title="Scroll to top"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
