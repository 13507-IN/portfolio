import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import './index.css';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const lenisRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Global Cmd+K keyboard shortcut handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    let frameId;

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <Router>
      <Loader isLoading={isLoading} />
      <CustomCursor />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        theme={theme}
      />
      <div
        className={`app transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <ScrollProgress />
        <Header
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          theme={theme}
          setTheme={setTheme}
        />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      </div>
    </Router>
  );
}
