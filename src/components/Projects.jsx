import { motion as Motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Sparkles, Layers, ArrowUpRight, Filter } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import SerenityImage from '../assets/serenity.png';
import ToDoImage from '../assets/taskmaster.png';
import FinMateImage from '../assets/FinMate.jpeg';
import InceptIQImage from '../assets/inceptIQ.png';
import MimicImage from '../assets/mimic.png';
import MediOpsImage from '../assets/mediops.png';
import ProjectModal from './ProjectModal';

const categories = ['All', 'AI & ML', 'Full Stack / Web', 'Systems & Backend'];

const gradients = [
  'from-violet-600/30 to-indigo-800/30',
  'from-blue-600/30 to-cyan-800/30',
  'from-emerald-600/30 to-teal-800/30',
  'from-amber-600/30 to-orange-800/30',
  'from-rose-600/30 to-pink-800/30',
  'from-fuchsia-600/30 to-purple-800/30',
];

const projects = [
  {
    id: 1,
    title: 'Serenity',
    category: 'AI & ML',
    description: 'An AI-powered personal assistant focused on supportive mental-health experiences.',
    longDescription:
      'Serenity leverages Google Gemini API and Python Flask to deliver compassionate, real-time conversational support. Features dynamic mood tracking, empathetic prompt engineering, and structured log persistence.',
    highlights: [
      'Empathetic AI conversation design using Gemini API',
      'Flask backend with SQLAlchemy ORM state persistence',
      'Calming, modern responsive UI design system',
    ],
    tags: ['Python Flask', 'Gemini API', 'SQLAlchemy'],
    github: 'https://github.com/13507-IN/Serenity',
    demo: '#',
    image: SerenityImage,
    alt: 'Serenity AI Assistant Preview',
  },
  {
    id: 4,
    title: 'InceptIQ',
    category: 'AI & ML',
    description: 'An AI startup-idea validator comparing concepts with existing market signals.',
    longDescription:
      'InceptIQ evaluates startup proposals against market data, existing competitors, and search signals. Built with Next.js and AI APIs to generate structured feasibility scores.',
    highlights: [
      'Real-time market comparison engine',
      'Structured PDF analysis report generation',
      'Next.js 14 App Router & Framer Motion UI',
    ],
    tags: ['AI', 'Next.js', 'Full Stack'],
    github: 'https://github.com/13507-IN/InceptIQ',
    demo: 'https://incept-iq.vercel.app/',
    image: InceptIQImage,
    alt: 'InceptIQ idea validator preview',
  },
  {
    id: 5,
    title: 'Mimic',
    category: 'AI & ML',
    description: 'An AI chatbot experiment built around behavior-aware interactions and responses.',
    longDescription:
      'Mimic explores adaptive persona modeling and dynamic tone adjustments based on user input sentiment. Deployed on Vercel with streaming response support.',
    highlights: [
      'Behavior-aware tone customization',
      'Fast streaming API response delivery',
      'Sleek dark-mode glassmorphic interface',
    ],
    tags: ['AI', 'Next.js', 'Chatbot'],
    github: 'https://github.com/13507-IN/Mimic',
    demo: 'https://mimic-eta.vercel.app/',
    image: MimicImage,
    alt: 'Mimic chatbot preview',
  },
  {
    id: 2,
    title: 'TaskMaster',
    category: 'Full Stack / Web',
    description: 'A sleek to-do app with a cleaner workflow and practical productivity features.',
    longDescription:
      'TaskMaster prioritizes minimal friction, keyboard shortcuts, task categorization, and local state persistence for rapid daily task management.',
    highlights: [
      'Fast local-first state synchronization',
      'Custom drag-and-drop category organizing',
      'Clean typography and fluid micro-animations',
    ],
    tags: ['JavaScript', 'Productivity', 'UI'],
    github: 'https://github.com/13507-IN/TaskMaster',
    demo: '#',
    image: ToDoImage,
    alt: 'TaskMaster app preview',
  },
  {
    id: 3,
    title: 'FinMate',
    category: 'Full Stack / Web',
    description: 'A personal finance app for tracking expenses and savings with visual insights.',
    longDescription:
      'FinMate offers full-stack personal budget tracking with relational MySQL database storage, expense categorization, and spending analytics.',
    highlights: [
      'Relational MySQL schema for transactions',
      'Monthly budget & category analytics',
      'PHP server-side session authentication',
    ],
    tags: ['PHP', 'MySQL', 'Full Stack'],
    github: 'https://github.com/13507-IN/FinMate',
    demo: '#',
    image: FinMateImage,
    alt: 'FinMate finance management app preview',
  },
  {
    id: 6,
    title: 'Clip',
    category: 'Systems & Backend',
    description: 'A high-performance URL shortener built in Rust focused on speed and minimalism.',
    longDescription:
      'Clip is a blazingly fast backend URL shortening service written in Rust. Features low latency route resolution, memory efficiency, and clean key hashing.',
    highlights: [
      'Ultra-fast key encoding algorithm in Rust',
      'Minimal memory overhead and high throughput',
      'RESTful backend API endpoint structure',
    ],
    tags: ['Rust', 'Backend', 'Systems'],
    github: 'https://github.com/13507-IN/Clip',
    demo: '#',
    image: null,
    alt: 'Clip preview',
  },
  {
    id: 7,
    title: 'Barcelona',
    category: 'Full Stack / Web',
    description: 'A dedicated web application around football match analytics and club stats.',
    longDescription:
      'Barcelona web app brings together match fixtures, squad stats, and interactive team visualizations with a modern responsive frontend.',
    highlights: [
      'Live stats display & fixture schedules',
      'Custom football pitch tactical view',
      'Deployed on Vercel with responsive layout',
    ],
    tags: ['Python', 'Web', 'Vercel'],
    github: 'https://github.com/13507-IN/Barcelona',
    demo: 'https://barcalona.vercel.app',
    image: null,
    alt: 'Barcelona preview',
  },
  {
    id: 8,
    title: 'AutoClass-AI',
    category: 'AI & ML',
    description: 'An AI-assisted classification tool built with a JavaScript-driven workflow.',
    longDescription:
      'AutoClass-AI automatically categorizes data records using lightweight classification patterns and interactive preview tables.',
    highlights: [
      'Automated text & category labeling',
      'Interactive preview & manual override',
      'Modular JS helper architecture',
    ],
    tags: ['JavaScript', 'AI', 'Automation'],
    github: 'https://github.com/13507-IN/AutoClass-AI',
    demo: '#',
    image: null,
    alt: 'AutoClass AI preview',
  },
  {
    id: 9,
    title: 'MediOps',
    category: 'Systems & Backend',
    description: 'A healthcare-focused project centered on practical operational workflow support.',
    longDescription:
      'MediOps structures hospital operation queues, patient intake tracking, and inventory status updates for operational efficiency.',
    highlights: [
      'Role-based workflow tracking',
      'Resource & inventory status overview',
      'Clean tabular management UI',
    ],
    tags: ['Project', 'Operations', 'Backend'],
    github: 'https://github.com/13507-IN/MediOps',
    demo: 'https://medi-ops-ten.vercel.app/',
    image: MediOpsImage,
    alt: 'MediOps preview',
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-shell relative overflow-hidden bg-background">
      <div className="page-width mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="section-kicker">Selected work</p>
          <h2 className="section-heading text-foreground">
            Projects that turn ideas into reality.
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface/80 p-1.5 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-muted hover:text-foreground hover:bg-surface-2'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="page-width">
        <Motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <Motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onInspect={() => setSelectedProject(project)}
                />
              </Motion.div>
            ))}
          </AnimatePresence>
        </Motion.div>
      </div>

      {/* Detail Modal Dialog */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

function ProjectCard({ project, index, onInspect }) {
  const gradientClass = gradients[index % gradients.length];
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpotlight({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
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
      onClick={onInspect}
      className="glass-glow-card group cursor-pointer relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface/90 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-md flex flex-col h-full"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(99, 102, 241, 0.18), transparent 60%)`,
        }}
      />

      {/* Card Header Media / Dynamic Visual */}
      <div className="relative h-56 w-full overflow-hidden bg-surface-3">
        {project.image ? (
          <img
            src={project.image}
            alt={project.alt}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
            {/* Tech Pattern Grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
            <span className="select-none text-4xl font-extrabold tracking-tighter text-foreground/15 sm:text-5xl group-hover:scale-110 transition-transform duration-500">
              {project.title}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

        <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
          <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            {project.category}
          </span>
        </div>

        <div className="absolute right-4 top-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center gap-1 rounded-full border border-white/30 bg-primary/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            Details <ArrowUpRight size={13} />
          </span>
        </div>

        <div className="absolute left-5 bottom-4 z-20">
          <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-primary-light transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Card Content Footer */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <p className="text-sm leading-relaxed text-muted line-clamp-2">
          {project.description}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-border/60">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted-2"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-muted transition-colors hover:border-primary hover:text-primary"
                aria-label="View code"
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-muted transition-colors hover:border-primary hover:text-primary"
                aria-label="View live demo"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
