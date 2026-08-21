import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ExternalLink, Github, X, Sparkles, Code, CheckCircle2, Layers } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <Motion.div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <Motion.div
          className="relative w-full max-w-3xl overflow-hidden rounded-[2.25rem] border border-border/80 bg-surface/96 text-foreground shadow-2xl backdrop-blur-2xl my-auto"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header Image / Graphic Header */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-surface-3">
            {project.image ? (
              <img
                src={project.image}
                alt={project.alt}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
                  project.gradientClass || 'from-violet-600/40 to-indigo-900/40'
                } relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_70%)]" />
                <span className="select-none text-5xl font-extrabold tracking-tighter text-foreground/15 sm:text-7xl">
                  {project.title}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/40 text-white backdrop-blur-md transition-colors hover:bg-slate-950/70"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="absolute left-6 bottom-6 right-6 z-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md mb-2">
                  <Sparkles size={12} /> Detailed Overview
                </span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                  {project.title}
                </h2>
              </div>

              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
                  >
                    <Github size={16} /> Code
                  </a>
                )}
                {project.demo && project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-light"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto scrollbar-thin">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-2 mb-2">
                Project Summary
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-muted font-normal">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-2 mb-3 flex items-center gap-2">
                <Code size={14} className="text-primary" /> Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-2 mb-3 flex items-center gap-2">
                  <Layers size={14} className="text-primary" /> Key Highlights & Features
                </h3>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {project.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
}
