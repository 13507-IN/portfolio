import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Server,
  Shield,
  Database,
  Cpu,
  Sparkles,
  CheckCircle2,
  Mail,
  ArrowUpRight,
  Code2,
  Terminal,
  Zap,
  Lock,
} from 'lucide-react';
import { projects } from './Projects';
import ProjectModal from './ProjectModal';

const BACKEND_TITLES = ['Rishi Auth', 'Clip', 'MediOps'];

const cardGradients = [
  'from-indigo-600/30 via-violet-600/20 to-purple-800/30',
  'from-amber-600/30 via-orange-600/20 to-rose-800/30',
  'from-emerald-600/30 via-teal-600/20 to-cyan-800/30',
];

const capabilities = [
  {
    icon: Shield,
    title: 'Authentication & Security',
    description:
      'Designing robust JWT/OAuth2 flows, RBAC middleware, password hashing with bcrypt, and session security.',
  },
  {
    icon: Zap,
    title: 'High-Performance APIs',
    description:
      'Building ultra-fast backend endpoints using Rust and Node.js with low memory overhead and low latency.',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    description:
      'Designing structured MySQL relational schemas, indexing, and ORM abstractions (SQLAlchemy, Prisma).',
  },
  {
    icon: Server,
    title: 'Microservices & Queues',
    description:
      'Structuring modular RESTful API services, async task queues, and hospital/operational workflows.',
  },
];

export default function BackendShowcase() {
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredBackendProjects = BACKEND_TITLES.map((title) =>
    projects.find((p) => p.title.toLowerCase() === title.toLowerCase())
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/80 backdrop-blur-xl">
        <div className="page-width flex items-center justify-between py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            <span>Full Portfolio</span>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Open to Opportunities
          </div>
        </div>
      </header>

      <main className="page-width pb-24 pt-12 sm:pt-16">
        {/* Hero Section */}
        <section className="relative text-center sm:text-left">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Terminal size={14} />
              Backend Developer Showcase
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Backend Developer —{' '}
              <span className="bg-gradient-to-r from-primary via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Open to Opportunities
              </span>
            </h1>

            <p className="mt-4 text-lg text-muted sm:text-xl leading-relaxed">
              Specialized in crafting secure authentication protocols, resilient API endpoints, and
              high-throughput backend services. Explore 3 featured backend projects below.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105"
              >
                <Server size={16} />
                View 3 Backend Projects
              </a>
              <a
                href="mailto:rishirajnatj@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-surface-3"
              >
                <Mail size={16} />
                Get In Touch
              </a>
              <a
                href="https://github.com/13507-IN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/50 px-4 py-3 text-sm font-medium text-muted transition-all hover:text-foreground hover:border-border"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </Motion.div>

          {/* Quick Info Grid */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { label: 'Core Focus', value: 'Backend & Systems', icon: Server },
              { label: 'Primary Languages', value: 'Node.js, Rust, Python', icon: Code2 },
              { label: 'Databases', value: 'MySQL & Relational', icon: Database },
              { label: 'Status', value: 'Open for Roles', icon: Lock },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <Icon size={18} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                      {stat.label}
                    </span>
                  </div>
                  <p className="mt-2 text-base font-bold text-foreground">{stat.value}</p>
                </div>
              );
            })}
          </Motion.div>
        </section>

        {/* Featured 3 Projects Section */}
        <section id="projects" className="mt-24 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <Sparkles size={14} />
                Hand-Picked Showcase
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                3 Key Backend Projects
              </h2>
            </div>
            <p className="text-sm text-muted max-w-md">
              Highlighting Rishi Auth (Security), Clip (Rust Systems), and MediOps (Operational Backend).
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredBackendProjects.map((project, index) => {
              const gradientClass = cardGradients[index % cardGradients.length];
              return (
                <Motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface/70 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1.5"
                >
                  {/* Card Visual Header */}
                  <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${gradientClass}`}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.alt}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-primary backdrop-blur-md">
                          {project.title === 'Rishi Auth' ? (
                            <Shield size={32} />
                          ) : project.title === 'Clip' ? (
                            <Zap size={32} />
                          ) : (
                            <Server size={32} />
                          )}
                        </div>
                        <span className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                          {project.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    
                    <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      #{index + 1} Backend Project
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span className="rounded-md border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted">
                        {project.category}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-muted line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-4 space-y-1.5">
                      {project.highlights.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted-2">
                          <CheckCircle2 size={13} className="mt-0.5 text-emerald-400 shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/60 bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject({ ...project, gradientClass })}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        View Specifications
                        <ArrowUpRight size={14} />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full p-2 text-muted hover:bg-surface-2 hover:text-foreground transition-colors"
                            title="View GitHub Repository"
                          >
                            <Github size={16} />
                          </a>
                        )}
                        {project.demo && project.demo !== '#' && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full p-2 text-muted hover:bg-surface-2 hover:text-foreground transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </section>

        {/* Backend Engineering Core Competencies */}
        <section className="mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Backend Technical Stack
            </h2>
            <p className="mt-3 text-muted text-sm sm:text-base">
              Core server-side engineering capabilities and standards implemented across my projects.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="flex gap-4 rounded-3xl border border-border/70 bg-surface/60 p-6 backdrop-blur-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{cap.title}</h3>
                    <p className="mt-1 text-sm text-muted leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Footer Banner */}
        <section className="mt-24 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface to-surface-2 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Interested in backend collaboration or hiring?
          </h2>
          <p className="mt-3 text-muted max-w-xl mx-auto text-sm sm:text-base">
            I am open to full-time backend positions, internships, and contract opportunities. Let’s talk!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:rishirajnatj@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              <Mail size={16} />
              Send an Email
            </a>
            <a
              href="https://linkedin.com/in/rishiraj-debnath-890322313"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/50"
            >
              LinkedIn Profile
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground px-4 py-3"
            >
              Back to Full Portfolio
            </Link>
          </div>
        </section>
      </main>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
