import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const categories = ['All', 'Implants', 'Braces', 'Whitening', 'Smile Design', 'Root Canal'];

const transformations = [
  {
    id: 1,
    category: 'Implants',
    title: 'Full Mouth Implants',
    description: 'Complete restoration with premium titanium implants',
    gradientBefore: 'from-slate-400 via-gray-500 to-slate-600',
    gradientAfter: 'from-sky-400 via-cyan-400 to-blue-500',
    accentColor: '#0EA5E9',
  },
  {
    id: 2,
    category: 'Braces',
    title: 'Ceramic Braces Alignment',
    description: 'Perfect alignment achieved in 14 months',
    gradientBefore: 'from-zinc-400 via-stone-500 to-neutral-600',
    gradientAfter: 'from-emerald-400 via-teal-400 to-cyan-500',
    accentColor: '#06B6D4',
  },
  {
    id: 3,
    category: 'Whitening',
    title: 'Laser Teeth Whitening',
    description: '8 shades brighter in a single session',
    gradientBefore: 'from-amber-300 via-yellow-400 to-orange-400',
    gradientAfter: 'from-white via-sky-100 to-cyan-200',
    accentColor: '#38BDF8',
  },
  {
    id: 4,
    category: 'Smile Design',
    title: 'Digital Smile Makeover',
    description: 'Porcelain veneers with precision planning',
    gradientBefore: 'from-gray-400 via-slate-500 to-zinc-600',
    gradientAfter: 'from-violet-400 via-purple-400 to-indigo-500',
    accentColor: '#8B5CF6',
  },
  {
    id: 5,
    category: 'Root Canal',
    title: 'Painless Root Canal',
    description: 'Microscope-assisted precision treatment',
    gradientBefore: 'from-red-300 via-rose-400 to-pink-500',
    gradientAfter: 'from-sky-300 via-blue-400 to-indigo-500',
    accentColor: '#2563EB',
  },
  {
    id: 6,
    category: 'Implants',
    title: 'Single Tooth Implant',
    description: 'Seamless replacement matching natural teeth',
    gradientBefore: 'from-stone-400 via-neutral-500 to-gray-600',
    gradientAfter: 'from-teal-400 via-emerald-400 to-green-500',
    accentColor: '#14B8A6',
  },
  {
    id: 7,
    category: 'Braces',
    title: 'Invisible Aligners',
    description: 'Clear aligner therapy — smile while you straighten',
    gradientBefore: 'from-zinc-300 via-gray-400 to-slate-500',
    gradientAfter: 'from-blue-400 via-sky-400 to-cyan-400',
    accentColor: '#0EA5E9',
  },
  {
    id: 8,
    category: 'Smile Design',
    title: 'Gum Contouring + Veneers',
    description: 'Harmonized gum line with custom veneers',
    gradientBefore: 'from-rose-300 via-pink-400 to-fuchsia-400',
    gradientAfter: 'from-sky-400 via-blue-500 to-indigo-600',
    accentColor: '#3B82F6',
  },
  {
    id: 9,
    category: 'Whitening',
    title: 'In-Office Bleaching',
    description: 'Professional grade whitening results',
    gradientBefore: 'from-yellow-200 via-amber-300 to-orange-300',
    gradientAfter: 'from-cyan-200 via-sky-300 to-blue-300',
    accentColor: '#06B6D4',
  },
];

const BeforeAfter = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCard, setSelectedCard] = useState(null);

  const filtered =
    activeCategory === 'All'
      ? transformations
      : transformations.filter((t) => t.category === activeCategory);

  const closeLightbox = useCallback(() => setSelectedCard(null), []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (selectedCard) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [selectedCard, closeLightbox]);

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0c1425 50%, #0f172a 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-medium text-sky-300 tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
              Real Patient Results
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Smile{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Transformations
            </span>
          </h2>
          <p
            className="text-lg text-slate-400 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Witness the life-changing results crafted by Dr. Anand and our expert team.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`
                  relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer
                  ${
                    isActive
                      ? 'text-white shadow-lg shadow-sky-500/25'
                      : 'text-slate-300 hover:text-white bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10'
                  }
                `}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #0EA5E9, #2563EB)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Card Grid */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((card) => (
              <motion.div
                key={card.id}
                layoutId={`card-${card.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedCard(card)}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-500/10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-[4/3]"
                  >
                    {/* Before Half */}
                    <div className={`absolute inset-0 w-1/2 bg-gradient-to-br ${card.gradientBefore}`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="text-white/80 font-bold text-xs sm:text-sm tracking-widest uppercase"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          Before
                        </span>
                      </div>
                    </div>

                    {/* After Half */}
                    <div className={`absolute inset-0 left-1/2 w-1/2 bg-gradient-to-br ${card.gradientAfter}`}>
                      <div className="absolute inset-0 bg-black/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="text-white font-bold text-xs sm:text-sm tracking-widest uppercase"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          After
                        </span>
                      </div>
                    </div>

                    {/* Center Divider */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/40" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white shadow-lg" />
                    </div>

                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </motion.div>

                  {/* Card Footer */}
                  <div className="relative bg-slate-900/80 backdrop-blur-xl p-3 sm:p-4 border-t border-white/5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h3
                          className="text-white font-semibold text-xs sm:text-sm truncate"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="text-slate-400 text-[10px] sm:text-xs mt-0.5 truncate hidden sm:block"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {card.description}
                        </p>
                      </div>
                      <span
                        className="shrink-0 px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white/90"
                        style={{
                          background: `${card.accentColor}33`,
                          border: `1px solid ${card.accentColor}55`,
                          fontFamily: 'Manrope, sans-serif',
                        }}
                      >
                        {card.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-slate-500 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                No transformations found in this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

            {/* Content */}
            <motion.div
              layoutId={`card-${selectedCard.id}`}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                onClick={closeLightbox}
                className="absolute -top-12 right-0 sm:-top-4 sm:-right-12 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/50">
                {/* Image Area */}
                <div className="relative aspect-[16/10]">
                  {/* Before Half */}
                  <div className={`absolute inset-0 w-1/2 bg-gradient-to-br ${selectedCard.gradientBefore}`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <span
                        className="text-white/60 font-bold text-xl sm:text-2xl tracking-[0.3em] uppercase"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Before
                      </span>
                    </div>
                  </div>

                  {/* After Half */}
                  <div className={`absolute inset-0 left-1/2 w-1/2 bg-gradient-to-br ${selectedCard.gradientAfter}`}>
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <span
                        className="text-white font-bold text-xl sm:text-2xl tracking-[0.3em] uppercase"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        After
                      </span>
                    </div>
                  </div>

                  {/* Center Divider */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/50" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border-2 border-white/50 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white shadow-lg" />
                  </div>
                </div>

                {/* Details */}
                <div className="bg-slate-900/95 backdrop-blur-xl p-6 sm:p-8 border-t border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className="text-white font-bold text-xl sm:text-2xl mb-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {selectedCard.title}
                      </h3>
                      <p
                        className="text-slate-400 text-sm sm:text-base"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {selectedCard.description}
                      </p>
                    </div>
                    <span
                      className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                      style={{
                        background: `${selectedCard.accentColor}44`,
                        border: `1px solid ${selectedCard.accentColor}66`,
                        fontFamily: 'Manrope, sans-serif',
                      }}
                    >
                      {selectedCard.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BeforeAfter;
