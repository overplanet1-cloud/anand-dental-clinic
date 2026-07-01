import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronUp } from 'lucide-react';

/* ─────────────────────────────────────────────
   Floating CTA  –  WhatsApp · Emergency · Top
   ───────────────────────────────────────────── */

const WHATSAPP_URL =
  'https://wa.me/919036340518?text=Hello%20Anand%20Dental%20Hub%2C%20I%20want%20to%20book%20an%20appointment.';
const PHONE_URL = 'tel:+919036340518';
const SCROLL_THRESHOLD = 500;

/* ── tiny tooltip wrapper ── */
const Tooltip = ({ label, children, side = 'left' }) => (
  <div className="group relative inline-flex items-center justify-center">
    {children}
    <span
      className={`pointer-events-none absolute whitespace-nowrap rounded-lg bg-slate-900/90
        px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm
        opacity-0 transition-all duration-200
        group-hover:opacity-100 group-hover:translate-x-0
        ${side === 'left' ? 'right-full mr-3 translate-x-2' : 'left-full ml-3 -translate-x-2'}`}
    >
      {label}
      {/* arrow */}
      <span
        className={`absolute top-1/2 -translate-y-1/2 border-[5px] border-transparent
          ${side === 'left'
            ? 'left-full border-l-slate-900/90'
            : 'right-full border-r-slate-900/90'
          }`}
      />
    </span>
  </div>
);

/* ── WhatsApp inline SVG icon ── */
const WhatsAppIcon = ({ size = 28 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="white"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ── shared spring config ── */
const springTransition = { type: 'spring', stiffness: 260, damping: 20 };

/* ── entrance variants (slide in from right) ── */
const slideIn = (delay = 0) => ({
  hidden: { opacity: 0, x: 80, scale: 0.6 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { ...springTransition, delay },
  },
});

/* ── fade for scroll-to-top ── */
const fadeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.6,
    transition: { duration: 0.2 },
  },
};

const FloatingCTA = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* ── track scroll position ── */
  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialise on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── actions ── */
  const openWhatsApp = () => window.open(WHATSAPP_URL, '_blank', 'noopener');
  const callEmergency = () => window.open(PHONE_URL, '_self');
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div
      className="fixed right-6 bottom-6 z-50 flex flex-col-reverse items-center gap-4"
      aria-label="Quick actions"
    >
      {/* ─── 1. WhatsApp (bottom-most) ─── */}
      <motion.div
        variants={slideIn(0.3)}
        initial="hidden"
        animate="visible"
      >
        <Tooltip label="Chat on WhatsApp">
          <button
            onClick={openWhatsApp}
            aria-label="Chat on WhatsApp"
            className="relative flex h-14 w-14 items-center justify-center rounded-full
              bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-lg shadow-green-500/30
              transition-transform duration-200 hover:scale-110 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
          >
            {/* pulse glow ring */}
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E]
                animate-ping opacity-30"
            />
            <WhatsAppIcon size={28} />
          </button>
        </Tooltip>
      </motion.div>

      {/* ─── 2. Emergency Call ─── */}
      <motion.div
        variants={slideIn(0.5)}
        initial="hidden"
        animate="visible"
      >
        <Tooltip label="Emergency Call">
          <button
            onClick={callEmergency}
            aria-label="Emergency Call"
            className="relative flex h-12 w-12 items-center justify-center rounded-full
              bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30
              transition-transform duration-200 hover:scale-110 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
          >
            {/* subtle pulse */}
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-rose-600
                animate-pulse opacity-20"
            />
            <Phone className="h-5 w-5 text-white" strokeWidth={2.2} />
          </button>
        </Tooltip>
      </motion.div>

      {/* ─── 3. Scroll to Top (conditional) ─── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            key="scroll-top"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Tooltip label="Back to Top">
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="flex h-11 w-11 items-center justify-center rounded-full
                  border border-white/20 bg-white/10 shadow-lg backdrop-blur-md
                  transition-transform duration-200 hover:scale-110 hover:bg-white/20
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-sky-400 focus-visible:ring-offset-2"
              >
                <ChevronUp className="h-5 w-5 text-white" strokeWidth={2.5} />
              </button>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingCTA;
