import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/13507-IN",
    icon: <Github size={20} />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/rishiraj-debnath-890322313",
    icon: <Linkedin size={20} />,
  },
  {
    name: "Email",
    url: "mailto:rishirajnatj@gmail.com",
    icon: <Mail size={20} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_rishiraj_debnath_",
    icon: <Instagram size={20} />,
  },
];

const footerLinks = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <motion.footer 
      className="bg-dark-secondary border-t border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <motion.div 
            className="space-y-4"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold font-heading text-black">
              Rishiraj<span className="text-primary">.dev</span>
            </h3>
            <p className="text-gray-500">
              Electronics Engineer & Tech Enthusiast
            </p>
          </motion.div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-500 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black">Get In Touch</h4>
            <a 
              href="mailto:rishirajnatj@gmail.com" 
              className="text-gray-400 hover:text-primary transition-colors duration-300"
            >
              rishirajnatj@gmail.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Rishiraj Debnath. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}