import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Header({ onOpenCommandPalette, theme, setTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Motion.header
      className="fixed inset-x-0 top-0 z-40 pt-4 sm:pt-5"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="page-width">
        <div
          className={`relative flex items-center justify-between rounded-full border px-4 py-3 shadow-lg transition-all duration-300 sm:px-5 ${
            isScrolled || mobileMenuOpen
              ? 'border-border/80 bg-surface/88 backdrop-blur-xl'
              : 'border-border/55 bg-surface/72 backdrop-blur-md'
          }`}
        >
          <Motion.a
            href="#hero"
            className="text-lg font-bold tracking-tight text-foreground transition-colors duration-200 hover:text-primary sm:text-xl"
            whileHover={{ scale: 1.03 }}
          >
            Rishiraj<span className="text-primary">.dev</span>
          </Motion.a>

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/80 bg-background/65 p-1">
            {navLinks.map((link) => (
              <Motion.a
                key={link.name}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {link.name}
              </Motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Motion.button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-surface-2/80 px-3.5 py-2 text-xs font-medium text-muted hover:border-primary/40 hover:text-foreground transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Open command palette"
              title="Open Command Palette (Cmd + K)"
            >
              <Search size={14} className="text-primary" />
              <span>Search...</span>
              <kbd className="hidden lg:inline-block rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-mono text-muted-2">
                ⌘K
              </kbd>
            </Motion.button>

            <div className="hidden xl:flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Open to build cool things
            </div>

            <Motion.button
              className="rounded-full border border-border bg-surface-2 p-2.5 text-foreground transition-colors duration-200 hover:bg-surface-3"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </Motion.button>

            <Motion.button
              className="rounded-full border border-border bg-surface-2 p-2.5 text-foreground transition-colors duration-200 hover:bg-surface-3 md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            className="page-width md:hidden"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
          >
            <div className="mt-3 rounded-[1.75rem] border border-border bg-surface/94 p-5 shadow-2xl backdrop-blur-xl space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary"
              >
                <span className="flex items-center gap-2">
                  <Search size={16} /> Search & Commands
                </span>
                <span className="text-xs font-mono bg-primary/20 px-2 py-0.5 rounded">⌘K</span>
              </button>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <Motion.a
                    key={link.name}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-colors duration-200 hover:bg-surface-2 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, delay: index * 0.05 }}
                  >
                    {link.name}
                  </Motion.a>
                ))}
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  );
}
