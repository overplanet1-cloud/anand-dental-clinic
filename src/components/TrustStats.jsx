import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Award, Heart, Shield } from 'lucide-react';

/* ───────────────────────────── helpers ───────────────────────────── */

/**
 * Animated counter hook — counts from 0 → target once `start` flips true.
 * Handles decimals (e.g. 4.9) and integer targets.
 */
function useCounter(target, start, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const isDecimal = !Number.isInteger(target);
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
        setValue(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [start, target, duration]);

  return value;
}

/* ───────────────────────────── data ──────────────────────────────── */

const stats = [
  {
    icon: Star,
    value: 4.9,
    suffix: '',
    label: 'Google Rating',
    color: '#F59E0B',
    bg: 'from-amber-500/20 to-yellow-400/10',
  },
  {
    icon: Users,
    value: 535,
    suffix: '+',
    label: 'Google Reviews',
    color: '#0EA5E9',
    bg: 'from-sky-500/20 to-cyan-400/10',
  },
  {
    icon: Award,
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    color: '#8B5CF6',
    bg: 'from-violet-500/20 to-purple-400/10',
  },
  {
    icon: Heart,
    value: 5000,
    suffix: '+',
    label: 'Happy Patients',
    color: '#EF4444',
    bg: 'from-red-500/20 to-rose-400/10',
  },
  {
    icon: Shield,
    value: 100,
    suffix: '%',
    label: 'Hygiene Standards',
    color: '#10B981',
    bg: 'from-emerald-500/20 to-green-400/10',
  },
];

/* ──────────────────────── stat card component ────────────────────── */

function StatCard({ stat, index, inView }) {
  const count = useCounter(stat.value, inView);
  const Icon = stat.icon;

  /* Format large numbers with commas */
  const display =
    typeof count === 'number' && count >= 1000
      ? count.toLocaleString()
      : count;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 14,
            delay: index * 0.12,
          },
        },
      }}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 50px -12px rgba(14, 165, 233, 0.25)',
      }}
      className="glass-card group relative overflow-hidden rounded-2xl p-6 text-center
                 transition-shadow duration-300 cursor-default"
    >
      {/* subtle gradient shimmer on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity
                    duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(14,165,233,0.08) 0%, transparent 70%)',
        }}
      />

      {/* icon circle */}
      <div
        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full
                     bg-gradient-to-br ${stat.bg} ring-1 ring-white/10
                     transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon size={26} style={{ color: stat.color }} strokeWidth={2} />
      </div>

      {/* counter */}
      <p className="font-poppins text-3xl font-bold text-white md:text-4xl">
        {display}
        <span className="text-sky-400">{stat.suffix}</span>
      </p>

      {/* label */}
      <p className="mt-1 font-inter text-sm text-slate-400">{stat.label}</p>
    </motion.div>
  );
}

/* ───────────────────────── main component ────────────────────────── */

export default function TrustStats() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  /* IntersectionObserver — fire once */
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
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="trust"
      ref={observe}
      className="relative z-10 w-full overflow-hidden bg-[#0b1120] py-16 md:py-20"
    >
      {/* top / bottom subtle border lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center font-manrope text-xs font-semibold uppercase tracking-[0.25em] text-sky-400"
        >
          Trusted by thousands across Gujarat
        </motion.p>

        {/* stats grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
