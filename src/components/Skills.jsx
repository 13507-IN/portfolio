import { useState, useRef, useEffect, useCallback } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Server,
  Database,
  GitBranch,
  Sparkles,
  ArrowUpRight,
  Cpu,
  Layers,
  CheckCircle2,
  Zap,
  Play,
  RotateCcw,
  Globe,
  Terminal,
  Activity,
  FileCode,
  ShieldCheck,
} from 'lucide-react';

const categories = ['All', 'Frontend', 'Backend', 'Data & DevOps'];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({
    threshold: 0.1,
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

  return (
    <section
      id="skills"
      ref={ref}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      onTouchStart={handleSectionTouchMove}
      onTouchMove={handleSectionTouchMove}
      onTouchEnd={handleSectionTouchEnd}
      className="section-shell relative overflow-hidden bg-gradient-to-b from-surface-2 via-surface-2 via-60% to-background"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <Motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="section-kicker m-0">Engineering Stack</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            </div>
            <h2 className="section-heading text-foreground">
              Technologies & System Architecture.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted max-w-xl leading-relaxed">
              From responsive frontend design systems to low-latency APIs and resilient data models. Here is how I build production software.
            </p>
          </Motion.div>

          {/* Filter Tabs */}
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

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-12 gap-6 lg:gap-7 items-stretch">
          {/* Card 1: Frontend Architecture (Span 7 on desktop) */}
          {(activeCategory === 'All' || activeCategory === 'Frontend') && (
            <div className={`col-span-12 ${activeCategory === 'All' ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
              <FrontendBentoCard />
            </div>
          )}

          {/* Card 2: Backend & Distributed Services (Span 5 on desktop) */}
          {(activeCategory === 'All' || activeCategory === 'Backend') && (
            <div className={`col-span-12 ${activeCategory === 'All' ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
              <BackendBentoCard />
            </div>
          )}

          {/* Card 3: Data Systems & ORM (Span 5 on desktop) */}
          {(activeCategory === 'All' || activeCategory === 'Data & DevOps') && (
            <div className={`col-span-12 ${activeCategory === 'All' ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
              <DataBentoCard />
            </div>
          )}

          {/* Card 4: DevOps & Engineering Workflow (Span 7 on desktop) */}
          {(activeCategory === 'All' || activeCategory === 'Data & DevOps') && (
            <div className={`col-span-12 ${activeCategory === 'All' ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
              <DevOpsBentoCard />
            </div>
          )}
        </div>

        {/* Complete Tech Arsenal Footer Shelf */}
        <TechnicalArsenalShelf />
      </div>

      {/* Bottom Transition Blend to Contact */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />
    </section>
  );
}

// -------------------------------------------------------------
// Helper: Card Spotlight Hover Hook
// -------------------------------------------------------------
function useCardSpotlight() {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

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

  return { cardRef, spotlight, handleMouseMove, handleMouseLeave };
}

// -------------------------------------------------------------
// Card 1: Frontend Architecture & UI Systems
// -------------------------------------------------------------
function FrontendBentoCard() {
  const { cardRef, spotlight, handleMouseMove, handleMouseLeave } = useCardSpotlight();
  const [activeTab, setActiveTab] = useState('performance');

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-glow-card group relative flex flex-col justify-between h-full rounded-[2rem] border border-cyan-500/20 bg-surface/90 p-6 sm:p-8 shadow-[0_20px_50px_rgba(6,182,212,0.06)] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-cyan-500/40"
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(420px circle at ${spotlight.x}px ${spotlight.y}px, rgba(6, 182, 212, 0.16), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-transparent text-cyan-400 shadow-sm transition-transform duration-500 group-hover:scale-105">
              <Layers size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-cyan-400">
                Frontend Architecture
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                UI Systems & Interfaces
              </h3>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Sparkles size={11} /> Primary Focus
          </span>
        </div>

        <p className="text-sm text-muted leading-relaxed font-normal mb-6">
          Building responsive, accessible web products with React 19, Next.js 15, and TypeScript. Focused on snappy client hydration, design tokens, and fluid 60fps micro-interactions.
        </p>

        {/* Interactive Micro-Inspector Widget */}
        <div className="rounded-2xl border border-border/80 bg-surface-2/60 p-4 sm:p-5 backdrop-blur-sm mb-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-cyan-400" />
              <span className="text-xs font-semibold text-foreground/90">
                Interface Inspector
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-surface p-0.5">
              <button
                onClick={() => setActiveTab('performance')}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                  activeTab === 'performance'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                Architecture
              </button>
            </div>
          </div>

          {activeTab === 'performance' ? (
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-border/50 bg-surface/70 p-3">
                <span className="text-lg sm:text-xl font-bold text-emerald-400 block">
                  100%
                </span>
                <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">
                  Lighthouse UI
                </span>
              </div>
              <div className="rounded-xl border border-border/50 bg-surface/70 p-3">
                <span className="text-lg sm:text-xl font-bold text-cyan-400 block">
                  &lt;1.2s
                </span>
                <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">
                  LCP / Hydration
                </span>
              </div>
              <div className="rounded-xl border border-border/50 bg-surface/70 p-3">
                <span className="text-lg sm:text-xl font-bold text-purple-400 block">
                  60 FPS
                </span>
                <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">
                  Fluid Motion
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-muted">
                <span>Rendering Paradigm:</span>
                <span className="font-semibold text-foreground">Next.js 15 App Router (SSR &amp; SSG)</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Design System:</span>
                <span className="font-semibold text-foreground">Tailwind CSS + Fluid Tokens</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>State &amp; Types:</span>
                <span className="font-semibold text-foreground">Strict TypeScript + React 19 Hooks</span>
              </div>
            </div>
          )}
        </div>

        {/* Clean Tech Capabilities List */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'].map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-xs font-medium text-foreground/90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Applied In Projects */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        <span className="text-xs font-semibold text-muted">
          Proven in products:
        </span>
        <div className="flex items-center gap-2">
          {['CampusSpace', 'InceptIQ', 'Funfy'].map((project) => (
            <a
              key={project}
              href="#projects"
              className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-surface-2/80 px-2.5 py-1 text-xs font-semibold text-foreground/80 transition-all hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <span>{project}</span>
              <ArrowUpRight size={11} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// -------------------------------------------------------------
// Card 2: Backend Engines & Security (API Terminal Simulator)
// -------------------------------------------------------------
function BackendBentoCard() {
  const { cardRef, spotlight, handleMouseMove, handleMouseLeave } = useCardSpotlight();
  const [latency, setLatency] = useState(1.8);
  const [isPinging, setIsPinging] = useState(false);

  const handlePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setLatency(Number((Math.random() * 0.9 + 1.1).toFixed(1)));
      setIsPinging(false);
    }, 280);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-glow-card group relative flex flex-col justify-between h-full rounded-[2rem] border border-purple-500/20 bg-surface/90 p-6 sm:p-8 shadow-[0_20px_50px_rgba(168,85,247,0.06)] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-purple-500/40"
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(420px circle at ${spotlight.x}px ${spotlight.y}px, rgba(168, 85, 247, 0.16), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-transparent text-purple-400 shadow-sm transition-transform duration-500 group-hover:scale-105">
              <Server size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-purple-400">
                Backend &amp; Identity
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                APIs &amp; Microservices
              </h3>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">
            <Sparkles size={11} /> Primary Focus
          </span>
        </div>

        <p className="text-sm text-muted leading-relaxed font-normal mb-6">
          RESTful engineering, dual-token JWT rotation engines, multi-tier RBAC, and compiled low-latency microservices with Node.js and Rust.
        </p>

        {/* Live Interactive API Terminal Simulator */}
        <div className="rounded-2xl border border-border/80 bg-surface-2/70 p-4 font-mono text-xs mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-border/50 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <Terminal size={13} className="text-purple-400" />
              <span className="text-foreground/80 font-medium">api.rishiraj.dev/v1</span>
            </div>
            <button
              onClick={handlePing}
              disabled={isPinging}
              className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-2 py-1 text-[11px] font-semibold text-purple-300 hover:bg-purple-500/20 active:scale-95 transition-all"
            >
              <Zap size={11} className={isPinging ? 'animate-spin' : ''} />
              <span>{isPinging ? 'Pinging...' : 'Ping Route'}</span>
            </button>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-foreground/90">
              <span className="text-purple-400 font-bold">POST</span>
              <span>/auth/token-rotation</span>
            </div>
            <div className="flex items-center justify-between pt-1 text-muted">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 size={12} /> 200 OK (Verified)
              </span>
              <span className="text-foreground/80 font-semibold">{latency} ms</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {['Node.js', 'Express', 'Rust', 'Axum', 'JWT Rotation', 'REST APIs'].map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/20 bg-purple-500/5 px-2.5 py-1 text-xs font-medium text-foreground/90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Applied In Projects */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        <span className="text-xs font-semibold text-muted">
          Proven in products:
        </span>
        <div className="flex items-center gap-2">
          {['Rishiraj Auth', 'InceptIQ', 'ScholarCatalyst'].map((project) => (
            <a
              key={project}
              href="#projects"
              className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-surface-2/80 px-2.5 py-1 text-xs font-semibold text-foreground/80 transition-all hover:border-purple-500/40 hover:text-purple-400"
            >
              <span>{project}</span>
              <ArrowUpRight size={11} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// -------------------------------------------------------------
// Card 3: Data Systems & ORM (Interactive Query Inspector)
// -------------------------------------------------------------
function DataBentoCard() {
  const { cardRef, spotlight, handleMouseMove, handleMouseLeave } = useCardSpotlight();
  const [selectedEngine, setSelectedEngine] = useState('prisma');

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-glow-card group relative flex flex-col justify-between h-full rounded-[2rem] border border-emerald-500/20 bg-surface/90 p-6 sm:p-8 shadow-[0_20px_50px_rgba(16,185,129,0.06)] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-emerald-500/40"
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(420px circle at ${spotlight.x}px ${spotlight.y}px, rgba(16, 185, 129, 0.16), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent text-emerald-400 shadow-sm transition-transform duration-500 group-hover:scale-105">
              <Database size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">
                Storage &amp; Schemas
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Data Architecture &amp; ORM
              </h3>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted leading-relaxed font-normal mb-6">
          Relational and document storage with strict type safety, zero-downtime migrations, and sub-millisecond query execution.
        </p>

        {/* Live Query / Schema Inspector */}
        <div className="rounded-2xl border border-border/80 bg-surface-2/70 p-4 font-mono text-xs mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-3">
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              // Schema Validation
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setSelectedEngine('prisma')}
                className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase transition-all ${
                  selectedEngine === 'prisma'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                Prisma
              </button>
              <button
                onClick={() => setSelectedEngine('sql')}
                className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase transition-all ${
                  selectedEngine === 'sql'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                SQL
              </button>
            </div>
          </div>

          {selectedEngine === 'prisma' ? (
            <div className="space-y-1 text-[11px] leading-relaxed text-foreground/80">
              <p className="text-purple-400">model <span className="text-foreground">Session</span> &#123;</p>
              <p className="pl-3 text-cyan-400">tokenHash <span className="text-emerald-400">String</span> @unique</p>
              <p className="pl-3 text-cyan-400">user <span className="text-emerald-400">User</span> @relation(...)</p>
              <p className="text-purple-400">&#125;</p>
            </div>
          ) : (
            <div className="space-y-1 text-[11px] leading-relaxed text-foreground/80">
              <p className="text-cyan-400">SELECT <span className="text-foreground">u.id, s.token</span></p>
              <p className="text-purple-400">FROM <span className="text-foreground">sessions s</span></p>
              <p className="text-purple-400">INDEX HIT: <span className="text-emerald-400 font-semibold">0.4ms execution</span></p>
            </div>
          )}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM', 'Schema Design'].map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-xs font-medium text-foreground/90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Applied In Projects */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        <span className="text-xs font-semibold text-muted">
          Proven in products:
        </span>
        <div className="flex items-center gap-2">
          {['Rishiraj Auth', 'FinMate', 'Clip'].map((project) => (
            <a
              key={project}
              href="#projects"
              className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-surface-2/80 px-2.5 py-1 text-xs font-semibold text-foreground/80 transition-all hover:border-emerald-500/40 hover:text-emerald-400"
            >
              <span>{project}</span>
              <ArrowUpRight size={11} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// -------------------------------------------------------------
// Card 4: DevOps & Engineering Delivery (Live Pipeline Visual)
// -------------------------------------------------------------
function DevOpsBentoCard() {
  const { cardRef, spotlight, handleMouseMove, handleMouseLeave } = useCardSpotlight();
  const [pipelineState, setPipelineState] = useState('idle');

  const runPipeline = () => {
    setPipelineState('running');
    setTimeout(() => {
      setPipelineState('success');
    }, 600);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-glow-card group relative flex flex-col justify-between h-full rounded-[2rem] border border-amber-500/20 bg-surface/90 p-6 sm:p-8 shadow-[0_20px_50px_rgba(245,158,11,0.06)] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-amber-500/40"
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(420px circle at ${spotlight.x}px ${spotlight.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent text-amber-400 shadow-sm transition-transform duration-500 group-hover:scale-105">
              <GitBranch size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400">
                Workflow &amp; CI/CD
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Engineering Delivery &amp; Tooling
              </h3>
            </div>
          </div>

          <button
            onClick={runPipeline}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-all active:scale-95"
          >
            <RotateCcw size={11} className={pipelineState === 'running' ? 'animate-spin' : ''} />
            <span>Test Pipeline</span>
          </button>
        </div>

        <p className="text-sm text-muted leading-relaxed font-normal mb-6">
          Automated linting, type-checking, integration tests, and worldwide edge deployment pipelines with Git, GitHub Actions, and Vercel.
        </p>

        {/* Live CI/CD Pipeline Visual Stepper */}
        <div className="rounded-2xl border border-border/80 bg-surface-2/60 p-4 sm:p-5 backdrop-blur-sm mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-border/50 bg-surface/70 p-3">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
                <CheckCircle2 size={13} />
                <span>Lint &amp; Types</span>
              </div>
              <p className="text-[10px] text-muted font-mono">ESLint 9 · Strict TS</p>
            </div>

            <div className="rounded-xl border border-border/50 bg-surface/70 p-3">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
                <CheckCircle2 size={13} />
                <span>Test Suite</span>
              </div>
              <p className="text-[10px] text-muted font-mono">100% Passed</p>
            </div>

            <div className="rounded-xl border border-border/50 bg-surface/70 p-3">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
                <CheckCircle2 size={13} />
                <span>Build Bundle</span>
              </div>
              <p className="text-[10px] text-muted font-mono">Tree-shaken Vite</p>
            </div>

            <div className="rounded-xl border border-border/50 bg-surface/70 p-3">
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold mb-1">
                <Zap size={13} />
                <span>Edge Deploy</span>
              </div>
              <p className="text-[10px] text-muted font-mono">Vercel &amp; Render</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {['Git & GitHub', 'CI / CD Actions', 'PR Reviews', 'Vercel Edge', 'Docker'].map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-2.5 py-1 text-xs font-medium text-foreground/90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Applied In Work */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        <span className="text-xs font-semibold text-muted">
          Proven in workflow:
        </span>
        <div className="flex items-center gap-2">
          {['Open Source', 'GitHub Repositories'].map((item) => (
            <a
              key={item}
              href="#opensource"
              className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-surface-2/80 px-2.5 py-1 text-xs font-semibold text-foreground/80 transition-all hover:border-amber-500/40 hover:text-amber-400"
            >
              <span>{item}</span>
              <ArrowUpRight size={11} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// -------------------------------------------------------------
// Complete Technical Arsenal Shelf (Clean Directory)
// -------------------------------------------------------------
function TechnicalArsenalShelf() {
  const stacks = [
    {
      group: 'Languages',
      icon: Code2,
      color: 'text-cyan-400',
      items: ['JavaScript (ES2024+)', 'TypeScript', 'Rust', 'HTML5', 'CSS3', 'SQL'],
    },
    {
      group: 'Frontend & UI',
      icon: Globe,
      color: 'text-sky-400',
      items: ['React 19', 'Next.js 15', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    },
    {
      group: 'Backend & Security',
      icon: Server,
      color: 'text-purple-400',
      items: ['Node.js', 'Express', 'Axum', 'JWT Rotation', 'OAuth 2.0', 'REST APIs'],
    },
    {
      group: 'Data & Infrastructure',
      icon: Database,
      color: 'text-emerald-400',
      items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM', 'Git & GitHub', 'Vercel / Render'],
    },
  ];

  return (
    <div className="mt-12 sm:mt-16 rounded-[2rem] border border-border/80 bg-surface/80 p-6 sm:p-8 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-border/60 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-2">
            Complete Index
          </span>
          <h4 className="text-lg font-bold text-foreground">
            Technical Arsenal &amp; Tooling
          </h4>
        </div>
        <p className="text-xs text-muted max-w-sm">
          A comprehensive overview of libraries, runtime engines, and development workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stacks.map((stack) => {
          const StackIcon = stack.icon;
          return (
            <div key={stack.group} className="space-y-3">
              <div className="flex items-center gap-2">
                <StackIcon size={16} className={stack.color} />
                <h5 className="text-xs font-bold uppercase tracking-wider text-foreground/90">
                  {stack.group}
                </h5>
              </div>
              <ul className="space-y-1.5 text-xs text-muted font-medium">
                {stack.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="hover:text-foreground transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
