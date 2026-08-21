import { motion as Motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, Search, Sparkles } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/13507-IN',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/rishiraj-debnath-890322313',
    icon: Linkedin,
  },
  {
    name: 'Email',
    url: 'mailto:rishirajnatj@gmail.com',
    icon: Mail,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/_rishiraj_debnath_',
    icon: Instagram,
  },
];

const footerLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer({ onOpenCommandPalette }) {
  const marqueeText = 'RISHIRAJ DEBNATH • DEVELOPER • ENGINEER • CREATOR • ';

  return (
    <footer className="relative overflow-hidden bg-surface-2 border-t border-border/80">
      <div className="py-4 overflow-hidden border-b border-border/60">
        <div className="marquee-track flex whitespace-nowrap">
          {[...Array(4)].map((_, index) => (
            <span
              key={index}
              className="mx-4 select-none text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground/5"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      <div className="page-width py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <a
              href="#hero"
              className="text-xl font-bold text-foreground transition-colors duration-300 hover:text-primary"
            >
              Rishiraj<span className="text-primary">.dev</span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-2">
              Electronics engineer, curious builder, and someone who enjoys
              making ideas feel polished and functional.
            </p>

            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface px-3 py-1.5 text-xs text-muted hover:border-primary/40 hover:text-foreground transition-colors"
              >
                <Search size={13} className="text-primary" />
                <span>Search portfolio (⌘K)</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-2">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-2">
              Reach Out
            </h4>
            <a
              href="mailto:rishirajnatj@gmail.com"
              className="block text-sm font-medium text-muted transition-colors duration-300 hover:text-primary"
            >
              rishirajnatj@gmail.com
            </a>
            <p className="text-sm text-muted-2">Kolkata, West Bengal, India</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border/80 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-2">
              © {new Date().getFullYear()} Rishiraj Debnath. Crafted with React & Tailwind.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;

                return (
                  <Motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-300 hover:border-primary/40 hover:text-primary hover:-translate-y-1"
                    whileHover={{ y: -2 }}
                  >
                    <IconComponent size={16} />
                  </Motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
