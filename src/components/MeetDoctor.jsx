import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, BadgeCheck, GraduationCap, Stethoscope } from 'lucide-react';

/* ─────────────────── data ───────────────────────────────────────── */

const specializations = [
  { label: 'M.D.S', color: 'from-sky-500/20 to-cyan-500/10 text-sky-300 border-sky-500/20' },
  { label: 'Oral & Maxillofacial Surgery', color: 'from-violet-500/20 to-purple-500/10 text-violet-300 border-violet-500/20' },
  { label: 'Implantology', color: 'from-emerald-500/20 to-green-500/10 text-emerald-300 border-emerald-500/20' },
  { label: 'Cosmetic Dentistry', color: 'from-amber-500/20 to-yellow-500/10 text-amber-300 border-amber-500/20' },
  { label: 'Endodontics', color: 'from-rose-500/20 to-pink-500/10 text-rose-300 border-rose-500/20' },
];

const achievements = [
  'Fellow of the International Congress of Oral Implantologists (FICOI)',
  'Advanced certification in Full-Mouth Rehabilitation',
  'Dental Council of India (DCI) registered practitioner',
  'Trained in Germany for advanced implant surgery techniques',
  'Published research in peer-reviewed dental journals',
  'Member — Indian Dental Association (IDA)',
];

/* ─────────────────── framer variants ────────────────────────────── */

const imageScale = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 60, damping: 16, duration: 0.9 },
  },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

/* ───────────────────────── component ────────────────────────────── */

export default function MeetDoctor() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const observe = useCallback((node) => {
    if (!node) return;
    sectionRef.current = node;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="doctor"
      ref={observe}
      className="relative z-10 overflow-hidden bg-[#0b1120] py-20 md:py-28"
    >
      {/* ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-sky-500/[0.04] blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* section label + heading */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp()}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-manrope text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
            Meet Your Dentist
          </p>
          <h2 className="section-title mx-auto max-w-xl">
            The Expert Behind{' '}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Your Perfect Smile
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* ────────── LEFT — doctor image ────────── */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={imageScale}
            className="relative flex-shrink-0"
          >
            {/* glow circle behind image */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 m-auto h-[110%] w-[110%] rounded-full opacity-50 blur-[80px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)',
              }}
            />

            {/* gradient border ring */}
            <div
              className="rounded-[2rem] p-[3px]"
              style={{
                background:
                  'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 40%, #06B6D4 80%, #0EA5E9 100%)',
              }}
            >
              <div className="overflow-hidden rounded-[calc(2rem-3px)] bg-[#0f172a]">
                <img
                  src="/images/doctor.jpg"
                  alt="Dr. Anand — Oral & Maxillofacial Surgeon"
                  className="h-auto w-72 object-cover sm:w-80 md:w-96"
                  loading="lazy"
                />
              </div>
            </div>

            {/* name badge floating */}
            <motion.div
              variants={fadeUp(0.5)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap
                         rounded-2xl border border-white/10 bg-white/5 px-6 py-3
                         text-center shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-2">
                <Stethoscope size={18} className="text-sky-400" />
                <span className="font-poppins text-lg font-bold text-white">Dr.&nbsp;Anand</span>
                <BadgeCheck size={18} className="text-emerald-400" />
              </div>
              <p className="mt-0.5 font-inter text-xs text-slate-400">
                M.D.S — Oral &amp; Maxillofacial Surgeon
              </p>
            </motion.div>
          </motion.div>

          {/* ────────── RIGHT — info card ────────── */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp(0.25)}
            className="w-full max-w-2xl"
          >
            {/* glass info card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10">
              {/* name + credentials */}
              <div className="mb-6">
                <h3 className="font-poppins text-2xl font-bold text-white md:text-3xl">
                  Dr.&nbsp;Anand
                </h3>
                <p className="mt-1 font-inter text-sm text-sky-400 md:text-base">
                  M.D.S — Oral &amp; Maxillofacial Surgeon &middot; Implantologist
                </p>
              </div>

              {/* specialization badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                {specializations.map((s) => (
                  <span
                    key={s.label}
                    className={`inline-flex items-center gap-1.5 rounded-full border bg-gradient-to-r
                                px-3 py-1 font-manrope text-xs font-medium ${s.color}`}
                  >
                    <GraduationCap size={13} />
                    {s.label}
                  </span>
                ))}
              </div>

              {/* bio */}
              <p className="mb-8 font-inter text-base leading-relaxed text-slate-300">
                With over a decade of clinical excellence, Dr.&nbsp;Anand has transformed
                thousands of smiles across Gujarat. His expertise spans complex oral surgeries,
                full-mouth dental implant rehabilitations, and cutting-edge cosmetic dentistry.
                Known for his gentle approach and meticulous precision, he ensures every patient
                receives world-class treatment in a comfortable, anxiety-free environment.
              </p>

              {/* achievements list */}
              <h4 className="mb-4 font-poppins text-sm font-semibold uppercase tracking-wider text-white/80">
                Achievements &amp; Certifications
              </h4>
              <ul className="mb-8 space-y-3">
                {achievements.map((item, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={fadeUp(0.4 + i * 0.08)}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 flex-shrink-0 text-emerald-400"
                    />
                    <span className="font-inter text-sm text-slate-300 md:text-base">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* certificate thumbnails */}
              <div>
                <h4 className="mb-3 font-poppins text-sm font-semibold uppercase tracking-wider text-white/80">
                  Certificates
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3].map((n) => (
                    <motion.div
                      key={n}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      variants={fadeUp(0.8 + n * 0.1)}
                      className="group relative overflow-hidden rounded-xl border border-white/10
                                 transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src="/images/certificates.jpg"
                        alt={`Professional certificate ${n}`}
                        className="h-24 w-32 object-cover sm:h-28 sm:w-40"
                        loading="lazy"
                      />
                      {/* hover overlay */}
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-sky-500/0
                                    transition-colors duration-300 group-hover:bg-sky-500/20"
                      >
                        <span className="font-manrope text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          View
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
