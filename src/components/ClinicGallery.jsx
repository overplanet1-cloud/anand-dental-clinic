import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: 'Reception & Lobby',
    image: '/images/clinic.jpg',
    hasImage: true,
    gradient: 'from-sky-600 via-blue-700 to-indigo-800',
    icon: '🏥',
  },
  {
    id: 2,
    title: 'Consultation Room',
    image: '/images/consultation.jpg',
    hasImage: true,
    gradient: 'from-cyan-600 via-teal-700 to-emerald-800',
    icon: '💬',
  },
  {
    id: 3,
    title: 'Waiting Lounge',
    image: '/images/waiting.jpg',
    hasImage: true,
    gradient: 'from-blue-500 via-sky-600 to-cyan-700',
    icon: '🛋️',
  },
  {
    id: 4,
    title: 'Sterilization Room',
    image: null,
    hasImage: false,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    icon: '🧪',
  },
  {
    id: 5,
    title: 'Digital X-Ray Room',
    image: null,
    hasImage: false,
    gradient: 'from-violet-500 via-purple-600 to-indigo-700',
    icon: '📡',
  },
  {
    id: 6,
    title: 'Treatment Room',
    image: null,
    hasImage: false,
    gradient: 'from-blue-600 via-indigo-700 to-violet-800',
    icon: '🦷',
  },
];

const ClinicGallery = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoScrollTimerRef = useRef(null);

  const getCardWidth = useCallback(() => {
    if (!scrollRef.current) return 320;
    const firstCard = scrollRef.current.querySelector('[data-gallery-card]');
    if (!firstCard) return 320;
    const style = window.getComputedStyle(firstCard);
    const marginRight = parseFloat(style.marginRight) || 0;
    return firstCard.offsetWidth + marginRight;
  }, []);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const cardWidth = getCardWidth();
    const newIndex = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, galleryItems.length - 1));
  }, [getCardWidth]);

  const scrollTo = useCallback(
    (direction) => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = getCardWidth();
      const amount = direction === 'left' ? -cardWidth : cardWidth;
      el.scrollBy({ left: amount, behavior: 'smooth' });
    },
    [getCardWidth]
  );

  const scrollToIndex = useCallback(
    (index) => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = getCardWidth();
      el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
    },
    [getCardWidth]
  );

  // Auto-scroll
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollTimerRef.current = setInterval(() => {
        if (isPaused) return;
        const el = scrollRef.current;
        if (!el) return;

        const cardWidth = getCardWidth();
        const maxScroll = el.scrollWidth - el.clientWidth;

        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 4000);
    };

    startAutoScroll();
    return () => clearInterval(autoScrollTimerRef.current);
  }, [isPaused, getCardWidth]);

  // Scroll listener
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  return (
    <section
      id="clinic-gallery"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0b1120 50%, #0f172a 100%)' }}
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
            <Building2 className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-medium text-sky-300 tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
              World-Class Facility
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Our{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Clinic
            </span>
          </h2>
          <p
            className="text-lg text-slate-400 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Step inside our state-of-the-art dental facility, designed for your comfort and safety.
          </p>
        </motion.div>

        {/* Gallery Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative group/gallery"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Scroll Buttons */}
          <button
            onClick={() => scrollTo('left')}
            className={`
              absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 rounded-full
              bg-white/10 backdrop-blur-xl border border-white/20
              flex items-center justify-center
              text-white hover:bg-white/20
              transition-all duration-300 cursor-pointer
              ${canScrollLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
              shadow-lg shadow-black/30
            `}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo('right')}
            className={`
              absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 rounded-full
              bg-white/10 backdrop-blur-xl border border-white/20
              flex items-center justify-center
              text-white hover:bg-white/20
              transition-all duration-300 cursor-pointer
              ${canScrollRight ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
              shadow-lg shadow-black/30
            `}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Edge Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#0b1120] to-transparent z-10 pointer-events-none rounded-l-2xl" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#0b1120] to-transparent z-10 pointer-events-none rounded-r-2xl" />

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Leading spacer for centering first card */}
            <div className="shrink-0 w-2 sm:w-6" />

            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                data-gallery-card
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="shrink-0 snap-center min-w-[280px] sm:min-w-[300px] md:min-w-[400px] group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-500/15"
                >
                  {/* Image / Placeholder */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {item.hasImage ? (
                      <>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            // Fallback to gradient placeholder on image load error
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        {/* Fallback placeholder (hidden by default) */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} items-center justify-center hidden`}
                        >
                          <span className="text-6xl">{item.icon}</span>
                        </div>
                      </>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-4`}>
                        <span className="text-6xl drop-shadow-lg">{item.icon}</span>
                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-24 h-24 border border-white/10 rounded-full" />
                        <div className="absolute bottom-6 left-6 w-16 h-16 border border-white/10 rounded-full" />
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full" />
                        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-white/15 rounded-full" />
                      </div>
                    )}

                    {/* Top gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Bottom Overlay with Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-lg shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3
                          className="text-white font-semibold text-sm sm:text-base"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span
                            className="text-slate-300 text-xs"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            State of the art
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Trailing spacer */}
            <div className="shrink-0 w-2 sm:w-6" />
          </div>
        </motion.div>

        {/* Scroll Indicator Dots */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-2 mt-8"
        >
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`
                h-2 rounded-full transition-all duration-400 cursor-pointer
                ${
                  activeIndex === index
                    ? 'w-8 bg-gradient-to-r from-sky-400 to-blue-500 shadow-md shadow-sky-500/30'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Helper style to hide scrollbar */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </section>
  );
};

export default ClinicGallery;
