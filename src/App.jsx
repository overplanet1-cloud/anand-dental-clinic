import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlignCenter,
  Award,
  Baby,
  Bot,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleDot,
  Clock,
  CreditCard,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  UserRound,
  Users,
  X,
  Zap,
} from 'lucide-react';
import DarkVeil from './components/DarkVeil/DarkVeil';

const PHONE = '+91 9036340518';
const PHONE_LINK = 'tel:+919036340518';
const WHATSAPP_BASE = 'https://wa.me/919036340518';
const ADDRESS =
  'Near Carmel School Road, Alkapuri Chowk, Shree Krishna Nagar, Forest Colony, Giridih, Jharkhand 815301';

const image = {
  doctor:
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1100&q=80',
  clinic:
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80',
  treatment:
    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80',
  xray:
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
};

const navLinks = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Gallery', '#gallery'],
  ['Reviews', '#reviews'],
  ['Appointment', '#appointment'],
  ['Contact', '#contact'],
];

const services = [
  {
    icon: Sparkles,
    title: 'Teeth Whitening',
    text: 'Chairside whitening protocols for visibly brighter teeth in fewer visits.',
  },
  {
    icon: Smile,
    title: 'Smile Designing',
    text: 'Digital planning, veneers, bonding, and cosmetic contouring for balanced smiles.',
  },
  {
    icon: CircleDot,
    title: 'Dental Implants',
    text: 'Single tooth and full mouth implant rehabilitation with precise planning.',
  },
  {
    icon: Zap,
    title: 'Laser Dentistry',
    text: 'Soft tissue care, gum treatments, and faster recovery with laser precision.',
  },
  {
    icon: Baby,
    title: 'Kids Dentistry',
    text: 'Gentle pediatric visits that help children feel calm and confident.',
  },
  {
    icon: Activity,
    title: 'Root Canal',
    text: 'Microscope-assisted root canal care focused on comfort and tooth preservation.',
  },
  {
    icon: AlignCenter,
    title: 'Braces & Aligners',
    text: 'Orthodontic correction with braces, clear aligners, and guided follow-ups.',
  },
  {
    icon: HeartPulse,
    title: 'Emergency Dental Care',
    text: 'Priority care for severe toothache, swelling, broken teeth, and urgent concerns.',
  },
];

const whyItems = [
  ['Experienced Dentist', 'M.D.S led treatment planning and careful clinical decision-making.'],
  ['Advanced Equipment', 'Digital X-ray, modern chairs, sterilization, and precision instruments.'],
  ['Painless Treatment', 'Comfort-first care with gentle techniques and clear communication.'],
  ['Sterilized Instruments', 'Strict disinfection workflow before every appointment.'],
  ['Affordable Pricing', 'Transparent estimates and practical treatment options.'],
  ['Friendly Staff', 'A calm team that explains every step before treatment begins.'],
];

const transformations = [
  ['Implants', 'Full Mouth Implants', 'Restored bite support and confident chewing.'],
  ['Braces', 'Orthodontic Alignment', 'Crowding correction with a planned timeline.'],
  ['Whitening', 'Laser Whitening', 'A brighter smile after professional whitening.'],
  ['Smile Design', 'Veneers & Contouring', 'Balanced shape, shade, and smile symmetry.'],
  ['Root Canal', 'Painless RCT', 'Infection control with tooth preservation.'],
  ['Implants', 'Single Tooth Implant', 'A natural-looking fixed tooth replacement.'],
];

const reviews = [
  ['Rohit', 'Amazing doctor and very clean clinic. My implant consultation was explained with complete clarity.'],
  ['Neha', 'Pain free treatment and very professional staff. I felt relaxed throughout my root canal.'],
  ['Amit', 'Best dental clinic in Giridih. Modern equipment, honest advice, and excellent follow-up.'],
  ['Priya', 'My whitening results were beautiful. The team explained care instructions very nicely.'],
  ['Sanjay', 'Clean clinic, friendly team, and transparent pricing. Highly recommended for families.'],
  ['Kavita', 'My braces journey was smooth. Appointments were on time and the result looks great.'],
];

const faq = [
  [
    'What are the clinic timings?',
    'Anand Dental Hub is open Tuesday through Monday, 10:00 AM to 7:00 PM. Appointment booking is recommended.',
  ],
  [
    'How can I book an appointment?',
    'You can call, WhatsApp, or submit the appointment form on this website. The form prepares a WhatsApp booking message for quick confirmation.',
  ],
  [
    'Is root canal treatment painful?',
    'Modern root canal treatment is designed to be comfortable. The clinic uses local anesthesia, careful isolation, and gentle techniques.',
  ],
  [
    'Do you treat children?',
    'Yes. Pediatric dental visits are handled with a calm, friendly approach for check-ups, fillings, preventive care, and habit guidance.',
  ],
  [
    'What payment options are available?',
    'Cash, UPI, Google Pay, card payments, and NFC/contactless payments are accepted.',
  ],
  [
    'Do you provide emergency dental care?',
    'Yes. For severe pain, swelling, broken teeth, or injury, call the clinic directly so the team can prioritize your visit.',
  ],
];

const gallery = [
  ['Digital Treatment Room', image.clinic],
  ['Precision Dentistry', image.treatment],
  ['X-Ray Planning', image.xray],
];

function whatsappUrl(message = 'Hello Anand Dental Hub, I want to book an appointment.') {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

function scrollToId(event, href) {
  event.preventDefault();
  const target = document.querySelector(href);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionHeader({ eyebrow, title, text, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 font-manrope text-xs font-bold uppercase tracking-[0.22em] text-cyan-400">
        {eyebrow}
      </p>
      <h2
        className={`font-poppins text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-slate-950'
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-base leading-7 sm:text-lg ${light ? 'text-slate-300' : 'text-slate-600'}`}>
          {text}
        </p>
      )}
    </motion.div>
  );
}

function Stars({ size = 16 }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={size} className="fill-amber-400 text-amber-400" />
      ))}
    </span>
  );
}

function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[linear-gradient(135deg,#e0f2fe,#ffffff,#d1fae5)] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="grid h-20 w-20 place-items-center rounded-lg border border-sky-200 bg-white/80 text-sky-600 shadow-sm">
          <Sparkles size={34} />
        </div>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} loading="lazy" />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/10 bg-slate-950/75 py-3 shadow-lg backdrop-blur-xl' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" onClick={(e) => scrollToId(e, '#home')} className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-sky-600 shadow-lg shadow-sky-900/20">
              <Sparkles size={20} />
            </span>
            <span className="leading-tight">
              <span className="block font-poppins text-lg font-bold text-white">Anand Dental Hub</span>
              <span className="block font-manrope text-[11px] uppercase tracking-[0.2em] text-cyan-200">M.D.S</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={(e) => scrollToId(e, href)}
                className="group relative font-manrope text-sm font-semibold text-white/80 transition hover:text-white"
              >
                {label}
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-cyan-300 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={PHONE_LINK} className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
              <Phone size={16} className="text-cyan-300" />
              {PHONE}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/20 bg-white/10 text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-slate-950/70" onClick={() => setOpen(false)} aria-label="Close menu" />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute right-0 top-0 h-full w-[82vw] max-w-sm border-l border-white/10 bg-slate-950 p-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="font-poppins text-lg font-bold text-white">Anand Dental Hub</p>
                <button className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <div className="grid gap-2">
                {navLinks.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => {
                      scrollToId(e, href);
                      setOpen(false);
                    }}
                    className="rounded-lg px-3 py-3 font-manrope text-lg font-semibold text-white/80 hover:bg-white/10"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-bold text-white"
              >
                <MessageCircle size={18} />
                WhatsApp Now
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-slate-950 pt-24 text-white">
      <div className="absolute inset-0">
        <DarkVeil speed={0.28} hueShift={204} noiseIntensity={0.035} scanlineIntensity={0.08} scanlineFrequency={0.8} warpAmount={0.35} />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92),rgba(15,23,42,0.62),rgba(14,165,233,0.18))]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-md">
              <Sparkles size={15} className="text-cyan-300" />
              Anand Dental Hub (M.D.S)
            </div>
            <h1 className="max-w-3xl font-poppins text-5xl font-bold leading-[1.04] sm:text-6xl lg:text-7xl">
              Your Smile, <span className="text-cyan-300">Our Passion.</span>
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                <Stars />
                <span className="font-manrope text-sm font-bold">4.9 Rating</span>
                <span className="text-white/40">|</span>
                <span className="text-sm text-white/75">535+ Google Reviews</span>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {['Modern Dentistry', 'Pain Free Treatment', 'Experienced Specialists'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur">
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#appointment"
                onClick={(e) => scrollToId(e, '#appointment')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-4 font-manrope font-extrabold text-slate-950 shadow-xl shadow-cyan-950/25 transition hover:bg-cyan-300"
              >
                <CalendarDays size={19} />
                Book Appointment
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 font-manrope font-extrabold text-white backdrop-blur transition hover:bg-white/20"
              >
                <MessageCircle size={19} />
                WhatsApp Now
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.15 }} className="relative">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-lg border border-white/20 bg-white/10 p-3 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
              <ImageWithFallback src={image.doctor} alt="Dental specialist in a clinic" className="aspect-[4/5] w-full rounded-md object-cover" />
              <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/20 bg-slate-950/75 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-400 text-slate-950">
                    <Stethoscope size={22} />
                  </span>
                  <div>
                    <p className="font-poppins font-bold text-white">Dr. Anand</p>
                    <p className="text-sm text-slate-300">M.D.S Dental Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustStats() {
  const stats = [
    ['4.9', 'Google Rating', Star],
    ['535+', 'Google Reviews', MessageCircle],
    ['10+', 'Years Experience', Award],
    ['5000+', 'Happy Patients', Users],
    ['100%', 'Hygiene Focus', ShieldCheck],
  ];

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(([value, label, Icon], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100"
          >
            <Icon className="mb-4 text-cyan-500" size={24} />
            <p className="font-poppins text-3xl font-bold text-slate-950">{value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f0f9ff)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <ImageWithFallback src={image.clinic} alt="Modern dental clinic treatment room" className="aspect-[4/3] w-full rounded-lg object-cover shadow-2xl shadow-sky-200/50" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="mb-3 font-manrope text-xs font-bold uppercase tracking-[0.22em] text-cyan-600">About Clinic</p>
          <h2 className="font-poppins text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Premium dental care in Giridih with a calm, modern experience.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
            <p>
              Anand Dental Hub (M.D.S) brings specialist-led dentistry, modern equipment, strict hygiene, and patient-first communication together in one trusted clinic.
            </p>
            <p>
              From preventive check-ups to implants, orthodontics, whitening, and emergency care, every treatment plan is explained clearly so patients can choose with confidence.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['Digital X-Ray', 'Fast diagnosis'],
              ['Sterile Care', 'Every visit'],
              ['Comfort Focus', 'Gentle process'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm">
                <CheckCircle2 className="mb-3 text-emerald-500" size={22} />
                <p className="font-poppins font-bold text-slate-950">{title}</p>
                <p className="mt-1 text-sm text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MeetDoctor() {
  const bullets = [
    'M.D.S led diagnosis and treatment planning',
    'Focused on painless, precise dental procedures',
    'Implants, oral surgery, cosmetic care, and root canal expertise',
    'Clear explanation of options, costs, and timelines',
  ];

  return (
    <section id="doctor" className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/10 p-3 shadow-2xl">
            <ImageWithFallback src={image.doctor} alt="Dr. Anand dental specialist" className="aspect-[4/5] w-full rounded-md object-cover" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="mb-3 font-manrope text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Meet The Doctor</p>
          <h2 className="font-poppins text-3xl font-bold leading-tight sm:text-5xl">Dr. Anand, M.D.S</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            A specialist dentist combining clinical precision with a gentle chairside manner, helping patients feel informed before treatment starts.
          </p>
          <div className="mt-8 grid gap-3">
            {bullets.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/10 p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={20} />
                <span className="text-slate-200">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {['Implantology', 'Cosmetic Dentistry', 'Root Canal', 'Oral Surgery'].map((item) => (
              <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Services"
        title="Complete care for every smile"
        text="From routine prevention to advanced restorations, Anand Dental Hub offers practical treatment paths for adults, children, and families."
      />
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, text }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-sky-100"
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-sky-50 text-sky-600 transition group-hover:bg-cyan-400 group-hover:text-slate-950">
              <Icon size={24} />
            </div>
            <h3 className="font-poppins text-lg font-bold text-slate-950">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-[linear-gradient(180deg,#f8fafc,#ecfeff)] px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Why Choose Us" title="Care designed around safety, comfort, and trust" />
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {whyItems.map(([title, text], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: index % 2 ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={21} />
            </span>
            <div>
              <h3 className="font-poppins font-bold text-slate-950">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BeforeAfterGallery() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);
  const categories = ['All', 'Implants', 'Braces', 'Whitening', 'Smile Design', 'Root Canal'];
  const filtered = active === 'All' ? transformations : transformations.filter(([category]) => category === active);

  return (
    <section id="gallery" className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Smile Transformations"
        title="Before and after gallery"
        text="Representative transformation cards for common dental journeys."
        light
      />
      <div className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setActive(category)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              active === category ? 'bg-cyan-300 text-slate-950' : 'border border-white/10 bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <motion.div layout className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map(([category, title, text], index) => (
            <motion.button
              layout
              key={`${category}-${title}`}
              type="button"
              onClick={() => setSelected([category, title, text])}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="overflow-hidden rounded-lg border border-white/10 bg-white/10 text-left shadow-xl transition hover:-translate-y-1 hover:border-cyan-300/40"
            >
              <div className="grid aspect-[16/10] grid-cols-2">
                <div className="flex items-center justify-center bg-[linear-gradient(135deg,#475569,#94a3b8)]">
                  <span className="font-manrope text-xs font-bold uppercase tracking-[0.22em] text-white/80">Before</span>
                </div>
                <div className="flex items-center justify-center bg-[linear-gradient(135deg,#06b6d4,#2563eb)]">
                  <span className="font-manrope text-xs font-bold uppercase tracking-[0.22em] text-white">After</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{category}</p>
                <h3 className="mt-2 font-poppins text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/90 p-4 backdrop-blur-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div
              initial={{ y: 28, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 28, scale: 0.96 }}
              className="w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{selected[0]}</p>
                  <h3 className="font-poppins text-xl font-bold text-white">{selected[1]}</h3>
                </div>
                <button className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white" onClick={() => setSelected(null)} aria-label="Close preview">
                  <X size={20} />
                </button>
              </div>
              <div className="grid aspect-[16/8] grid-cols-2">
                <div className="flex items-center justify-center bg-[linear-gradient(135deg,#475569,#94a3b8)]">
                  <span className="font-manrope text-sm font-bold uppercase tracking-[0.22em] text-white/80">Before</span>
                </div>
                <div className="flex items-center justify-center bg-[linear-gradient(135deg,#06b6d4,#2563eb)]">
                  <span className="font-manrope text-sm font-bold uppercase tracking-[0.22em] text-white">After</span>
                </div>
              </div>
              <p className="p-5 text-slate-300">{selected[2]}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ClinicGallery() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Clinic Tour" title="Modern equipment. Calm interiors. Clear care." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {gallery.map(([title, src], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <ImageWithFallback src={src} alt={title} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="flex items-center gap-3 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-sky-50 text-sky-600">
                <Camera size={20} />
              </span>
              <div>
                <h3 className="font-poppins font-bold text-slate-950">{title}</h3>
                <p className="text-sm text-slate-500">Patient-ready facility</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const [paused, setPaused] = useState(false);
  const list = useMemo(() => [...reviews, ...reviews], []);

  return (
    <section id="reviews" className="overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Google Reviews" title="Loved by patients across Giridih" text="A premium clinic experience backed by hundreds of patient reviews." light />
      <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between gap-4">
        <div className="rounded-lg border border-white/10 bg-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="font-poppins text-4xl font-bold">4.9</span>
            <span>
              <Stars size={18} />
              <span className="block text-sm text-slate-300">535+ Google Reviews</span>
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-cyan-200 transition hover:bg-white/20"
          aria-label={paused ? 'Play reviews' : 'Pause reviews'}
        >
          {paused ? <Play size={19} /> : <Pause size={19} />}
        </button>
      </div>
      <div className="relative mx-auto max-w-7xl overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent" />
        <div
          className="reviews-track flex gap-4 py-2"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {list.map(([name, text], index) => (
            <article key={`${name}-${index}`} className="min-w-[300px] rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
              <Stars size={14} />
              <p className="mt-4 text-sm leading-6 text-slate-300">"{text}"</p>
              <p className="mt-5 font-poppins font-bold text-white">- {name}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white" aria-label="Previous reviews">
          <ChevronLeft size={19} />
        </button>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white" aria-label="Next reviews">
          <ChevronRight size={19} />
        </button>
      </div>
    </section>
  );
}

function VideoTestimonials() {
  const stories = [
    ['Smile Makeover', 'A confident new smile after cosmetic planning.', '3:42'],
    ['Pain Free Root Canal', 'Comfort-first care from diagnosis to recovery.', '2:58'],
    ['Dental Implant Journey', 'Fixed replacement and clear follow-up plan.', '4:15'],
  ];

  return (
    <section className="bg-[linear-gradient(180deg,#f8fafc,#ffffff)] px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Video Testimonials" title="Patient stories that build confidence" />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {stories.map(([title, text, duration], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative grid aspect-video place-items-center bg-[linear-gradient(135deg,#0f172a,#0ea5e9,#10b981)]">
              <span className="absolute right-3 top-3 rounded bg-slate-950/70 px-2 py-1 text-xs font-bold text-white">{duration}</span>
              <button className="grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur" aria-label={`Play ${title}`}>
                <Play className="ml-1 fill-white" size={27} />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-poppins text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Appointment() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    treatment: 'Dental Check-up',
    date: '',
    time: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const message = [
      'Hello Anand Dental Hub, I want to book an appointment.',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : '',
      form.age ? `Age: ${form.age}` : '',
      `Treatment: ${form.treatment}`,
      form.date ? `Preferred Date: ${form.date}` : '',
      form.time ? `Preferred Time: ${form.time}` : '',
      form.message ? `Message: ${form.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    setSubmitted(true);
    window.open(whatsappUrl(message), '_blank', 'noopener');
  };

  return (
    <section id="appointment" className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-3 font-manrope text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Appointment Booking</p>
          <h2 className="font-poppins text-3xl font-bold leading-tight sm:text-5xl">Book your visit in under a minute.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Share your details and the form will prepare a WhatsApp booking message for quick confirmation by the clinic team.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              [Clock, 'Open 10:00 AM - 7:00 PM'],
              [MapPin, 'Near Carmel School Road, Giridih'],
              [CreditCard, 'GPay, UPI, cards, NFC accepted'],
            ].map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-4">
                <Icon className="text-cyan-300" size={22} />
                <span className="text-slate-200">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-4 rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur md:grid-cols-2">
          {[
            ['name', 'Name', 'text', true],
            ['phone', 'Phone', 'tel', true],
            ['email', 'Email', 'email', false],
            ['age', 'Age', 'number', false],
          ].map(([name, label, type, required]) => (
            <label key={name} className="grid gap-2 text-sm font-semibold text-slate-200">
              {label}
              <input
                name={name}
                type={type}
                required={required}
                value={form[name]}
                onChange={update}
                className="h-12 rounded-lg border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300"
              />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-semibold text-slate-200 md:col-span-2">
            Treatment
            <select name="treatment" value={form.treatment} onChange={update} className="h-12 rounded-lg border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300">
              {['Dental Check-up', 'Teeth Whitening', 'Dental Implants', 'Root Canal', 'Braces & Aligners', 'Kids Dentistry', 'Emergency Care'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-200">
            Preferred Date
            <input name="date" type="date" value={form.date} onChange={update} className="h-12 rounded-lg border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-200">
            Preferred Time
            <input name="time" type="time" value={form.time} onChange={update} className="h-12 rounded-lg border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-200 md:col-span-2">
            Message
            <textarea name="message" rows="4" value={form.message} onChange={update} className="rounded-lg border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300" />
          </label>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-manrope font-extrabold text-slate-950 transition hover:bg-cyan-200 md:col-span-2">
            <CalendarDays size={19} />
            Book Appointment
          </button>
          {submitted && <p className="text-center text-sm font-semibold text-emerald-300 md:col-span-2">Booking message opened in WhatsApp.</p>}
        </form>
      </div>
    </section>
  );
}

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    ['bot', 'Hello. How may I help you today?'],
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    ['Book Appointment', 'I want to book an appointment.'],
    ['Clinic Timing', 'What are your clinic timings?'],
    ['Location', 'Please share the clinic location.'],
    ['Services', 'What dental services are available?'],
    ['Price Inquiry', 'I want to ask about treatment pricing.'],
    ['Emergency', 'I have a dental emergency.'],
    ['Talk to Human', 'Please connect me with the clinic team.'],
  ];

  const reply = (text) => {
    let response = 'I can help with appointments, timings, services, location, price inquiries, and emergencies.';
    if (/time|timing|hour/i.test(text)) response = 'The clinic is open Tuesday through Monday, 10:00 AM to 7:00 PM.';
    if (/location|address|map/i.test(text)) response = ADDRESS;
    if (/service|treatment/i.test(text)) response = 'Services include whitening, smile design, implants, laser dentistry, kids dentistry, root canal, braces, aligners, and emergency care.';
    if (/price|cost|fee/i.test(text)) response = 'Pricing depends on diagnosis. Share the treatment you need and the team will guide you on WhatsApp.';
    if (/emergency|pain|swelling/i.test(text)) response = 'For severe pain, swelling, injury, or bleeding, call the clinic directly so the team can prioritize you.';
    if (/book|appointment|human|connect/i.test(text)) response = 'Please share your name, phone number, treatment, preferred date, and preferred time.';

    setMessages((current) => [...current, ['user', text], ['bot', response]]);
  };

  const send = (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    reply(input.trim());
    setInput('');
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            className="mb-4 w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
          >
            <div className="flex items-center justify-between bg-slate-950 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-cyan-300" />
                <span className="font-poppins font-bold">AI Dental Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-80 space-y-3 overflow-y-auto p-4">
              {messages.map(([who, text], index) => (
                <div key={`${who}-${index}`} className={`flex ${who === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[82%] rounded-lg px-3 py-2 text-sm leading-6 ${who === 'user' ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    {text}
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {quickReplies.map(([label, text]) => (
                  <button key={label} onClick={() => reply(text)} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-cyan-300 hover:text-cyan-700">
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-slate-200 p-3">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type your question" className="h-11 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-cyan-400" />
              <button className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white" aria-label="Send message">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((value) => !value)}
        className="ml-auto grid h-14 w-14 place-items-center rounded-full bg-slate-950 text-cyan-200 shadow-xl shadow-slate-950/25 ring-4 ring-cyan-200/30"
        aria-label="Open AI dental assistant"
      >
        <Bot size={25} />
      </button>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="FAQ" title="Answers before your visit" />
      <div className="mx-auto max-w-3xl">
        {faq.map(([question, answer], index) => (
          <div key={question} className="mb-3 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
              <span className="font-poppins font-bold text-slate-950">{question}</span>
              <ChevronDown className={`shrink-0 text-cyan-600 transition ${open === index ? 'rotate-180' : ''}`} size={20} />
            </button>
            <AnimatePresence initial={false}>
              {open === index && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="px-5 pb-5 leading-7 text-slate-600">{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-[linear-gradient(180deg,#ecfeff,#ffffff)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 font-manrope text-xs font-bold uppercase tracking-[0.22em] text-cyan-600">Location & Contact</p>
          <h2 className="font-poppins text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">Visit Anand Dental Hub</h2>
          <div className="mt-8 grid gap-4">
            {[
              [Phone, PHONE],
              [MessageCircle, 'WhatsApp booking available'],
              [MapPin, ADDRESS],
              [Clock, 'Tuesday - Monday, 10:00 AM - 7:00 PM'],
              [Mail, 'Appointments by call, WhatsApp, or form'],
            ].map(([Icon, text]) => (
              <div key={text} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-sky-50 text-sky-600">
                  <Icon size={21} />
                </span>
                <p className="leading-7 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={PHONE_LINK} className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-bold text-white">
              <Phone size={18} />
              Call Clinic
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-bold text-white">
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <iframe
            title="Anand Dental Hub Google Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
            className="h-[520px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const quick = ['Home', 'About', 'Services', 'Gallery', 'Reviews', 'Appointment', 'Contact'];
  return (
    <footer className="bg-slate-950 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-300 text-slate-950">
              <Sparkles size={22} />
            </span>
            <div>
              <p className="font-poppins text-xl font-bold">Anand Dental Hub (M.D.S)</p>
              <p className="text-sm text-slate-400">Premium dental care in Giridih, Jharkhand</p>
            </div>
          </div>
          <p className="mt-5 max-w-xl leading-7 text-slate-400">{ADDRESS}</p>
          <div className="mt-5 flex items-center gap-2">
            <Stars size={15} />
            <span className="text-sm text-slate-300">4.9 rating from 535+ Google reviews</span>
          </div>
        </div>
        <div>
          <h3 className="font-poppins font-bold">Quick Links</h3>
          <div className="mt-4 grid gap-2">
            {quick.map((label) => (
              <a key={label} href={`#${label.toLowerCase() === 'home' ? 'home' : label.toLowerCase()}`} className="text-sm text-slate-400 hover:text-cyan-200">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-poppins font-bold">Services</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <span>Dental Implants</span>
            <span>Root Canal</span>
            <span>Braces & Aligners</span>
            <span>Teeth Whitening</span>
            <span>Kids Dentistry</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 Anand Dental Hub. All rights reserved.</p>
        <p>Open Tuesday - Monday, 10:00 AM - 7:00 PM</p>
      </div>
    </footer>
  );
}

function FloatingActions() {
  const [top, setTop] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {top && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-slate-950/80 text-white shadow-lg backdrop-blur"
          aria-label="Back to top"
        >
          <ChevronUp size={19} />
        </button>
      )}
      <a href={PHONE_LINK} className="grid h-12 w-12 place-items-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-950/20" aria-label="Emergency call">
        <Phone size={21} />
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-950/25 ring-4 ring-emerald-200/40" aria-label="WhatsApp">
        <MessageCircle size={25} />
      </a>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-inter text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <About />
        <MeetDoctor />
        <Services />
        <WhyChooseUs />
        <BeforeAfterGallery />
        <ClinicGallery />
        <Reviews />
        <VideoTestimonials />
        <Appointment />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <AIAssistant />
    </div>
  );
}
