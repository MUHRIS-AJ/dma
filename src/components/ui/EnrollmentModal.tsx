import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  GraduationCap,
  MessageCircle,
  Phone,
  User,
  Mail,
  BookOpen,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMascot } from '../../context/MascotContext';
import { onlineCourses, departmentCourses } from '../../premium/catalog';

const sriLankaDistricts = [
  'Polonnaruwa', 'Anuradhapura', 'Colombo', 'Gampaha', 'Kalutara',
  'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
  'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu',
  'Batticaloa', 'Ampara', 'Trincomalee', 'Kurunegala', 'Puttalam',
  'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle',
];

export const EnrollmentModal: React.FC = () => {
  const { enrollModalOpen, setEnrollModalOpen, selectedCourse, playSound, triggerBurst } = useMascot();

  const allAvailableCourses = [
    ...onlineCourses.map((c) => `${c.title} (${c.fee})`),
    ...departmentCourses.map((c) => `${c.title} (${c.fee})`),
  ];

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    district: 'Polonnaruwa',
    course: allAvailableCourses[0] || 'Certificate in English Language (LKR 4,000)',
    schedule: 'Classroom Weekend (Saturday & Sunday)',
    qualifications: 'A/L Completed',
    feeConfirmed: true,
    consent: true,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  // Sync selectedCourse from context if set by user click
  useEffect(() => {
    if (selectedCourse) {
      const courseTitle = typeof selectedCourse === 'string' ? selectedCourse : (selectedCourse.title || '');
      const match = allAvailableCourses.find((c) => c.toLowerCase().includes(courseTitle.toLowerCase()));
      if (match) {
        setForm((prev) => ({ ...prev, course: match }));
      } else {
        setForm((prev) => ({ ...prev, course: courseTitle }));
      }
    }
  }, [selectedCourse]);

  // Reset submitted state when modal opens
  useEffect(() => {
    if (enrollModalOpen) {
      setSubmitted(false);
    }
  }, [enrollModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('magic');
    triggerBurst();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0056B3', '#E63946', '#FFD700', '#25D366'],
      });
    } catch {
      // safe fallback
    }

    // Professional WhatsApp Message format
    const message =
      `🎓 *DIGITALMOD ACADEMY — STUDENT REGISTRATION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Full Name:* ${form.name.trim()}\n` +
      `📱 *WhatsApp Number:* ${form.phone.trim()}\n` +
      `📧 *Email Address:* ${form.email.trim() || 'Not Provided'}\n` +
      `📍 *Residential District:* ${form.district}\n` +
      `📚 *Selected Course:* ${form.course}\n` +
      `⏰ *Preferred Schedule:* ${form.schedule}\n` +
      `🎓 *Educational Qualifications:* ${form.qualifications}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🏛️ *Academy Location:* Sungawila Junction, Polonnaruwa\n` +
      `Please confirm intake availability, syllabus details, and next steps for my registration.`;

    const encoded = encodeURIComponent(message);
    const targetUrl = `https://wa.me/94784450088?text=${encoded}`;
    setWhatsappUrl(targetUrl);
    setSubmitted(true);

    // Automatically trigger WhatsApp in new tab
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  if (!enrollModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0B0E14] border border-[#FFD700]/30 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-white overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            setEnrollModalOpen(false);
          }}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          aria-label="Close registration form"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/30 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white">
              Student Registration Request
            </h3>
            <p className="text-xs text-slate-400">
              Submit your expression of interest directly to the admissions desk on WhatsApp.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">Registration Prepared!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your details have been pre-formatted for Digitalmod Academy (+94 78 445 0088). If WhatsApp did not open automatically, click the button below.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-black font-bold text-sm uppercase tracking-wider hover:brightness-110 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Now</span>
              </a>
              <button
                onClick={() => setEnrollModalOpen(false)}
                className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A.J. Muhris"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/60"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +94 78 445 0088"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0056B3]" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/60"
                />
              </div>

              {/* Residential District */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E63946]" />
                  <span>Residential District *</span>
                </label>
                <select
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0E14] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFD700]/60"
                >
                  {sriLankaDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Selected Course / Programme *</span>
              </label>
              <select
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B0E14] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFD700]/60"
              >
                {allAvailableCourses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Preferred Class Schedule */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#5CE1E6]" />
                  <span>Preferred Class Schedule</span>
                </label>
                <select
                  value={form.schedule}
                  onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0E14] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFD700]/60"
                >
                  <option value="Classroom Weekend (Saturday & Sunday)">Classroom Weekend (Sat & Sun)</option>
                  <option value="Classroom Weekday (Morning / Evening)">Classroom Weekday</option>
                  <option value="Online Zoom / Flexible Session">Online Flexible Session</option>
                </select>
              </div>

              {/* Educational Qualifications */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  <span>Educational Qualifications</span>
                </label>
                <select
                  value={form.qualifications}
                  onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0E14] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFD700]/60"
                >
                  <option value="School Leaver / O/L">School Leaver / O/L</option>
                  <option value="A/L Completed">A/L Completed</option>
                  <option value="Undergraduate / Degree Student">Undergraduate / Degree Student</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Other / Lifelong Learner">Other / Lifelong Learner</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.feeConfirmed}
                  onChange={(e) => setForm({ ...form, feeConfirmed: e.target.checked })}
                  className="rounded text-[#FFD700] focus:ring-0"
                />
                <span>I understand course fees are provisional and confirmed upon academy review.</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="rounded text-[#FFD700] focus:ring-0"
                />
                <span>I consent to be contacted by Digitalmod Academy on WhatsApp regarding my inquiry.</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E63946] text-slate-950 font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>Submit Registration to WhatsApp</span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
