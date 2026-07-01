import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: 'What services does Anand Dental Hub offer?',
    answer:
      'We offer a comprehensive range of dental services including teeth whitening, dental implants, root canal treatment, orthodontic braces & aligners, cosmetic dentistry, laser dentistry, pediatric dentistry, gum treatments, dental crowns & bridges, full & partial dentures, wisdom tooth extraction, emergency dental care, and preventive check-ups. Our clinic is equipped with state-of-the-art technology to deliver the best results.',
  },
  {
    question: 'Is the treatment painful?',
    answer:
      'Modern dentistry has advanced significantly, and most procedures at Anand Dental Hub are virtually pain-free. We use advanced local anesthesia, laser technology, and gentle techniques to ensure maximum comfort. Our team is trained in anxiety-free dentistry and we always prioritize your comfort throughout every procedure.',
  },
  {
    question: 'What are your clinic hours?',
    answer:
      'Anand Dental Hub is open Tuesday through Monday, from 10:00 AM to 7:00 PM. We recommend booking an appointment in advance to minimize waiting time. For dental emergencies, please call us directly and we will accommodate you as soon as possible.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'Booking an appointment is easy! You can call us directly at +91 9036340518, send us a WhatsApp message for quick scheduling, or fill out the online appointment form on our website. Our friendly staff will confirm your appointment and send you a reminder before your visit.',
  },
  {
    question: 'Do you offer emergency dental services?',
    answer:
      'Yes, we provide emergency dental services for urgent situations such as severe toothache, broken or knocked-out teeth, dental abscesses, and other critical conditions. If you experience a dental emergency, call us immediately at +91 9036340518 and we will prioritize your treatment.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept a wide range of payment methods for your convenience including cash, Google Pay (GPay), NFC contactless payments, all major credit and debit cards (Visa, MasterCard, RuPay), UPI transfers, and net banking. We also offer flexible EMI options for extensive treatments.',
  },
  {
    question: 'Is parking available at the clinic?',
    answer:
      'Yes, convenient parking is available near our clinic. We have designated parking spots for patients and the surrounding area offers ample two-wheeler and four-wheeler parking. Our clinic is also easily accessible by public transportation.',
  },
  {
    question: 'How long does a dental implant procedure take?',
    answer:
      'The dental implant procedure itself typically takes about 1 to 2 hours per implant. However, the complete process includes a healing period of 3 to 6 months for the implant to fuse with the jawbone (osseointegration). After healing, the final crown is placed in a follow-up visit. Dr. Anand will create a personalized treatment plan and timeline during your consultation.',
  },
  {
    question: 'Do you treat children?',
    answer:
      'Absolutely! We have a dedicated pediatric dentistry program designed to make dental visits fun and stress-free for children. Our services for kids include routine check-ups, fluoride treatments, dental sealants, cavity fillings, and early orthodontic assessments. We create a warm, welcoming environment so children develop a positive attitude towards dental care.',
  },
  {
    question: 'What safety measures do you follow?',
    answer:
      'Patient safety is our top priority. We follow stringent sterilization and hygiene protocols including autoclave sterilization of all instruments, use of disposable gloves and masks, regular surface disinfection, HEPA air filtration, and compliance with all guidelines set by the Dental Council of India. Our clinic undergoes regular hygiene audits to maintain the highest standards of cleanliness.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      variants={itemVariants}
      className="mb-4"
    >
      <div
        className={`
          relative rounded-xl overflow-hidden transition-colors duration-300
          bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]
          hover:bg-white/[0.07]
          ${isOpen ? 'bg-white/[0.07] border-sky-500/20' : ''}
        `}
      >
        {/* Question Button */}
        <button
          onClick={() => onToggle(index)}
          className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-sky-500/20 to-blue-600/20 text-sky-400 text-sm font-semibold font-[Manrope]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[15px] sm:text-base font-medium text-white/90 font-[Poppins] leading-snug group-hover:text-white transition-colors">
              {item.question}
            </span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="flex-shrink-0 text-sky-400"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.span>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <div className="pl-11 sm:pl-[52px] border-l-2 border-sky-500/20 ml-[2px]">
                  <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed font-[Inter]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-medium text-sky-400 tracking-wide uppercase font-[Manrope]">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[Poppins] mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto font-[Inter]">
            Find answers to common questions about our dental services, treatments, and clinic policies.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </motion.div>

        {/* CTA below FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-white/40 text-sm font-[Inter] mb-4">
            Still have questions?
          </p>
          <a
            href="https://wa.me/919036340518"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold font-[Manrope] shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.03] transition-all duration-300"
          >
            Chat with us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
