import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/rishirajnatj@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'New message from your portfolio',
          _template: 'table'
        })
      });

      const data = await response.json();
      if (data.success === 'true' || data.success === true) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "rishirajnatj@gmail.com",
      href: "mailto:rishirajnatj@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8240992946",
      href: "tel:+918240992946",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kolkata, West Bengal, India",
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Giant background text */}
      <div className="absolute top-8 md:top-12 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="bg-text bg-text--light block text-center">CONTACT</span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-heading text-foreground">Get In Touch</h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-4" />
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border">
          {/* Left — Accent block with contact info */}
          <motion.div
            className="bg-primary p-8 sm:p-12 flex flex-col justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">
              Let's work together.
            </h3>
            <p className="text-primary-foreground/70 mb-10 text-sm sm:text-base">
              Have a project in mind or just want to chat? Drop me a message.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href ? 'a' : 'div';
                return (
                  <Wrapper
                    key={item.title}
                    {...(item.href ? { href: item.href } : {})}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-2.5 rounded-lg bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-colors duration-300">
                      <Icon size={18} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-primary-foreground/50 text-xs uppercase tracking-wider font-medium">
                        {item.title}
                      </p>
                      <p className="text-primary-foreground text-sm sm:text-base font-medium">
                        {item.value}
                      </p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="bg-surface p-8 sm:p-12"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="contact-name" className="block text-muted-2 text-xs uppercase tracking-wider font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="input-minimal"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-muted-2 text-xs uppercase tracking-wider font-medium mb-2">
                  Email
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
                <label htmlFor="contact-message" className="block text-muted-2 text-xs uppercase tracking-wider font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  className="input-minimal resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-slide-fill w-full bg-primary text-primary-foreground font-medium py-3.5 px-6 rounded-lg transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg text-sm"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-sm"
                >
                  Failed to send message. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
