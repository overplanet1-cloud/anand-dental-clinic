import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Mehra',
    title: "Rahul's Smile Makeover Journey",
    treatment: 'Cosmetic Dentistry',
    quote:
      'I never imagined my smile could look this good. The entire makeover process was seamless and the results speak for themselves.',
    gradient: 'from-sky-600 via-blue-700 to-indigo-800',
    accentGlow: 'bg-sky-400/20',
    iconGradient: 'from-sky-400 to-blue-500',
    duration: '3:42',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    title: "Priya's Pain-Free Root Canal",
    treatment: 'Root Canal Treatment',
    quote:
      "I was so nervous about the root canal, but I didn't feel a thing. Dr. Anand's gentle approach made it a completely painless experience.",
    gradient: 'from-violet-600 via-purple-700 to-fuchsia-800',
    accentGlow: 'bg-violet-400/20',
    iconGradient: 'from-violet-400 to-purple-500',
    duration: '2:58',
  },
  {
    id: 3,
    name: 'Amit Patel',
    title: "Amit's Dental Implant Story",
    treatment: 'Dental Implants',
    quote:
      'After losing a tooth in an accident, I thought I\'d never chew properly again. The implant feels just like my natural tooth — absolutely incredible.',
    gradient: 'from-emerald-600 via-teal-700 to-cyan-800',
    accentGlow: 'bg-emerald-400/20',
    iconGradient: 'from-emerald-400 to-teal-500',
    duration: '4:15',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const VideoCard = ({ testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:border-sky-400/25 hover:shadow-2xl hover:shadow-sky-500/[0.08] hover:-translate-y-2"
    >
      {/* ─── Thumbnail Area ─── */}
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Gradient background simulating video thumbnail */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient}`}
        />

        {/* Abstract decorative elements to make thumbnails look rich */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-black/20 blur-3xl" />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        {/* Tooth / smile icon watermark */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur-md">
          <Sparkles size={12} className="text-white/50" />
          {testimonial.treatment}
        </div>

        {/* Duration badge */}
        <div className="absolute top-4 right-4 rounded-md bg-black/40 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white/80 backdrop-blur-md">
          {testimonial.duration}
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Play ${testimonial.title}`}
            className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/20 group-hover:shadow-lg group-hover:shadow-white/10 sm:h-[72px] sm:w-[72px]"
          >
            {/* Glow ring on hover */}
            <span
              className={`absolute inset-0 rounded-full ${testimonial.accentGlow} blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />
            <Play
              size={26}
              className="relative z-10 ml-1 fill-white text-white"
            />
          </motion.button>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0f1e]/80 to-transparent" />
      </div>

      {/* ─── Card Body ─── */}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        {/* Treatment tag */}
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r ${testimonial.iconGradient} bg-clip-text text-[11px] font-bold tracking-widest text-transparent uppercase font-[Manrope,sans-serif]`}
        >
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r ${testimonial.iconGradient}`}
          />
          {testimonial.treatment}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug text-white/90 font-[Poppins,sans-serif]">
          {testimonial.title}
        </h3>

        {/* Quote */}
        <p className="text-[13px] leading-relaxed text-white/50 italic font-[Inter,sans-serif]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Patient name */}
        <div className="mt-auto flex items-center gap-3 pt-3 border-t border-white/[0.06]">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.iconGradient} text-xs font-bold text-white shadow-lg`}
          >
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-white/80 font-[Poppins,sans-serif]">
              {testimonial.name}
            </p>
            <p className="text-[11px] text-white/35 font-[Inter,sans-serif]">
              Verified Patient
            </p>
          </div>
        </div>
      </div>

      {/* Top highlight line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </motion.div>
  );
};

const VideoTestimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#0a0f1e] py-20 sm:py-28"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-500/[0.03] blur-[140px]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-sky-500/[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-1.5 text-xs font-medium tracking-widest text-violet-300 uppercase font-[Manrope,sans-serif]">
            Video Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-[Poppins,sans-serif]">
            Patient Stories
          </h2>
          <p className="mt-4 text-base text-white/50 sm:text-lg font-[Inter,sans-serif]">
            Hear directly from our patients about their transformative
            experiences at Anand Dental Hub.
          </p>
        </motion.div>

        {/* ─── Video Grid ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <VideoCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/30 hover:bg-sky-500/10 hover:text-sky-300 font-[Manrope,sans-serif]"
          >
            Share Your Story
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
