import { motion as Motion, useTransform, useScroll } from 'framer-motion';
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code2,
  Server,
  Rocket,
  Download,
  MapPin,
  Terminal,
} from 'lucide-react';
import { useRef, useEffect } from 'react';
import myimage from '../assets/myimage.jpeg';

const quickStats = [
  { value: '9', label: 'Projects', icon: Rocket },
  { value: 'React', label: 'Frontend', icon: Code2 },
  { value: 'Node.js', label: 'Backend', icon: Server },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/13507-IN', label: 'GitHub' },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/rishiraj-debnath-890322313',
    label: 'LinkedIn',
  },
  { icon: Mail, href: 'mailto:rishirajnatj@gmail.com', label: 'Email' },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 46]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.55], [0.85, 0]);

  const photoColorRef = useRef(null);

  const updatePhotoSpotlight = (clientX, clientY, currentTarget) => {
    if (!photoColorRef.current || !currentTarget) return;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    photoColorRef.current.style.setProperty('--photo-spotlight-x', `${x}px`);
    photoColorRef.current.style.setProperty('--photo-spotlight-y', `${y}px`);
    photoColorRef.current.style.setProperty('--photo-spotlight-opacity', '1');
  };

  const handleMouseMovePhoto = (e) => {
    updatePhotoSpotlight(e.clientX, e.clientY, e.currentTarget);
  };

  const handleMouseLeavePhoto = () => {
    if (photoColorRef.current) {
      photoColorRef.current.style.setProperty('--photo-spotlight-opacity', '0');
    }
  };

  const handleTouchMovePhoto = (e) => {
    if (!e.touches[0]) return;
    const touch = e.touches[0];
    updatePhotoSpotlight(touch.clientX, touch.clientY, e.currentTarget);
  };

  const handleTouchEndPhoto = () => {
    if (photoColorRef.current) {
      photoColorRef.current.style.setProperty('--photo-spotlight-opacity', '0');
    }
  };

  const spotlightRef = useRef(null);
  const lastMousePos = useRef({ x: null, y: null });

  const updateSpotlight = (clientX, clientY) => {
    if (!spotlightRef.current) return;
    const rect = spotlightRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    spotlightRef.current.style.setProperty('--spotlight-x', `${x}px`);
    spotlightRef.current.style.setProperty('--spotlight-y', `${y}px`);
    spotlightRef.current.style.setProperty('--spotlight-opacity', '1');
  };

  const handleHeroMouseMove = (e) => {
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    updateSpotlight(e.clientX, e.clientY);
  };

  const handleHeroMouseLeave = () => {
    lastMousePos.current = { x: null, y: null };
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--spotlight-opacity', '0');
    }
  };

  const handleHeroTouchMove = (e) => {
    if (!e.touches[0]) return;
    const touch = e.touches[0];
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    updateSpotlight(touch.clientX, touch.clientY);
  };

  const handleHeroTouchEnd = () => {
    lastMousePos.current = { x: null, y: null };
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--spotlight-opacity', '0');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (lastMousePos.current.x !== null && lastMousePos.current.y !== null) {
        updateSpotlight(lastMousePos.current.x, lastMousePos.current.y);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      onTouchStart={handleHeroTouchMove}
      onTouchMove={handleHeroTouchMove}
      onTouchEnd={handleHeroTouchEnd}
      className="hero-shell relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <Motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        style={{ y: bgTextY, opacity: bgTextOpacity }}
        aria-hidden="true"
      >
        {/* Base stroke outline */}
        <span className="bg-text bg-text--light whitespace-nowrap">RISHIRAJ</span>

        {/* Revealed full text on hover */}
        <div
          ref={spotlightRef}
          className="bg-text-spotlight-mask absolute inset-0 flex items-center justify-center"
        >
          <span className="bg-text bg-text--full whitespace-nowrap">RISHIRAJ</span>
        </div>
      </Motion.div>

      <div className="hero-grid page-width relative z-10 grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 xl:gap-14">
        {/* Hero Narrative Column */}
        <Motion.div
          className="relative"
          style={{ y: contentY }}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </div>

          {/* Punchy Hero Heading */}
          <h1 className="hero-title mt-4 sm:mt-5 max-w-2xl font-bold tracking-tight text-foreground">
            Building modern web products from <span className="text-gradient">UI to API</span>.
          </h1>

          {/* Clean, Concise Summary */}
          <p className="hero-summary mt-3 sm:mt-4 max-w-xl text-muted leading-relaxed">
            Full-stack developer building high-performance React frontends,
            resilient Node.js APIs, and thoughtful digital products.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="#projects"
              className="btn-slide-fill inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40"
            >
              <Sparkles size={16} /> View Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/85 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary"
            >
              <Download size={16} /> View Résumé
            </a>

            {/* Social Icons Inline */}
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 sm:pt-0 sm:pl-2">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-sm"
                    aria-label={link.label}
                  >
                    <IconComponent size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Stats Grid: Enabled and Responsive for All Devices */}
          <div className="hero-stats mt-6 grid grid-cols-3 gap-2.5 sm:gap-3 max-w-lg">
            {quickStats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <Motion.div
                  key={stat.label}
                  className="glass-glow-card rounded-2xl border border-border bg-surface/80 p-3 sm:p-4 backdrop-blur-sm group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.08, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {stat.value}
                    </span>
                    <StatIcon size={16} className="text-primary/70 group-hover:text-primary transition-colors shrink-0" />
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-muted-2 truncate font-medium">{stat.label}</p>
                </Motion.div>
              );
            })}
          </div>
        </Motion.div>

        {/* Hero Visual Container: Blended into Hero Panel with Interactive B&W to Color Reveal */}
        <Motion.div
          className="hero-visual relative mx-auto flex w-full max-w-[24rem] sm:max-w-[26rem] justify-center lg:justify-end mt-4 lg:mt-0"
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            onMouseMove={handleMouseMovePhoto}
            onMouseLeave={handleMouseLeavePhoto}
            onTouchStart={handleTouchMovePhoto}
            onTouchMove={handleTouchMovePhoto}
            onTouchEnd={handleTouchEndPhoto}
            className="group relative w-full"
          >
            {/* Ambient Radial Backlight Glow - softly bleeds into hero canvas */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-primary/30 via-indigo-500/20 to-violet-600/20 blur-3xl opacity-70 animate-pulse-halo pointer-events-none" />

            {/* Main Portrait Frame: Black & White with Interactive Color Spotlight & Seamless Bottom Blend */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-border/50 bg-surface/30 backdrop-blur-md shadow-[0_24px_80px_rgba(79,70,229,0.18)] cursor-crosshair">
              {/* Base Layer: Black & White Portrait */}
              <img
                src={myimage}
                alt="Rishiraj Debnath"
                className="h-full w-full object-cover object-center filter grayscale contrast-[1.15] brightness-[0.96] transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Top Layer: Interactive Full Color Spotlight Reveal on Hover/Touch */}
              <div
                ref={photoColorRef}
                className="photo-spotlight-color absolute inset-0 pointer-events-none"
              >
                <img
                  src={myimage}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Hero Panel Blend: Seamless Multi-Stop Dissolve at the Bottom */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />

              {/* Edge Ring Polish */}
              <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] ring-1 ring-inset ring-white/10 dark:ring-white/10 pointer-events-none" />
            </div>

            {/* Floating Live Location Chip: Top Corner */}
            <div className="absolute -top-3 right-4 sm:right-6 rounded-full border border-border/80 bg-surface/92 px-3.5 py-1.5 shadow-lg backdrop-blur-md flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <MapPin size={13} className="text-primary" />
              <span>Kolkata, IN</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </div>

            {/* Floating Developer Identity Dock: Anchors the Blended Bottom Edge */}
            <div className="absolute -bottom-3 inset-x-4 sm:inset-x-6 rounded-2xl border border-border/80 bg-surface/92 p-3 shadow-xl backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md shadow-primary/25">
                  RD
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                    Rishiraj Debnath
                  </p>
                  <p className="text-[11px] text-muted-2 font-medium">Full-Stack Engineer</p>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-surface-2/80 px-2.5 py-1 text-[11px] font-mono text-primary font-semibold">
                <Terminal size={12} />
                <span>React / Node</span>
              </div>
            </div>

            {/* Desktop-only subtle orbital chips */}
            <div className="hidden sm:flex absolute top-12 -left-5 items-center gap-1.5 rounded-2xl border border-border/80 bg-surface/92 px-3 py-1.5 shadow-xl backdrop-blur-md">
              <Code2 size={13} className="text-primary" />
              <span className="text-xs font-semibold text-foreground">UI Systems</span>
            </div>

            <div className="hidden sm:flex absolute bottom-16 -right-5 items-center gap-1.5 rounded-2xl border border-border/80 bg-surface/92 px-3 py-1.5 shadow-xl backdrop-blur-md">
              <Server size={13} className="text-violet-400" />
              <span className="text-xs font-semibold text-foreground">APIs</span>
            </div>
          </div>
        </Motion.div>
      </div>

      <Motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-muted-2 hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </Motion.a>
      </Motion.div>
    </section>
  );
}
