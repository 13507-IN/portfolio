import { motion as Motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Phone, Copy, Check, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

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

  return (
    <section id="contact" ref={ref} className="section-shell relative overflow-hidden bg-background">
      <div className="absolute top-6 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="bg-text bg-text--light block text-center">CONTACT</span>
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
            <h2 className="section-heading text-foreground">Let&apos;s build something meaningful.</h2>
          </div>
          <p className="section-copy">
            Whether you have a project idea, collaboration, or just want to say
            hello, I&apos;m always open to connect.
          </p>
        </Motion.div>

        <div className="grid max-w-6xl overflow-hidden rounded-[2.25rem] border border-border/80 bg-surface/85 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-md lg:grid-cols-[0.92fr_1.08fr]">
          {/* Left Info Panel */}
          <Motion.div
            className="bg-[linear-gradient(160deg,rgba(79,70,229,0.98),rgba(37,99,235,0.88))] p-8 text-primary-foreground sm:p-10 lg:p-12 flex flex-col justify-between"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                <Sparkles size={12} /> Open to Collaborate
              </span>
              <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Freelance, project ideas, and engineering roles.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                If you value clean code, functional UX, and high attention to detail,
                let&apos;s build something together.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-2xl bg-white/15 p-3">
                        <Icon size={19} className="text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/60 font-semibold">
                          {item.title}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-0.5 block text-sm font-semibold text-white hover:underline sm:text-base"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm font-semibold text-white sm:text-base">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>

                    {item.actionable && (
                      <button
                        onClick={handleCopyEmail}
                        className="rounded-xl border border-white/20 bg-white/15 p-2 text-white hover:bg-white/25 transition-colors"
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
            className="bg-surface/95 p-8 sm:p-10 lg:p-12"
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </Motion.div>
              )}

              {submitStatus === 'error' && (
                <Motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-400 font-medium"
                >
                  Failed to send message. Please try again or email me directly at rishirajnatj@gmail.com.
                </Motion.div>
              )}
            </form>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
