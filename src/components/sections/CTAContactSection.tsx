import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, MessageCircle, CheckCircle2, Clock, GraduationCap, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMascot } from '../../context/MascotContext';

export const CTAContactSection: React.FC = () => {
  const { playSound, selectedCourse, triggerBurst } = useMascot();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'Certificate in English Language',
    message: '',
  });

  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  useEffect(() => {
    if (selectedCourse) {
      const courseTitle = typeof selectedCourse === 'string' ? selectedCourse : (selectedCourse.title || '');
      setForm((prev) => ({
        ...prev,
        course: courseTitle,
      }));
    }
  }, [selectedCourse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('magic');
    triggerBurst();

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0056B3', '#E63946', '#FFD700', '#25D366'],
      });
    } catch {
      // safe fallback
    }

    const text =
      `🎓 *DIGITALMOD ACADEMY — ADMISSIONS ENQUIRY*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${form.name.trim()}\n` +
      `📱 *Phone / WhatsApp:* ${form.phone.trim()}\n` +
      `📧 *Email:* ${form.email.trim() || 'N/A'}\n` +
      `📚 *Course of Interest:* ${form.course}\n` +
      (form.message.trim() ? `💬 *Message:* ${form.message.trim()}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please let me know the upcoming intake dates and classroom schedule.`;

    const targetUrl = `https://wa.me/94784450088?text=${encodeURIComponent(text)}`;
    setWhatsappUrl(targetUrl);
    setSubmitted(true);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0B0E14] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#0056B3]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#E63946]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Campus & Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FFD700]/30 text-xs font-semibold text-[#FFD700]">
              <MapPin className="w-3.5 h-3.5" />
              <span>VISIT OUR CAMPUS</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Get in Touch with{' '}
              <span className="bg-gradient-to-r from-[#FFD700] via-[#E63946] to-[#0056B3] bg-clip-text text-transparent">
                Digitalmod
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Have questions regarding course modules, schedules, or certificate eligibility? Reach out to our academic counsellors on WhatsApp or visit our classroom training facility.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <MapPin className="w-5 h-5 text-[#E63946] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Campus Location</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Digitalmod Academy, Sungawila Junction, Polonnaruwa, Sri Lanka.
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Digitalmod+Academy+Sungavila+Polonnaruwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FFD700] hover:underline mt-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">WhatsApp Admissions</h4>
                  <p className="text-xs text-slate-300 mt-0.5">+94 78 445 0088</p>
                  <span className="text-[10px] text-slate-500 font-mono">Immediate response during office hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <Clock className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Office Hours</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Monday – Sunday · 8:30 AM – 5:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl">
            <h3 className="font-display font-black text-2xl text-white mb-2">
              Send an Enquiry
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Complete this form to start a conversation with our admissions desk on WhatsApp.
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold font-display text-white">Enquiry Ready!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your enquiry has been dispatched to WhatsApp. If the app did not open automatically, click below:
                </p>
                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+94 7X XXX XXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Course of Interest</label>
                    <input
                      type="text"
                      placeholder="e.g. ICT, Graphic Design, etc."
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Message or Question</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your learning goals or questions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/60 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E63946] text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Send Enquiry to WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
