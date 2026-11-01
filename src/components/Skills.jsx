import { useState, useRef, useEffect, useCallback } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  FileCode,
  Terminal,
  Boxes,
  Database,
  Globe,
  Server,
  GitBranch,
  Sparkles,
  ArrowUpRight,
  Cpu,
} from 'lucide-react';

const categories = ['All', 'Frontend', 'Backend', 'Workflow'];

const skills = [
  {
    id: 'react-next',
    name: 'React & Next.js',
    category: 'Frontend',
    level: 'Primary Focus',
    isFlagship: true,
    note: 'Component architecture, SSR/SSG product workflows, and responsive interfaces.',
    tools: ['React 19', 'Next.js 15', 'Hooks', 'SSR / SSG', 'Vite'],
    usedIn: [
      { name: 'CampusSpace', href: '#projects' },
      { name: 'InceptIQ', href: '#projects' },
      { name: 'Funfy', href: '#projects' },
    ],
    icon: Boxes,
    theme: {
      badge: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
      iconBox: 'border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent text-cyan-400',
      glow: 'rgba(6, 182, 212, 0.22)',
      borderHover: 'hover:border-cyan-500/40',
    },
  },
  {
    id: 'node-express',
    name: 'Node.js & Express',
    category: 'Backend',
    level: 'Primary Focus',
    isFlagship: true,
    note: 'RESTful API engineering, authentication engines, and resilient server-side logic.',
    tools: ['Express.js', 'REST APIs', 'JWT Auth', 'Middleware', 'CORS'],
    usedIn: [
      { name: 'Rishiraj Auth', href: '#projects' },
      { name: 'InceptIQ', href: '#projects' },
      { name: 'ScholarCatalyst', href: '#projects' },
    ],
    icon: Server,
    theme: {
      badge: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
      iconBox: 'border-purple-500/30 bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-transparent text-purple-400',
      glow: 'rgba(168, 85, 247, 0.22)',
      borderHover: 'hover:border-purple-500/40',
    },
  },
  {
    id: 'js-ts',
    name: 'JavaScript & TypeScript',
    category: 'Frontend',
    level: 'Core Language',
    note: 'Type-safe frontend code, ES2024+ syntax, and async asynchronous architectures.',
    tools: ['TypeScript', 'ES6+ Modern JS', 'Generics', 'Async / Await'],
    usedIn: [
      { name: 'Funfy', href: '#projects' },
      { name: 'TaskMaster', href: '#projects' },
      { name: 'GoWavy', href: '#opensource' },
    ],
    icon: FileCode,
    theme: {
      badge: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
      iconBox: 'border-blue-500/30 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent text-blue-400',
      glow: 'rgba(59, 130, 246, 0.22)',
      borderHover: 'hover:border-blue-500/40',
    },
  },
  {
    id: 'databases',
    name: 'Databases & ORM',
    category: 'Backend',
    level: 'Data Persistence',
    note: 'Relational & NoSQL database modeling, migrations, and low-latency queries.',
    tools: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM', 'Schema Design'],
    usedIn: [
      { name: 'Rishiraj Auth', href: '#projects' },
      { name: 'FinMate', href: '#projects' },
      { name: 'Clip', href: '#opensource' },
    ],
    icon: Database,
    theme: {
      badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
      iconBox: 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent text-emerald-400',
      glow: 'rgba(16, 185, 129, 0.22)',
      borderHover: 'hover:border-emerald-500/40',
    },
  },
  {
    id: 'html-css',
    name: 'HTML, CSS & Tailwind',
    category: 'Frontend',
    level: 'Design Systems',
    note: 'Responsive layouts, fluid design tokens, micro-interactions, and accessibility.',
    tools: ['Tailwind CSS', 'Responsive UI', 'Flexbox & Grid', 'CSS Animations'],
    usedIn: [
      { name: 'Portfolio', href: '#hero' },
      { name: 'CampusSpace', href: '#projects' },
      { name: 'InceptIQ', href: '#projects' },
    ],
    icon: Globe,
    theme: {
      badge: 'border-teal-500/30 bg-teal-500/10 text-teal-400',
      iconBox: 'border-teal-500/30 bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-transparent text-teal-400',
      glow: 'rgba(20, 184, 166, 0.22)',
      borderHover: 'hover:border-teal-500/40',
    },
  },
  {
    id: 'auth-apis',
    name: 'Authentication & APIs',
    category: 'Backend',
    level: 'Security & Identity',
    note: 'Multi-tier RBAC, dual-token access/refresh rotation, and zero-vendor-lockin auth.',
    tools: ['OAuth 2.0', 'Token Rotation', 'RBAC Middleware', 'Rate Limiting'],
    usedIn: [
      { name: 'Rishiraj Auth', href: '#projects' },
      { name: 'InceptIQ', href: '#projects' },
    ],
    icon: Code2,
    theme: {
      badge: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
      iconBox: 'border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent text-indigo-400',
      glow: 'rgba(99, 102, 241, 0.22)',
      borderHover: 'hover:border-indigo-500/40',
    },
  },
  {
    id: 'systems-rust',
    name: 'Systems & Performance',
    category: 'Backend',
    level: 'Low-Latency',
    note: 'Sub-2ms response latency, in-memory caching, and compiled backend microservices.',
    tools: ['Rust', 'Axum', 'SQLx', 'Sub-2ms Latency', 'Microservices'],
    usedIn: [
      { name: 'Clip', href: '#opensource' },
      { name: 'Yew Community', href: '#opensource' },
    ],
    icon: Cpu,
    theme: {
      badge: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
      iconBox: 'border-amber-500/30 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent text-amber-400',
      glow: 'rgba(245, 158, 11, 0.22)',
      borderHover: 'hover:border-amber-500/40',
    },
  },
  {
    id: 'git-workflow',
    name: 'Git & Workflow',
    category: 'Workflow',
    level: 'DevOps & Tooling',
    note: 'Version control, open-source pull requests, code reviews, and automated CI/CD.',
    tools: ['Git & GitHub', 'CI / CD Pipelines', 'PR Reviews', 'Vercel / Render'],
    usedIn: [
      { name: 'Open Source', href: '#opensource' },
      { name: 'GitHub Repos', href: 'https://github.com/13507-IN' },
    ],
    icon: GitBranch,
    theme: {
      badge: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
      iconBox: 'border-rose-500/30 bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-transparent text-rose-400',
      glow: 'rgba(244, 63, 94, 0.22)',
      borderHover: 'hover:border-rose-500/40',
    },
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({
    threshold: 0.12,
    triggerOnce: true,
  });

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

  const handleSectionMouseMove = (e) => {
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    updateSpotlight(e.clientX, e.clientY);
  };

  const handleSectionMouseLeave = () => {
    lastMousePos.current = { x: null, y: null };
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--spotlight-opacity', '0');
    }
  };

  const handleSectionTouchMove = (e) => {
    if (!e.touches[0]) return;
    const touch = e.touches[0];
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    updateSpotlight(touch.clientX, touch.clientY);
  };

  const handleSectionTouchEnd = () => {
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

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={ref}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      onTouchStart={handleSectionTouchMove}
      onTouchMove={handleSectionTouchMove}
      onTouchEnd={handleSectionTouchEnd}
      className="section-shell relative overflow-hidden bg-surface-2"
    >
      {/* Background Text "SKILLS" with Interactive Cursor Spotlight Reveal */}
      <div
        className="absolute top-6 left-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="bg-text bg-text--light block text-center">SKILLS</span>
        <div
          ref={spotlightRef}
          className="bg-text-spotlight-mask absolute inset-0"
        >
          <span className="bg-text bg-text--full block text-center">SKILLS</span>
        </div>
      </div>

      <div className="page-width relative z-10">
        {/* Section Intro Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <Motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-kicker">Core toolkit</p>
            <h2 className="section-heading text-foreground">
              Technologies I work with.
            </h2>
          </Motion.div>

          {/* Skill Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 rounded-2xl border border-border bg-surface/85 p-1.5 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                    : 'text-muted hover:text-foreground hover:bg-surface-2'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Skills Grid */}
        <Motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <SkillCard skill={skill} />
              </Motion.div>
            ))}
          </AnimatePresence>
        </Motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill }) {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });
  const IconComponent = skill.icon;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-glow-card group relative flex flex-col justify-between rounded-[2rem] border border-border/80 bg-surface/90 p-5 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${skill.theme.borderHover} h-full overflow-hidden`}
    >
      {/* Individual Card Radial Spotlight Glow tracking mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(320px circle at ${spotlight.x}px ${spotlight.y}px, ${skill.theme.glow}, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Top Header Row with Icon and Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${skill.theme.iconBox} shadow-sm transition-transform duration-500 group-hover:scale-110`}
          >
            <IconComponent size={22} />
          </div>

          <div className="flex items-center gap-1.5">
            {skill.isFlagship && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                <Sparkles size={10} /> Core
              </span>
            )}
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${skill.theme.badge}`}
            >
              {skill.category}
            </span>
          </div>
        </div>

        {/* Skill Title & Short Description */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {skill.name}
        </h3>
        <p className="mt-1.5 text-xs text-muted leading-relaxed font-normal">
          {skill.note}
        </p>

        {/* Concrete Sub-Tools & Libraries Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skill.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-lg border border-border/70 bg-surface-2/70 px-2 py-0.5 text-[11px] font-medium text-foreground/80 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Interactive Project Chips */}
      <div className="relative z-10 mt-5 border-t border-border/60 pt-3.5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-2 mb-2">
          Applied in:
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {skill.usedIn.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-surface-2/80 px-2 py-0.5 text-[11px] font-semibold text-foreground/80 transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-105 active:scale-95"
            >
              <span>{item.name}</span>
              <ArrowUpRight size={11} className="text-muted-2 transition-transform group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
