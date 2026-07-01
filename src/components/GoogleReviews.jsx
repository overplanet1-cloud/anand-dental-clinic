import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Star } from 'lucide-react';

const reviews = [
  {
    name: 'Rohit Sharma',
    initial: 'R',
    gradient: 'from-sky-400 to-blue-600',
    text: 'Absolutely wonderful experience! Dr. Anand and the entire team made me feel comfortable from the very first visit. My smile has never looked better.',
    time: '2 weeks ago',
  },
  {
    name: 'Neha Gupta',
    initial: 'N',
    gradient: 'from-pink-400 to-rose-600',
    text: 'I was terrified of dentists my whole life, but this clinic changed everything. Painless treatment and the staff is incredibly patient and kind.',
    time: '3 weeks ago',
  },
  {
    name: 'Amit Kumar',
    initial: 'A',
    gradient: 'from-emerald-400 to-teal-600',
    text: 'Got my dental implants done here and the results are phenomenal. Feels completely natural. Highly recommend to anyone looking for quality dental care.',
    time: '1 month ago',
  },
  {
    name: 'Priya Singh',
    initial: 'P',
    gradient: 'from-violet-400 to-purple-600',
    text: 'The clinic is spotlessly clean and uses the latest technology. My root canal was completely painless — I couldn\'t believe it!',
    time: '1 month ago',
  },
  {
    name: 'Rajesh Patel',
    initial: 'R',
    gradient: 'from-amber-400 to-orange-600',
    text: 'Best dental clinic in the city, hands down. Professional staff, modern equipment, and very reasonable pricing. Five stars well deserved.',
    time: '2 months ago',
  },
  {
    name: 'Sunita Devi',
    initial: 'S',
    gradient: 'from-cyan-400 to-sky-600',
    text: 'My entire family gets treated here. From kids\' dental check-ups to my husband\'s braces — they handle everything with expertise and care.',
    time: '2 months ago',
  },
  {
    name: 'Vikram Jha',
    initial: 'V',
    gradient: 'from-indigo-400 to-blue-700',
    text: 'Had a dental emergency at night and they attended to me promptly. The level of dedication is rare to find. Truly grateful for their service.',
    time: '3 months ago',
  },
  {
    name: 'Anita Kumari',
    initial: 'A',
    gradient: 'from-rose-400 to-pink-600',
    text: 'Got teeth whitening done and the results exceeded my expectations. The process was quick, comfortable, and my teeth look amazing now!',
    time: '3 months ago',
  },
  {
    name: 'Sanjay Verma',
    initial: 'S',
    gradient: 'from-lime-400 to-green-600',
    text: 'Very transparent about treatment options and costs. No hidden charges, no unnecessary procedures. A clinic you can genuinely trust.',
    time: '4 months ago',
  },
  {
    name: 'Meera Rani',
    initial: 'M',
    gradient: 'from-fuchsia-400 to-purple-600',
    text: 'Dr. Anand explained every step of my treatment clearly. The crown fitting was perfect and comfortable from day one. Exceptional craftsmanship.',
    time: '5 months ago',
  },
  {
    name: 'Deepak Sinha',
    initial: 'D',
    gradient: 'from-teal-400 to-emerald-600',
    text: 'I traveled from another city specifically for this clinic after reading reviews. Worth every kilometer. The quality of care is truly international standard.',
    time: '5 months ago',
  },
  {
    name: 'Kavita Devi',
    initial: 'K',
    gradient: 'from-orange-400 to-red-500',
    text: 'My braces journey here was smooth and the results are beautiful. The regular follow-ups and adjustments were always on schedule. Thank you, team!',
    time: '6 months ago',
  },
];

/* Duplicate reviews for infinite scroll illusion */
const duplicatedReviews = [...reviews, ...reviews];

const GoogleColorText = () => (
  <span className="inline-flex items-center gap-0.5 text-xs font-semibold tracking-wide select-none">
    <span style={{ color: '#4285F4' }}>G</span>
    <span style={{ color: '#EA4335' }}>o</span>
    <span style={{ color: '#FBBC05' }}>o</span>
    <span style={{ color: '#4285F4' }}>g</span>
    <span style={{ color: '#34A853' }}>l</span>
    <span style={{ color: '#EA4335' }}>e</span>
  </span>
);

const GoldStars = ({ size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} className="fill-amber-400 text-amber-400" />
    ))}
  </div>
);

const ReviewCard = ({ review, index }) => (
  <div
    className="group relative min-w-[320px] max-w-[360px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/30 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-sky-500/5"
    style={{ willChange: 'transform' }}
  >
    {/* Subtle top glow on hover */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    {/* Header */}
    <div className="mb-4 flex items-center gap-3">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${review.gradient} text-sm font-bold text-white shadow-lg`}
      >
        {review.initial}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold text-white/90 font-[Poppins,sans-serif]">
          {review.name}
        </p>
        <GoldStars size={13} />
      </div>
    </div>

    {/* Review text */}
    <p className="mb-4 text-[13px] leading-relaxed text-white/60 font-[Inter,sans-serif]">
      &ldquo;{review.text}&rdquo;
    </p>

    {/* Footer */}
    <div className="flex items-center justify-between">
      <GoogleColorText />
      <span className="text-[11px] text-white/30">{review.time}</span>
    </div>
  </div>
);

const GoogleReviews = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = 340; // min-w + gap
    container.scrollLeft += direction === 'left' ? -cardWidth : cardWidth;
  }, []);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#0a0f1e] py-20 sm:py-28"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-sky-500/[0.04] blur-[120px]" />

      {/* ─── Section Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto mb-14 max-w-2xl px-6 text-center"
      >
        <span className="mb-4 inline-block rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-xs font-medium tracking-widest text-sky-300 uppercase font-[Manrope,sans-serif]">
          Patient Reviews
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-[Poppins,sans-serif]">
          What Our Patients Say
        </h2>
        <p className="mt-4 text-base text-white/50 sm:text-lg font-[Inter,sans-serif]">
          Real experiences from real patients — see why hundreds trust us with
          their smiles on Google.
        </p>
      </motion.div>

      {/* ─── Google Rating Badge ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto mb-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6"
      >
        {/* Large rating */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-xl">
          <span className="text-5xl font-extrabold text-white font-[Poppins,sans-serif]">
            4.9
          </span>
          <div className="flex flex-col gap-1">
            <GoldStars size={18} />
            <span className="text-xs text-white/50 font-[Inter,sans-serif]">
              535+ Reviews on{' '}
              <span className="inline-flex">
                <GoogleColorText />
              </span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* ─── Carousel ─── */}
      <div className="relative z-10">
        {/* Gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-[#0a0f1e] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-[#0a0f1e] to-transparent sm:w-32" />

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="reviews-scroll-wrapper overflow-hidden"
          onMouseEnter={() => {
            if (scrollRef.current) {
              scrollRef.current.querySelector('.reviews-scroll')?.style.setProperty('animation-play-state', 'paused');
            }
          }}
          onMouseLeave={() => {
            if (scrollRef.current && !isPaused) {
              scrollRef.current.querySelector('.reviews-scroll')?.style.setProperty('animation-play-state', 'running');
            }
          }}
        >
          <div
            className={`reviews-scroll flex gap-5 py-2 px-6`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicatedReviews.map((review, i) => (
              <ReviewCard key={`${review.name}-${i}`} review={review} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Controls ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 mx-auto mt-10 flex items-center justify-center gap-3"
      >
        <button
          onClick={() => scroll('left')}
          aria-label="Previous reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 backdrop-blur-xl transition-all duration-200 hover:border-sky-400/30 hover:bg-sky-500/10 hover:text-sky-300 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={togglePause}
          aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/20 bg-sky-500/10 text-sky-300 backdrop-blur-xl transition-all duration-200 hover:border-sky-400/40 hover:bg-sky-500/20 active:scale-95"
        >
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </button>

        <button
          onClick={() => scroll('right')}
          aria-label="Next reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 backdrop-blur-xl transition-all duration-200 hover:border-sky-400/30 hover:bg-sky-500/10 hover:text-sky-300 active:scale-95"
        >
          <ChevronRight size={20} />
        </button>
      </motion.div>
    </section>
  );
};

export default GoogleReviews;
