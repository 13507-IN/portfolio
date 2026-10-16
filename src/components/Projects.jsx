import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Layers, ArrowUpRight, Filter } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import ToDoImage from '../assets/taskmaster.png';
import FinMateImage from '../assets/FinMate.jpeg';
import InceptIQImage from '../assets/inceptIQ.png';
import ScholarCatalystImage from '../assets/scholarcatalyst.png';
import FunfyImage from '../assets/funfy.png';
import ProjectModal from './ProjectModal';

const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

const gradients = [
  'from-violet-600/30 to-indigo-800/30',
  'from-blue-600/30 to-cyan-800/30',
  'from-emerald-600/30 to-teal-800/30',
  'from-amber-600/30 to-orange-800/30',
  'from-rose-600/30 to-pink-800/30',
  'from-fuchsia-600/30 to-purple-800/30',
];

// Shared with the backend showcase route.
// eslint-disable-next-line react-refresh/only-export-components
export const projects = [
  {
    id: 'campuskart',
    title: 'CampusKart',
    category: 'Full Stack',
    description: 'A student marketplace for campus buying, selling, messaging, and events.',
    longDescription:
      'I founded CampusKart to make student-to-student trading easier within a campus community. The live product brings listings, direct messaging, and an events hub into one place.',
    highlights: [
      'Built around campus-specific listings and student profiles',
      'Messaging and events are part of the live experience',
      'Founder-led product, available to explore online',
    ],
    tags: ['Marketplace', 'Web App', 'Product'],
    github: null,
    demo: 'https://www.campuskart.space/',
    image: null,
    alt: 'CampusKart student marketplace',
  },
  {
    id: 'funfy',
    title: 'Funfy',
    category: 'Frontend',
    description: 'A sticker storefront with an in-browser design studio and PNG export.',
    longDescription:
      'Funfy combines a responsive storefront with a browser-based sticker editor. Visitors can upload artwork, add text and shapes, manage layers, preview a design, and export a transparent PNG. The cart is a local prototype, not a live checkout.',
    highlights: [
      'Fabric.js editor with image, text, shape, and layer tools',
      'Searchable storefront and quick-add sticker packs',
      'Cart persistence with IndexedDB and localStorage fallback',
    ],
    tags: ['Next.js', 'TypeScript', 'Fabric.js'],
    github: 'https://github.com/13507-IN/Funfy',
    demo: 'https://funfy.vercel.app/',
    image: FunfyImage,
    alt: 'Funfy sticker design studio preview',
  },
  {
    id: 'inceptiq',
    title: 'InceptIQ',
    category: 'Full Stack',
    description: 'An AI-assisted startup idea validator with visual analysis and downloadable reports.',
    longDescription:
      'InceptIQ lets users submit a startup idea and receive a structured analysis of originality, competition, market viability, risks, and next steps. A React interface presents the results; a Node and Express API handles AI analysis and PDF reports.',
    highlights: [
      'React dashboard with Recharts visualizations',
      'Express API connected to Google Gemini',
      'Downloadable PDF analysis reports',
    ],
    tags: ['React', 'Node.js', 'Express', 'Gemini'],
    github: 'https://github.com/13507-IN/InceptIQ',
    demo: 'https://incept-iq.vercel.app/',
    image: InceptIQImage,
    alt: 'InceptIQ startup analysis preview',
  },
  {
    id: 'rishiraj-auth',
    title: 'Rishiraj Auth',
    category: 'Backend',
    description: 'An authentication API with roles, refresh tokens, OAuth, and tenant support.',
    longDescription:
      'A Node and Express authentication service with registration, login, email verification, password reset, Google OAuth, role-based access, and tenant-aware API keys. The repository includes setup and endpoint documentation.',
    highlights: [
      'JWT access and refresh token flows',
      'Prisma and PostgreSQL data model with Redis support',
      'Role-based access and tenant-aware API keys',
    ],
    tags: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/13507-IN/Rishiraj-Auth',
    demo: null,
    image: null,
    alt: 'Rishiraj Auth API project',
  },
  {
    id: 'scholarcatalyst',
    title: 'ScholarCatalyst',
    category: 'Full Stack',
    description: 'A scholarship discovery platform with student tools and an admin dashboard.',
    longDescription:
      'ScholarCatalyst brings scholarship search together with student profiles, application tracking, document management, and community pages. The repository contains a React frontend and an Express backend using MongoDB.',
    highlights: [
      'Scholarship search and application tracking pages',
      'Student profile, document vault, and deadline calendar',
      'React frontend with Express and MongoDB backend',
    ],
    tags: ['React', 'Express', 'MongoDB'],
    github: 'https://github.com/13507-IN/ScholarCatalyst',
    demo: 'https://scholar-catalyst.vercel.app/',
    image: ScholarCatalystImage,
    alt: 'ScholarCatalyst scholarship platform preview',
  },
  {
    id: 'finmate',
    title: 'FinMate',
    category: 'Full Stack',
    description: 'A personal finance app for transactions, budgets, savings goals, and reports.',
    longDescription:
      'FinMate is a PHP and MySQL finance application. Users can track income and expenses, set category budgets and savings goals, filter by date, and explore charts and exportable reports.',
    highlights: [
      'Account login and transaction management',
      'Category budgets, savings goals, and charts',
      'Responsive interface with exportable reports',
    ],
    tags: ['PHP', 'MySQL', 'Bootstrap', 'Chart.js'],
    github: 'https://github.com/13507-IN/FinMate',
    demo: null,
    image: FinMateImage,
    alt: 'FinMate finance dashboard preview',
  },
  {
    id: 'taskmaster',
    title: 'TaskMaster',
    category: 'Frontend',
    description: 'A small, responsive task manager built with plain JavaScript.',
    longDescription:
      'TaskMaster is a focused task manager built with HTML, CSS, and JavaScript. It demonstrates practical DOM work and a clean interface without a framework.',
    highlights: [
      'Framework-free JavaScript interface',
      'Responsive layout for everyday task management',
      'Live demo and public source',
    ],
    tags: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/13507-IN/TaskMaster',
    demo: 'https://task-master-six-tau.vercel.app/',
    image: ToDoImage,
    alt: 'TaskMaster to-do app preview',
  },
  {
    id: 'clip',
    title: 'Clip',
    category: 'Backend',
    description: 'A Rust URL shortener API with PostgreSQL storage and redirect tracking.',
    longDescription:
      'Clip is a URL shortener written in Rust with Axum. It exposes routes to create short links, resolve redirects, and read link statistics, with PostgreSQL storage and a small in-memory cache.',
    highlights: [
      'Axum routes for shortening, redirects, and stats',
      'PostgreSQL persistence through SQLx',
      'In-memory cache for link lookups',
    ],
    tags: ['Rust', 'Axum', 'PostgreSQL'],
    github: 'https://github.com/13507-IN/Clip',
    demo: null,
    image: null,
    alt: 'Clip URL shortener API',
  },
  {
    id: 'barcelona',
    title: 'Barcelona',
    category: 'Full Stack',
    description: 'A football site bringing match information and squad data into one interface.',
    longDescription:
      'A club-focused web application that presents match and squad information through a responsive interface, backed by Python data gathering.',
    highlights: [
      'Match and squad information in one place',
      'Responsive frontend',
      'Public repository and live deployment',
    ],
    tags: ['Python', 'JavaScript', 'Web'],
    github: 'https://github.com/13507-IN/Barcelona',
    demo: 'https://barcalona.vercel.app',
    image: null,
    alt: 'Barcelona football site',
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
            Web products, from interface to API.
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
      className="glass-glow-card group relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface/90 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-md flex flex-col h-full"
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
        <button
          type="button"
          onClick={onInspect}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
          aria-label={`View details for ${project.title}`}
        >
          View details <ArrowUpRight size={15} />
        </button>

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

          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-muted transition-colors hover:border-primary hover:text-primary"
                aria-label={`View ${project.title} source code`}
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
                aria-label={`View ${project.title} live site`}
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
