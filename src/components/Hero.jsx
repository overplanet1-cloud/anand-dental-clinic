import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, ChevronDown, Star, Sparkles } from 'lucide-react';
import DarkVeil from './DarkVeil/DarkVeil';

const WHATSAPP_URL = 'https://wa.me/919036340518';

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const floatVariants = (duration = 6, y = 20) => ({
  animate: {
    y: [-y / 2, y / 2, -y / 2],
    transition: { duration, repeat: Infinity, ease: 'easeInOut' },
  },
});

const rotateFloat = (duration = 8) => ({
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 15, -15, 0],
    transition: { duration, repeat: Infinity, ease: 'easeInOut' },
  },
});

/* ─── Floating decorative particle ─── */
const FloatingParticle = ({ children, className, duration = 6, y = 20, delay = 0 }) => (
  <motion.div
    className={`absolute pointer-events-none select-none ${className}`}
    animate={{
      y: [-y / 2, y / 2, -y / 2],
      opacity: [0.4, 0.8, 0.4],
    }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    {children}
  </motion.div>
);

/* ─── Glass badge ─── */
const GlassBadge = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
      bg-white/[0.08] backdrop-blur-md border border-white/[0.12] text-white/90 ${className}`}
  >
    {children}
  </span>
);

/* ─── Feature pill ─── */
const FeaturePill = ({ text }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
    bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-white/80 text-xs sm:text-sm font-inter">
    <span className="text-emerald-400 text-sm">✓</span>
    {text}
  </div>
);

/* ═══════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════ */
const Hero = () => {
  const scrollToAppointment = (e) => {
    e.preventDefault();
    const el = document.getElementById('appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex items-center"
    >
      {/* ── DarkVeil WebGL Background ── */}
      <div className="absolute inset-0 z-0">
        <DarkVeil speed={0.3} hueShift={200} warpAmount={0.5} />
      </div>

      {/* ── Overlay gradient ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0f172a]/60 via-[#0f172a]/40 to-[#0f172a]/80" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0f172a]/70 via-transparent to-transparent" />

      {/* ── Floating decorative elements ── */}
      <FloatingParticle className="top-[15%] left-[8%] z-[2] hidden md:block" duration={7} y={25} delay={0}>
        <div className="w-32 h-32 rounded-full bg-cyan-500/[0.06] blur-xl" />
      </FloatingParticle>
      <FloatingParticle className="top-[60%] left-[5%] z-[2] hidden lg:block" duration={9} y={30} delay={1.5}>
        <div className="w-20 h-20 rounded-full bg-blue-500/[0.08] blur-lg" />
      </FloatingParticle>
      <FloatingParticle className="top-[20%] right-[15%] z-[2] hidden lg:block" duration={8} y={22} delay={0.8}>
        <div className="w-24 h-24 rounded-full bg-sky-400/[0.06] blur-xl" />
      </FloatingParticle>
      <FloatingParticle className="bottom-[25%] right-[8%] z-[2] hidden md:block" duration={6} y={18} delay={2}>
        <div className="w-16 h-16 rounded-full bg-cyan-400/[0.1] blur-lg" />
      </FloatingParticle>

      {/* ── Scattered tooth icons ── */}
      <FloatingParticle className="top-[30%] left-[3%] z-[2] hidden lg:block text-2xl opacity-20" duration={10} y={15} delay={0.5}>
        🦷
      </FloatingParticle>
      <FloatingParticle className="bottom-[35%] left-[12%] z-[2] hidden xl:block text-lg opacity-15" duration={12} y={20} delay={3}>
        🦷
      </FloatingParticle>
      <FloatingParticle className="top-[12%] right-[30%] z-[2] hidden xl:block text-xl opacity-10" duration={11} y={18} delay={1}>
        ✨
      </FloatingParticle>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 xl:gap-16">

          {/* ── LEFT COLUMN: Text Content ── */}
          <motion.div
            className="flex-1 text-center lg:text-left text-white max-w-2xl lg:max-w-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <GlassBadge className="text-[11px] sm:text-xs tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Anand Dental Hub (M.D.S)
              </GlassBadge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-poppins text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.08] mb-6"
            >
              <span className="block">
                Your Smile,
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Our Passion.
              </span>
            </motion.h1>

            {/* Star Rating Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl
                bg-white/[0.06] backdrop-blur-md border border-white/[0.1]">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold font-inter text-white">
                  4.9 Rating
                </span>
                <span className="text-white/30">·</span>
                <span className="text-sm font-inter text-white/70">
                  535+ Google Reviews
                </span>
              </div>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-10"
            >
              <FeaturePill text="Modern Dentistry" />
              <FeaturePill text="Pain Free Treatment" />
              <FeaturePill text="Experienced Specialists" />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              {/* Book Appointment */}
              <a
                href="#appointment"
                onClick={scrollToAppointment}
                className="btn-primary group relative inline-flex items-center gap-2.5 px-7 py-3.5
                  rounded-full font-manrope font-semibold text-sm sm:text-base text-white
                  bg-gradient-to-r from-[#0EA5E9] to-[#2563EB]
                  shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                  hover:scale-105 active:scale-95 transition-all duration-300
                  overflow-hidden"
              >
                {/* shine sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
                  bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <Calendar className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Book Appointment</span>
              </a>

              {/* WhatsApp Now */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp group relative inline-flex items-center gap-2.5 px-7 py-3.5
                  rounded-full font-manrope font-semibold text-sm sm:text-base text-white
                  bg-gradient-to-r from-green-500 to-emerald-600
                  shadow-lg shadow-green-500/25 hover:shadow-green-500/40
                  hover:scale-105 active:scale-95 transition-all duration-300
                  overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full animate-ping bg-green-400/20 pointer-events-none" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
                  bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">WhatsApp Now</span>
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Doctor Image ── */}
          <motion.div
            className="flex-1 flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Outer glow ring */}
            <div className="relative">
              {/* Gradient glow behind circle */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/10 blur-2xl animate-pulse" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-400/20 via-sky-500/15 to-blue-600/20 blur-lg" />

              {/* Circular image container */}
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden
                  border-[3px] border-white/[0.15] shadow-2xl shadow-cyan-500/10"
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* inner gradient border effect */}
                <div className="absolute inset-0 rounded-full border-[3px] border-transparent
                  bg-gradient-to-br from-cyan-400/30 via-transparent to-blue-500/30 pointer-events-none z-10
                  [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                  [-webkit-mask-composite:xor] [mask-composite:exclude] p-[3px]" />

                <img
                  src="/images/doctor.jpg"
                  alt="Dr. Anand - Dental Specialist"
                  className="w-full h-full object-cover"
                  loading="eager"
                />

                {/* subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* ── Floating emojis around image ── */}
              {/* Tooth emoji - top right */}
              <motion.div
                className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 text-3xl sm:text-4xl select-none pointer-events-none"
                animate={{ y: [-8, 8, -8], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                🦷
              </motion.div>

              {/* Sparkle emoji - top left */}
              <motion.div
                className="absolute -top-2 -left-6 sm:-top-3 sm:-left-8 text-2xl sm:text-3xl select-none pointer-events-none"
                animate={{ y: [-6, 10, -6], rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                ✨
              </motion.div>

              {/* Diamond emoji - bottom right */}
              <motion.div
                className="absolute -bottom-2 -right-4 sm:-bottom-4 sm:-right-6 text-2xl sm:text-3xl select-none pointer-events-none"
                animate={{ y: [-10, 6, -10], rotate: [0, 20, -20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                💎
              </motion.div>

              {/* Extra tooth - bottom left */}
              <motion.div
                className="absolute -bottom-6 -left-2 sm:-bottom-8 sm:-left-4 text-xl sm:text-2xl select-none pointer-events-none opacity-60"
                animate={{ y: [-5, 12, -5] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              >
                🦷
              </motion.div>

              {/* Star - mid left */}
              <motion.div
                className="absolute top-1/2 -left-8 sm:-left-12 -translate-y-1/2 text-xl sm:text-2xl select-none pointer-events-none opacity-50"
                animate={{ y: [-7, 7, -7], scale: [1, 1.15, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                ⭐
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="text-white/40 text-xs font-inter tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>

      {/* ── Bottom fade for seamless section transition ── */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f172a] to-transparent z-[2] pointer-events-none" />
    </section>
  );
};

export default Hero;
