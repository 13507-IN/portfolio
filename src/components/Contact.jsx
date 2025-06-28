import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      id="contact" 
      ref={ref}
      className="py-20 bg-dark"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 relative">
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
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-800 font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-800 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-gray-800 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-white"
              ></textarea>
            </div>
            
            <motion.button
              type="submit"
              className="w-full border bg-black hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}