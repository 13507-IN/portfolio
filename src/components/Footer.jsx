import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/13507-IN",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/rishiraj-debnath-890322313",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:rishirajnatj@gmail.com",
    icon: Mail,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_rishiraj_debnath_",
    icon: Instagram,
  },
];

const footerLinks = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const marqueeText = "RISHIRAJ DEBNATH • DEVELOPER • ENGINEER • CREATOR • ";

  return (
    <footer className="bg-surface-2 relative overflow-hidden">
      {/* Marquee band */}
      <div className="border-t border-b border-border py-4 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap">
          {/* Repeat the text enough times to fill the width */}
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-foreground/5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter select-none mx-4"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <a href="#hero" className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300">
              Rishiraj<span className="text-primary">.dev</span>
            </a>
            <p className="text-muted-2 text-sm leading-relaxed">
              Electronics Engineer & Tech Enthusiast
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-medium text-muted-2">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-medium text-muted-2">
              Get In Touch
            </h4>
            <a
              href="mailto:rishirajnatj@gmail.com"
              className="text-muted text-sm hover:text-primary transition-colors duration-300 block"
            >
              rishirajnatj@gmail.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-muted-2 text-xs">
            © {new Date().getFullYear()} Rishiraj Debnath. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socialLinks.map(({ name, url, icon: Icon }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-muted hover:text-primary transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
