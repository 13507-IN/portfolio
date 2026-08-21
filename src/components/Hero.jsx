import { motion as Motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Sparkles, Code2, Cpu, Rocket } from 'lucide-react';
import { useRef } from 'react';
import myimage from '../assets/myimage.jpeg';

const quickStats = [
  { value: '09+', label: 'Projects built', icon: Rocket },
  { value: 'AI + Web', label: 'Favorite stack', icon: Code2 },
  { value: '24/7', label: 'Curiosity mode', icon: Cpu },
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

const floatingBadges = [
  { name: 'React 19', pos: '-top-4 -left-4 sm:-left-8' },
  { name: 'Python & AI', pos: 'top-1/3 -right-4 sm:-right-8' },
  { name: 'Electronics (ECE)', pos: '-bottom-4 -left-2 sm:-left-6' },
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

  // 3D Tilt calculation for hero profile photo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMovePhoto = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeavePhoto = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-shell relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <Motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: bgTextY, opacity: bgTextOpacity }}
      >
        <span className="bg-text bg-text--light whitespace-nowrap">RISHIRAJ</span>
      </Motion.div>

      <div className="hero-grid page-width relative z-10 grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-14">
        <Motion.div
          className="relative"
          style={{ y: contentY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary backdrop-blur-md sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Web + AI Builder
          </div>

          <h1 className="hero-title mt-5 max-w-3xl font-bold tracking-tight text-foreground">
            Building <span className="text-gradient">thoughtful digital</span> experiences with code.
          </h1>

          <p className="hero-summary mt-5 max-w-2xl text-muted">
            I&apos;m Rishiraj Debnath, an Electronics & Communication Engineering
            student who enjoys turning ambitious ideas into smooth, modern
            interfaces and practical products.
          </p>

          <div className="hero-actions mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="#projects"
              className="btn-slide-fill inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 sm:text-base"
            >
              <Sparkles size={16} /> Explore Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface/85 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary sm:text-base"
            >
              Let&apos;s Connect
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/75 text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-md"
                  aria-label={link.label}
                >
                  <IconComponent size={19} />
                </a>
              );
            })}
          </div>

          <div className="hero-stats mt-6 grid gap-3 sm:grid-cols-3">
            {quickStats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <Motion.div
                  key={stat.label}
                  className="glass-glow-card rounded-[1.5rem] border border-border bg-surface/80 p-4 backdrop-blur-sm group"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + index * 0.1, duration: 0.55 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {stat.value}
                    </span>
                    <StatIcon size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="mt-1 text-sm text-muted-2">{stat.label}</p>
                </Motion.div>
              );
            })}
          </div>
        </Motion.div>

        {/* Hero Visual Container with 3D Tilt */}
        <Motion.div
          className="hero-visual relative mx-auto flex w-full max-w-[28rem] justify-center lg:justify-end"
          style={{ y: photoY, perspective: 1000 }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Motion.div
            onMouseMove={handleMouseMovePhoto}
            onMouseLeave={handleMouseLeavePhoto}
            style={{ rotateX, rotateY }}
            className="relative w-full max-w-[26rem] transition-transform duration-200 ease-out"
          >
            <div className="absolute inset-3 rounded-[2.5rem] bg-primary/20 blur-3xl animate-pulse-halo" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface/90 p-4 shadow-[0_24px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-surface-2 group">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={myimage}
                    alt="Rishiraj Debnath"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.32em] text-white/70 font-semibold">
                    Based in Kolkata, India
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Crafting useful things with code
                  </h2>
                </div>
              </div>
            </div>

            {/* Floating Info Pills */}
            {floatingBadges.map((badge, idx) => (
              <Motion.div
                key={badge.name}
                className={`absolute ${badge.pos} rounded-2xl border border-border/80 bg-surface/95 px-4 py-2.5 shadow-xl backdrop-blur-md`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.15 }}
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-muted-2">Focus</p>
                <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {badge.name}
                </p>
              </Motion.div>
            ))}
          </Motion.div>
        </Motion.div>
      </div>

      <Motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35 }}
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
