import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, CheckCircle, Send, Sparkles, ThumbsUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { useMascot } from '../../context/MascotContext';

export const FeedbackSection: React.FC = () => {
  const { feedbacks, addFeedback, playSound } = useMascot();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [course, setCourse] = useState<string>('Diploma in Information Technology');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addFeedback({
      name,
      course,
      rating,
      comment,
    });

    setSubmitted(true);
    setName('');
    setComment('');

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFD700', '#5CE1E6', '#E8112D', '#FFA500'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormOpen(false);
    }, 2500);
  };

  return (
    <section id="feedback" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-1 border border-brand-gold/40 text-brand-gold text-xs font-bold mb-4 shadow-sm">
            <MessageSquare className="w-4 h-4 text-brand-gold" />
            <span>STUDENT EXPERIENCES & FEEDBACK</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-ink dark:text-white tracking-tight mb-4">
            What Our Students & Parents <span className="text-gradient-gold">Say</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
            Read verified feedback from our students in Polonnaruwa and islandwide online cohorts.
            Have you completed a course with us? Share your review below!
          </p>

          {/* Toggle Add Review Button */}
          <button
            onClick={() => {
              playSound('click');
              setFormOpen(!formOpen);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold text-brand-ink font-bold text-xs shadow-md shadow-brand-gold/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{formOpen ? 'Close Review Form' : 'Write a Student Review'}</span>
          </button>
        </div>

        {/* Interactive Feedback Form (Collapsible) */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="max-w-2xl mx-auto mb-16 overflow-hidden"
            >
              <GlassCard level={3} glow="gold" className="p-8">
                {submitted ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center mx-auto text-2xl">
                      🎉
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-ink dark:text-white">
                      Thank You for Your Feedback!
                    </h3>
                    <p className="text-xs text-slate-500">
                      Your verified review has been published to the student wall.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-lg text-brand-ink dark:text-white">
                        Submit Your Course Feedback
                      </h3>
                      <span className="text-xs text-brand-gold font-mono">Digitalmod Academy</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ahamed Riaz"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/40 dark:bg-black/30 border border-white/50 dark:border-white/15 rounded-xl px-4 py-2.5 text-xs text-brand-ink dark:text-white focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Programme Completed *
                        </label>
                        <select
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          className="w-full bg-white/40 dark:bg-black/40 border border-white/50 dark:border-white/15 rounded-xl px-4 py-2.5 text-xs text-brand-ink dark:text-white focus:outline-none focus:border-brand-gold"
                        >
                          <option value="Diploma in Information Technology">Diploma in IT</option>
                          <option value="Certificate in ICT">Certificate in ICT</option>
                          <option value="Certificate in Graphic Design">Certificate in Graphic Design</option>
                          <option value="Diploma in Cyber Security">Diploma in Cyber Security</option>
                          <option value="Certificate in Digital Marketing">Certificate in Digital Marketing</option>
                          <option value="HND in Computing">HND in Computing</option>
                          <option value="Advanced Diploma in Graphic Design">Advanced Diploma in Graphic Design</option>
                        </select>
                      </div>

                      {/* Clickable Star Rating */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Your Rating *
                        </label>
                        <div className="flex items-center gap-2 pt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => setRating(s)}
                              className="focus:outline-none transition-transform hover:scale-125"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  s <= rating
                                    ? 'fill-brand-gold text-brand-gold'
                                    : 'text-slate-300 dark:text-slate-600'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs font-mono font-bold text-brand-gold ml-2">
                            {rating}.0 / 5.0
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Your Review / Experience *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Share your experience regarding the teaching quality, lab facilities, or instructor support..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-white/40 dark:bg-black/30 border border-white/50 dark:border-white/15 rounded-xl px-4 py-2.5 text-xs text-brand-ink dark:text-white focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-brand-gold text-brand-ink font-bold text-xs uppercase tracking-wider shadow-md hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Verified Feedback</span>
                    </button>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard level={2} className="p-6 h-full flex flex-col justify-between">
                <div>
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{item.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed mb-4">
                    "{item.comment}"
                  </p>
                </div>

                {/* Student Info */}
                <div className="pt-4 border-t border-white/20 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-brand-ink dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">{item.course}</p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
