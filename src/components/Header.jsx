import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 py-6 transition-all duration-300 ${
        isScrolled 
          ? 'bg-surface/90 backdrop-blur-md py-4 border-b border-border' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.a 
          href="#hero" 
          className="text-2xl font-bold font-heading text-foreground hover:text-primary transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
        >
          Rishiraj<span className="text-primary">.dev</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <motion.li 
                key={link.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href={link.href}
                  className="group text-muted hover:text-primary text-sm font-medium relative transition-colors duration-200"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            className="p-2 rounded-lg border border-border bg-surface-2 hover:bg-surface-3 text-foreground transition-colors duration-200"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-foreground z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-surface z-40 pt-24 px-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <a 
                      href={link.href}
                      className="text-foreground hover:text-primary text-xl font-medium transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
