import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
      if (data.success === 'true') {
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

  return (
    <section 
      id="contact" 
      ref={ref}
      className="py-20 bg-dark"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 relative text-white">
          Get In Touch
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary rounded-full"></span>
        </h2>
        
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6 }}
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Email</h3>
                <a 
                  href="mailto:rishirajnatj@gmail.com" 
                  className="text-gray-500 hover:text-primary transition-colors duration-300"
                >
                  rishirajnatj@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Phone</h3>
                <a 
                  href="tel:+918240992946" 
                  className="text-gray-500 hover:text-primary transition-colors duration-300"
                >
                  +91 8240992946
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Location</h3>
                <p className="text-gray-500">Kolkata, West Bengal, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-800 font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-black"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-800 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-black"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-gray-800 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-black"
              ></textarea>
            </div>
            
            <motion.button
              type="submit"
              className="w-full bg-black hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 relative"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500 text-green-500 rounded-lg"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-lg"
              >
                Failed to send message. Please try again or email me directly.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}