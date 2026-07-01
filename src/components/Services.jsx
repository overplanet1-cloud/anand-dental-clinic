import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles,
  Smile,
  CircleDot,
  Zap,
  Baby,
  Activity,
  AlignCenter,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

/* ─── service data ────────────────────────────────────────────── */
const services = [
  {
    icon: Sparkles,
    title: 'Teeth Whitening',
    desc: 'Brighten your smile with professional whitening treatments',
  },
  {
    icon: Smile,
    title: 'Cosmetic Dentistry',
    desc: 'Transform your smile with veneers, bonding & more',
  },
  {
    icon: CircleDot,
    title: 'Dental Implants',
    desc: 'Permanent tooth replacement with titanium implants',
  },
  {
    icon: Zap,
    title: 'Laser Dentistry',
    desc: 'Advanced laser treatments for precision care',
  },
  {
    icon: Baby,
    title: 'Kids Dentistry',
    desc: 'Gentle and fun dental care for children',
  },
  {
    icon: Activity,
    title: 'Root Canal',
    desc: 'Pain-free root canal treatment with modern technology',
  },
  {
    icon: AlignCenter,
    title: 'Braces & Orthodontics',
    desc: 'Straighten teeth with traditional or invisible braces',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Care',
    desc: '24/7 emergency dental services when you need it',
  },
];

/* ─── animation variants ──────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

/* ─── ServiceCard ─────────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative glass-card rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center
                 transition-all duration-500 ease-out cursor-pointer will-change-transform"
    >
      {/* Gradient border overlay on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(135deg, rgba(14,165,233,0.18), rgba(37,99,235,0.18), rgba(6,182,212,0.18))',
          border: '1.5px solid transparent',
          borderImage: 'linear-gradient(135deg, #0EA5E9, #2563EB, #06B6D4) 1',
          borderRadius: 'inherit',
          mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 blur-xl
                    transition-opacity duration-700 -z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(37,99,235,0.1))',
        }}
      />

      {/* Lift + scale on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-shadow duration-500
                    shadow-none group-hover:shadow-[0_20px_60px_-12px_rgba(14,165,233,0.25)]"
      />

      {/* Icon circle */}
      <div
        className="relative mb-5 flex h-16 w-16 sm:h-[72px] sm:w-[72px] items-center justify-center
                    rounded-full transition-transform duration-700 ease-out
                    group-hover:rotate-[360deg]"
        style={{
          background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
          boxShadow: isHovered
            ? '0 8px 30px rgba(14,165,233,0.45)'
            : '0 4px 16px rgba(14,165,233,0.25)',
        }}
      >
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.8} />
        {/* Animated ring */}
        <span
          className="absolute inset-0 rounded-full border-2 border-primary-300/40
                      scale-100 group-hover:scale-[1.35] opacity-100 group-hover:opacity-0
                      transition-all duration-700"
        />
      </div>

      {/* Title */}
      <h3 className="font-poppins font-bold text-lg sm:text-xl text-dark-900 mb-2.5 leading-tight">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-inter text-sm sm:text-[15px] text-dark-500 leading-relaxed mb-5 flex-1">
        {service.desc}
      </p>

      {/* Learn More link */}
      <span
        className="inline-flex items-center gap-1.5 font-manrope font-semibold text-sm
                    text-primary-500 group-hover:text-primary-600 transition-colors duration-300"
      >
        Learn More
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2.2}
        />
      </span>
    </motion.div>
  );
}

/* ─── Services Section ────────────────────────────────────────── */
export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative section-padding bg-gradient-section overflow-hidden"
    >
      {/* Decorative blurs */}
      <div
        className="absolute top-20 -left-40 w-[420px] h-[420px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0EA5E9, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 -right-40 w-[380px] h-[380px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
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
            What We Offer
          </motion.span>

          <motion.h2
            variants={headingVariants}
            className="section-title"
          >
            Our{' '}
            <span className="gradient-text">Services</span>
          </motion.h2>

          <motion.p
            variants={headingVariants}
            className="section-subtitle mt-3"
          >
            Comprehensive dental solutions powered by modern technology and
            delivered with a gentle, caring touch.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={headingVariants}
            className="mx-auto mt-6 h-1 w-20 rounded-full"
            style={{ background: 'linear-gradient(90deg, #0EA5E9, #2563EB)' }}
          />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
