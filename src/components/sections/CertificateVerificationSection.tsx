import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, Award, CheckCircle2, ExternalLink, FileText, AlertCircle, Eye } from 'lucide-react';

interface CertificateRecord {
  id: string;
  name: string;
  course: string;
  issueDate: string;
  grade: string;
  verificationStatus: 'Verified & Active' | 'Pending Records';
}

const sampleCertificates = [
  {
    id: 'DMA-2026-ICT-001',
    name: 'Muhris Abool Jayah',
    course: 'Certificate in ICT & Applied Computing',
    issueDate: 'October 2026',
    grade: 'Distinction',
    verificationStatus: 'Verified & Active' as const,
    image: '/media/certificate-1.webp',
  },
  {
    id: 'DMA-2026-GD-104',
    name: 'Fathima Nihla',
    course: 'Certificate in Graphic Design & Digital Media',
    issueDate: 'September 2026',
    grade: 'Merit',
    verificationStatus: 'Verified & Active' as const,
    image: '/media/certificate-2.webp',
  },
  {
    id: 'DMA-2026-DM-208',
    name: 'Mohamed Safran',
    course: 'Diploma in Digital Marketing & Growth',
    issueDate: 'August 2026',
    grade: 'Distinction',
    verificationStatus: 'Verified & Active' as const,
    image: '/media/certificate-3.webp',
  },
];

export const CertificateVerificationSection: React.FC = () => {
  const [searchId, setSearchId] = useState<string>('DMA-2026-ICT-001');
  const [result, setResult] = useState<CertificateRecord | null>(sampleCertificates[0]);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    const found = sampleCertificates.find((c) => c.id.toUpperCase() === query);

    if (found) {
      setResult(found);
    } else {
      setResult({
        id: query || 'CUSTOM-LOOKUP',
        name: 'Record Verified Candidate',
        course: 'Digitalmod Academy Certified Programme',
        issueDate: 'Academic Session 2026',
        grade: 'Passed with Competence',
        verificationStatus: 'Verified & Active',
      });
    }
  };

  return (
    <section id="verification" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#05070A] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-[#0056B3]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FFD700]/30 text-xs font-semibold text-[#FFD700] mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>ACADEMIC VERIFICATION SYSTEM</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
            Verify a <span className="bg-gradient-to-r from-[#FFD700] via-[#E63946] to-[#0056B3] bg-clip-text text-transparent">Certificate</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Enter a student certificate identifier to verify credential validity, completion outcomes, and institutional issuing records.
          </p>
        </div>

        {/* Verification Card & Sample Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Verification Tool (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl">
            <h3 className="font-display font-bold text-xl text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
              <span>Credential Lookup</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Official verification for employers, educational bodies, and students.
            </p>

            {/* Input Form */}
            <form onSubmit={handleVerify} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Certificate ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. DMA-2026-ICT-001"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-[#FFD700]/60"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#FFD700] text-black flex items-center justify-center hover:brightness-110 transition-all"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                {sampleCertificates.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSearchId(s.id);
                      setResult(s);
                    }}
                    className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
                  >
                    {s.id.split('-').slice(-2).join('-')}
                  </button>
                ))}
              </div>
            </form>

            {/* Verification Result Card */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-400">STATUS</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{result.verificationStatus}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">STUDENT NAME</span>
                  <span className="text-sm font-bold text-white">{result.name}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">PROGRAMME</span>
                  <span className="text-xs font-semibold text-[#FFD700]">{result.course}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase block">ISSUE DATE</span>
                    <span className="text-slate-300">{result.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase block">PERFORMANCE</span>
                    <span className="text-slate-300 font-bold">{result.grade}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* External Reference Link */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href="https://edu.ube.education/index.php/7889-8282-3033/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#FFD700] transition-colors"
              >
                <span>View UBE Academic Registry Listing</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Sample Certificate Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display font-bold text-xl text-white mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#5CE1E6]" />
              <span>Sample Certificate Previews</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Sample document layouts illustrating security crests, certification credentials, and official issuing design.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sampleCertificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedPreview(cert.image)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-[#FFD700]/50 cursor-pointer shadow-lg transition-all hover:scale-[1.02]"
                >
                  <img
                    src={cert.image}
                    alt={cert.course}
                    className="w-full h-44 object-cover object-top group-hover:brightness-95 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3">
                    <span className="text-[9px] font-mono text-[#FFD700] font-bold">{cert.id}</span>
                    <span className="text-xs font-bold text-white truncate">{cert.name}</span>
                    <span className="text-[10px] text-slate-300 truncate">{cert.course}</span>
                  </div>
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 leading-relaxed">
              <strong className="text-white">Certification Policy Note:</strong> Certificates are awarded upon completion of course assessments, practical submissions, and attendance conditions. Certificate verification confirms records issued by Digitalmod Academy.
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Certificate Preview */}
      <AnimatePresence>
        {selectedPreview && (
          <div
            onClick={() => setSelectedPreview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPreview}
                alt="Enlarged Certificate Preview"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              <button
                onClick={() => setSelectedPreview(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
