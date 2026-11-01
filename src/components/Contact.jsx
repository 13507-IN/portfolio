import { motion as Motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Phone, Copy, Check, Send, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rishirajnatj@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/rishirajnatj@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'New message from your portfolio',
          _template: 'table',
        }),
      });

      const data = await response.json();
      if (data.success === 'true' || data.success === true) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'rishirajnatj@gmail.com',
      href: 'mailto:rishirajnatj@gmail.com',
      actionable: true,
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8240992946',
      href: 'tel:+918240992946',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Kolkata, West Bengal, India',
      href: null,
    },
  ];

  const spotlightRef = useRef(null);
  const lastMousePos = useRef({ x: null, y: null });

  const updateSpotlight = (clientX, clientY) => {
    if (!spotlightRef.current) return;
    const rect = spotlightRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    spotlightRef.current.style.setProperty('--spotlight-x', `${x}px`);
    spotlightRef.current.style.setProperty('--spotlight-y', `${y}px`);
    spotlightRef.current.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseMove = (e) => {
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    updateSpotlight(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    lastMousePos.current = { x: null, y: null };
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--spotlight-opacity', '0');
    }
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    const touch = e.touches[0];
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    updateSpotlight(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    lastMousePos.current = { x: null, y: null };
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--spotlight-opacity', '0');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (lastMousePos.current.x !== null && lastMousePos.current.y !== null) {
        updateSpotlight(lastMousePos.current.x, lastMousePos.current.y);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="section-shell relative overflow-hidden bg-background"
    >
      <div
        className="absolute top-6 left-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Base stroke outline */}
        <span className="bg-text bg-text--light block text-center">CONTACT</span>

        {/* Revealed full text on hover */}
        <div
          ref={spotlightRef}
          className="bg-text-spotlight-mask absolute inset-0"
        >
          <span className="bg-text bg-text--full block text-center">CONTACT</span>
        </div>
      </div>

      <div className="page-width relative z-10">
        <Motion.div
          className="section-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="section-kicker">Get in touch</p>
            <h2 className="section-heading text-foreground">Let&apos;s talk about your web team.</h2>
          </div>
          <p className="section-copy">
            I&apos;m open to web developer roles, internships, and product
            collaborations. Email me directly or send a note here.
          </p>
        </Motion.div>

        <div className="grid max-w-6xl overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] border border-border/80 bg-surface/85 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-md lg:grid-cols-[0.92fr_1.08fr]">
          {/* Left Info Panel */}
          <Motion.div
            className="bg-[linear-gradient(160deg,rgba(79,70,229,0.98),rgba(37,99,235,0.88))] p-6 sm:p-10 lg:p-12 text-primary-foreground flex flex-col justify-between"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                <Sparkles size={12} /> Open to Web Roles
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Frontend, full-stack, and product teams.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                I can contribute to responsive interfaces, practical APIs,
                and the product details that connect them.
              </p>
            </div>

            <div className="mt-8 space-y-3.5 sm:space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-[1.25rem] border border-white/15 bg-white/10 p-3.5 sm:p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 truncate">
                      <div className="rounded-xl sm:rounded-2xl bg-white/15 p-2.5 sm:p-3 shrink-0">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="truncate">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/60 font-semibold">
                          {item.title}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-0.5 block text-xs sm:text-sm md:text-base font-semibold text-white hover:underline truncate"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-xs sm:text-sm md:text-base font-semibold text-white truncate">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>

                    {item.actionable && (
                      <button
                        onClick={handleCopyEmail}
                        className="rounded-xl border border-white/20 bg-white/15 p-2 text-white hover:bg-white/25 transition-colors shrink-0 active:scale-95"
                        title="Copy email to clipboard"
                        aria-label="Copy email"
                      >
                        {copiedEmail ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Motion.div>

          {/* Right Form Panel */}
          <Motion.div
            className="bg-surface/95 p-6 sm:p-10 lg:p-12"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-muted-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Alex Smith"
                  className="input-minimal"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-muted-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="input-minimal"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-muted-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or idea..."
                  className="input-minimal resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-slide-fill w-full rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <Motion.div
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </Motion.div>
              )}

              {submitStatus === 'error' && (
                <Motion.div
                  role="alert"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-400 font-medium"
                >
                  The form could not send your message. Please{' '}
                  <a className="underline" href="mailto:rishirajnatj@gmail.com">
                    email me directly
                  </a>.
                </Motion.div>
              )}
            </form>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
