import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Appointment', href: '#appointment' },
  { label: 'Contact', href: '#contact' },
];

const WHATSAPP_URL = 'https://wa.me/919036340518';

/* ─── Underline hover link ─── */
const NavLink = ({ label, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="relative group font-inter text-sm tracking-wide text-white/90 hover:text-white transition-colors duration-300"
  >
    {label}
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
  </a>
);

/* ─── Mobile link (drawer) ─── */
const MobileNavLink = ({ label, href, onClick, index }) => (
  <motion.a
    href={href}
    onClick={onClick}
    initial={{ x: 60, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 60, opacity: 0 }}
    transition={{ delay: 0.06 * index, type: 'spring', stiffness: 260, damping: 24 }}
    className="relative group block py-3 px-2 font-inter text-lg text-white/90 hover:text-white transition-colors border-b border-white/[0.06]"
  >
    {label}
    <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
  </motion.a>
);

/* ─── Pulsing WhatsApp button ─── */
const WhatsAppButton = ({ compact = false }) => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      relative inline-flex items-center gap-2 rounded-full font-manrope font-semibold
      bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25
      hover:shadow-green-500/40 hover:scale-105 active:scale-95
      transition-all duration-300 overflow-hidden
      ${compact ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-sm'}
    `}
  >
    {/* pulse ring */}
    <span className="absolute inset-0 rounded-full animate-ping bg-green-400/30 pointer-events-none" />
    <MessageCircle className="w-4 h-4 relative z-10 shrink-0" />
    <span className="relative z-10 whitespace-nowrap">WhatsApp</span>
  </a>
);

/* ─── Tooth logo icon (inline SVG for zero-dep logo) ─── */
const ToothIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 md:w-9 md:h-9 shrink-0"
  >
    <defs>
      <linearGradient id="toothGrad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    <path
      d="M32 4C24 4 20 8 18 12C16 16 14 18 10 18C6 18 4 22 4 26C4 32 8 34 10 38C12 42 14 52 18 58C20 60 22 60 24 56C26 50 28 42 30 42C31 42 31 42 32 42C33 42 33 42 34 42C36 42 38 50 40 56C42 60 44 60 46 58C50 52 52 42 54 38C56 34 60 32 60 26C60 22 58 18 54 18C50 18 48 16 46 12C44 8 40 4 32 4Z"
      fill="url(#toothGrad)"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M26 20C28 24 36 24 38 20"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

/* ═══════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── scroll listener ── */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── lock body scroll when mobile drawer open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── smooth scroll helper ── */
  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out
          ${scrolled
            ? 'bg-[#0f172a]/70 backdrop-blur-xl shadow-lg shadow-black/10 py-3'
            : 'bg-transparent py-5'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ── LOGO ── */}
          <a
            href="#home"
            onClick={(e) => scrollTo(e, '#home')}
            className="flex items-center gap-2.5 group"
          >
            <ToothIcon />
            <div className="flex flex-col leading-tight">
              <span className="font-poppins font-bold text-lg md:text-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Anand Dental Hub
              </span>
              <span className="text-[10px] md:text-xs font-inter text-white/50 tracking-widest uppercase">
                M.D.S
              </span>
            </div>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                label={link.label}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
              />
            ))}
          </div>

          {/* ── DESKTOP CTA AREA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919036340518"
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors font-inter"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span className="hidden xl:inline">+91 90363 40518</span>
            </a>
            <WhatsAppButton />
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden relative z-50 p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ═══ MOBILE DRAWER ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-40 h-full w-[80vw] max-w-sm
                         bg-[#0f172a]/90 backdrop-blur-2xl border-l border-white/[0.06]
                         flex flex-col lg:hidden"
            >
              {/* drawer header */}
              <div className="flex items-center gap-2.5 px-6 pt-6 pb-4 border-b border-white/[0.06]">
                <ToothIcon />
                <span className="font-poppins font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Anand Dental Hub
                </span>
              </div>

              {/* drawer links */}
              <nav className="flex-1 overflow-y-auto px-6 py-4">
                {NAV_LINKS.map((link, i) => (
                  <MobileNavLink
                    key={link.label}
                    label={link.label}
                    href={link.href}
                    index={i}
                    onClick={(e) => scrollTo(e, link.href)}
                  />
                ))}
              </nav>

              {/* drawer footer */}
              <div className="px-6 py-6 border-t border-white/[0.06] space-y-4">
                <a
                  href="tel:+919036340518"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-inter text-sm"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  +91 90363 40518
                </a>
                <WhatsAppButton compact />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
