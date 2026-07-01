import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Stethoscope,
  Monitor,
  Heart,
  IndianRupee,
  Shield,
  Users,
  Scan,
  Siren,
  CheckCircle2,
} from 'lucide-react';

/* ─── data ────────────────────────────────────────────────────── */
const reasons = [
  {
    icon: Stethoscope,
    title: 'Experienced Dentist',
    desc: '10+ years of dental expertise',
  },
  {
    icon: Monitor,
    title: 'Advanced Equipment',
    desc: 'State-of-the-art dental technology',
  },
  {
    icon: Heart,
    title: 'Painless Treatment',
    desc: 'Gentle care with modern anesthesia',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    desc: 'Quality dental care at fair prices',
  },
  {
    icon: Shield,
    title: 'Sterilized Instruments',
    desc: '100% hygiene protocols followed',
  },
  {
    icon: Users,
    title: 'Friendly Staff',
    desc: 'Warm and welcoming team',
  },
  {
    icon: Scan,
    title: 'Digital X-Ray',
    desc: 'Instant digital imaging diagnostics',
  },
  {
    icon: Siren,
    title: 'Emergency Care',
    desc: 'Available for dental emergencies',
  },
];

/* ─── animation helpers ───────────────────────────────────────── */
const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

/* ─── TimelineItem ────────────────────────────────────────────── */
function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = item.icon;

  /* card slides in from its respective side on desktop, from bottom on mobile */
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: typeof window !== 'undefined' && window.innerWidth >= 768 ? (isLeft ? -80 : 80) : 0,
      y: typeof window !== 'undefined' && window.innerWidth >= 768 ? 0 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.05 },
    },
  };

  const checkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 22, delay: 0.25 },
    },
  };

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full
        md:justify-${isLeft ? 'start' : 'end'}
        justify-start
      `}
      style={{ minHeight: 140 }}
    >
      {/* ── Desktop layout ────────────────────────────────────── */}
      {/* Left-side card (even indices) */}
      {isLeft && (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:flex w-[calc(50%-40px)] justify-end pr-4"
        >
          <CardContent icon={Icon} item={item} checkVariants={checkVariants} isInView={isInView} align="right" />
        </motion.div>
      )}

      {/* Spacer for right-side cards on desktop */}
      {!isLeft && <div className="hidden md:block w-[calc(50%-40px)]" />}

      {/* ── Center dot (desktop) ──────────────────────────────── */}
      <motion.div
        variants={dotVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center"
      >
        {/* Pulse ring */}
        <span
          className={`absolute w-10 h-10 rounded-full transition-all duration-700 ${
            isInView ? 'animate-ping opacity-20' : 'opacity-0'
          }`}
          style={{ background: 'linear-gradient(135deg, #0EA5E9, #06B6D4)' }}
        />
        {/* Solid dot */}
        <span
          className="relative w-5 h-5 rounded-full ring-4 ring-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
            boxShadow: '0 0 18px rgba(14,165,233,0.45)',
          }}
        />
      </motion.div>

      {/* Right-side card (odd indices) */}
      {!isLeft && (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:flex w-[calc(50%-40px)] justify-start pl-4"
        >
          <CardContent icon={Icon} item={item} checkVariants={checkVariants} isInView={isInView} align="left" />
        </motion.div>
      )}

      {/* Spacer for left-side cards on desktop */}
      {isLeft && <div className="hidden md:block w-[calc(50%-40px)]" />}

      {/* ── Mobile layout ─────────────────────────────────────── */}
      <div className="flex md:hidden items-start gap-4 w-full pl-2">
        {/* Mobile dot + line */}
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.span
            variants={dotVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative w-4 h-4 rounded-full ring-[3px] ring-white shadow-md z-10"
            style={{
              background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
              boxShadow: '0 0 12px rgba(14,165,233,0.4)',
            }}
          />
          {/* connecting line (hidden on last item) */}
          {index < reasons.length - 1 && (
            <div
              className="w-0.5 flex-1 min-h-[60px]"
              style={{
                background: 'linear-gradient(180deg, #0EA5E9 0%, #06B6D4 100%)',
                opacity: 0.3,
              }}
            />
          )}
        </div>

        {/* Mobile card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex-1 pb-8"
        >
          <CardContent icon={Icon} item={item} checkVariants={checkVariants} isInView={isInView} align="left" />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── CardContent (shared between desktop & mobile) ───────────── */
function CardContent({ icon: Icon, item, checkVariants, isInView, align }) {
  return (
    <div
      className={`glass-card rounded-2xl p-5 sm:p-6 max-w-md w-full relative group
        transition-all duration-500 hover:shadow-[0_16px_48px_-10px_rgba(14,165,233,0.18)]
        ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      {/* Hover gradient border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-500"
        style={{
          border: '1.5px solid transparent',
          borderImage: 'linear-gradient(135deg, #0EA5E9, #2563EB, #06B6D4) 1',
          mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />

      <div
        className={`flex items-start gap-4 ${
          align === 'right' ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Icon circle */}
        <div
          className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl
                      transition-shadow duration-500 group-hover:shadow-[0_6px_24px_rgba(14,165,233,0.3)]"
          style={{
            background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
          }}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div
            className={`flex items-center gap-2 mb-1 ${
              align === 'right' ? 'justify-end' : 'justify-start'
            }`}
          >
            <h3 className="font-poppins font-bold text-base sm:text-lg text-dark-900 leading-tight">
              {item.title}
            </h3>

            {/* Animated check */}
            <motion.span
              variants={checkVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <CheckCircle2
                className="w-[18px] h-[18px] text-emerald-500 flex-shrink-0"
                strokeWidth={2.2}
              />
            </motion.span>
          </div>

          <p
            className={`font-inter text-sm text-dark-500 leading-relaxed ${
              align === 'right' ? 'text-right' : 'text-left'
            }`}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── WhyChooseUs Section ─────────────────────────────────────── */
export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="why-choose"
      ref={sectionRef}
      className="relative section-padding bg-gradient-section overflow-hidden"
    >
      {/* Decorative blurs */}
      <div
        className="absolute top-40 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)' }}
      />
      <div
        className="absolute bottom-20 -left-32 w-[360px] h-[360px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.span
            variants={headingVariants}
            className="inline-block font-manrope font-bold text-xs sm:text-sm tracking-[0.2em] uppercase
                       text-primary-500 mb-3"
          >
            Why Patients Trust Us
          </motion.span>

          <motion.h2
            variants={headingVariants}
            className="section-title"
          >
            Why Choose{' '}
            <span className="gradient-text">Us</span>
          </motion.h2>

          <motion.p
            variants={headingVariants}
            className="section-subtitle mt-3"
          >
            Every detail of your dental experience is designed for comfort,
            safety, and outstanding results.
          </motion.p>

          <motion.div
            variants={headingVariants}
            className="mx-auto mt-6 h-1 w-20 rounded-full"
            style={{ background: 'linear-gradient(90deg, #0EA5E9, #06B6D4)' }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* ── Center vertical line (desktop only) ────────────── */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full"
            style={{
              background:
                'linear-gradient(180deg, #0EA5E9 0%, #2563EB 40%, #06B6D4 100%)',
              opacity: 0.22,
            }}
          />
          {/* Animated shimmer on center line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[3px] h-full rounded-full overflow-hidden"
            style={{ opacity: 0.18 }}
          >
            <div
              className="w-full h-1/3 animate-bounce-gentle"
              style={{
                background:
                  'linear-gradient(180deg, transparent, #0EA5E9, #06B6D4, transparent)',
              }}
            />
          </div>

          {/* Timeline items */}
          <div className="flex flex-col gap-6 md:gap-10">
            {reasons.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* End dot (desktop) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-3 items-center justify-center">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                boxShadow: '0 0 10px rgba(6,182,212,0.4)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
