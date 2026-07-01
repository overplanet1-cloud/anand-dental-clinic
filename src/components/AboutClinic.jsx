import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Users, ThumbsUp, Sparkles } from 'lucide-react';

/* ───────────────────────── animated counter ─────────────────────── */

function useCounter(target, start, duration = 2200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let frame = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      frame += 1;
      current += increment;
      if (frame >= steps) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [start, target, duration]);

  return value;
}

/* ───────────────────── mini stat card data ───────────────────────── */

const miniStats = [
  { icon: CalendarDays, value: 10, suffix: '+', label: 'Years', color: '#8B5CF6' },
  { icon: Users, value: 5000, suffix: '+', label: 'Patients', color: '#0EA5E9' },
  { icon: ThumbsUp, value: 100, suffix: '%', label: 'Satisfaction', color: '#10B981' },
];

function MiniStat({ stat, inView, index }) {
  const count = useCounter(stat.value, inView);
  const Icon = stat.icon;

  const display =
    typeof count === 'number' && count >= 1000
      ? count.toLocaleString()
      : count;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: 0.5 + index * 0.15, duration: 0.5 },
        },
      }}
      className="glass-card flex flex-col items-center rounded-2xl p-4 text-center
                 transition-transform duration-300 hover:-translate-y-1"
    >
      <Icon size={22} style={{ color: stat.color }} strokeWidth={2} className="mb-2" />
      <p className="font-poppins text-2xl font-bold text-white">
        {display}
        <span className="text-sky-400">{stat.suffix}</span>
      </p>
      <p className="mt-0.5 font-inter text-xs text-slate-400">{stat.label}</p>
    </motion.div>
  );
}

/* ─────────────────── framer-motion variants ─────────────────────── */

const imageVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 18, duration: 0.8 },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 18, duration: 0.8, delay: 0.15 },
  },
};

/* ───────────────────────── main component ────────────────────────── */

export default function AboutClinic() {
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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={observe}
      className="bg-gradient-section relative z-10 overflow-hidden py-20 md:py-28"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-sky-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* ──────────── LEFT — image ──────────── */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={imageVariants}
            className="relative w-full lg:w-[45%]"
          >
            {/* decorative gradient border frame */}
            <div
              className="absolute -inset-1 rounded-3xl opacity-70 blur-sm"
              style={{
                background:
                  'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 50%, #06B6D4 100%)',
              }}
            />

            {/* image wrapper */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="/images/clinic.jpg"
                alt="Anand Dental Hub – Modern clinic interior"
                className="h-auto w-full object-cover"
                loading="lazy"
              />

              {/* "Est. 2014" glass badge */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl
                           border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md"
              >
                <Sparkles size={16} className="text-amber-400" />
                <span className="font-manrope text-sm font-semibold text-white">
                  Est. 2014
                </span>
              </div>
            </div>
          </motion.div>

          {/* ──────────── RIGHT — text ──────────── */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="w-full lg:w-[55%]"
          >
            {/* label */}
            <p className="mb-3 font-manrope text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
              About Us
            </p>

            {/* heading */}
            <h2 className="section-title mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                Anand Dental Hub
              </span>
            </h2>

            {/* paragraphs */}
            <div className="space-y-4 font-inter text-base leading-relaxed text-slate-300 md:text-lg">
              <p>
                At Anand Dental Hub, we believe everyone deserves a confident, healthy smile.
                Founded by <strong className="text-white">Dr.&nbsp;Anand (M.D.S)</strong>, our
                clinic combines world-class dental expertise with genuine warmth and care,
                creating an experience that feels less like a visit and more like coming home.
              </p>
              <p>
                Equipped with cutting-edge digital X-rays, painless laser dentistry, 3D
                imaging, and CAD/CAM restoration technology, we ensure every procedure is
                precise, comfortable, and efficient. From routine check-ups to complex oral
                surgeries, our team stays at the forefront of dental innovation so you don't
                have to worry about a thing.
              </p>
              <p>
                Our commitment extends beyond treatment. We focus on patient education,
                preventive care, and long-term dental wellness — building relationships that
                last a lifetime, one smile at a time.
              </p>
            </div>

            {/* mini stats */}
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {miniStats.map((stat, i) => (
                <MiniStat key={stat.label} stat={stat} inView={inView} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
