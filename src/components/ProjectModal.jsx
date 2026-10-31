import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  X,
  Sparkles,
  Code,
  CheckCircle2,
  Layers,
  Play,
  Lightbulb,
  Brain,
  Compass,
  Video,
} from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'specs' | 'video'

  useEffect(() => {
    if (!project) return undefined;

    // Reset to story tab when project opens
    setActiveTab(project.story ? 'story' : 'specs');

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasStory = Boolean(project.story && (project.story.why || project.story.thoughtProcess));
  const videoUrl = project.video || project.demoVideo || project.story?.videoUrl;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <Motion.div
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <Motion.div
          className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-border/80 bg-surface/98 text-foreground shadow-2xl backdrop-blur-2xl my-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header Visual Hero */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-surface-3">
            {project.image ? (
              <img
                src={project.image}
                alt={project.alt || project.title}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
                  project.gradientClass || 'from-violet-600/40 to-indigo-900/40'
                } relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_70%)]" />
                <span className="select-none text-4xl font-extrabold tracking-tighter text-foreground/15 sm:text-7xl">
                  {project.title}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur-md transition-colors hover:bg-slate-950/80"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="absolute left-5 bottom-4 right-5 z-10 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/20 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md mb-1.5">
                  <Sparkles size={12} /> {project.category || 'Project'}
                </span>
                <h2 id="project-dialog-title" className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                  {project.title}
                </h2>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-2">
                {videoUrl && (
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-all ${
                      activeTab === 'video'
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                    }`}
                  >
                    <Play size={13} className="fill-current" /> Watch Demo
                  </button>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
                  >
                    <Github size={14} /> Code
                  </a>
                )}
                {project.demo && project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-light"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-border/70 bg-surface px-6 pt-2">
            {hasStory && (
              <button
                onClick={() => setActiveTab('story')}
                className={`relative flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'story'
                    ? 'text-primary'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <Compass size={15} />
                <span>The Story & Thinking</span>
                {activeTab === 'story' && (
                  <Motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            )}

            <button
              onClick={() => setActiveTab('specs')}
              className={`relative flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'specs'
                  ? 'text-primary'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Code size={15} />
              <span>Specs & Features</span>
              {activeTab === 'specs' && (
                <Motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>

            {videoUrl && (
              <button
                onClick={() => setActiveTab('video')}
                className={`relative flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'video'
                    ? 'text-primary'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <Video size={15} />
                <span>Demo Video</span>
                {activeTab === 'video' && (
                  <Motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[55vh] overflow-y-auto scrollbar-thin">
            {/* TAB 1: THE STORY & THOUGHT PROCESS */}
            {activeTab === 'story' && hasStory && (
              <div className="space-y-6">
                {/* The Spark / Why I Built This */}
                {project.story?.why && (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                      <Lightbulb size={16} />
                      Why I Built This (The Spark & Problem)
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
                      {project.story.why}
                    </p>
                  </div>
                )}

                {/* The Engineering Thought Process */}
                {project.story?.thoughtProcess && (
                  <div className="rounded-2xl border border-border/70 bg-surface-2/60 p-5">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-2 mb-2.5">
                      <Brain size={16} className="text-primary" />
                      Engineering Thought Process & Decisions
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-muted font-normal whitespace-pre-line">
                      {project.story.thoughtProcess}
                    </p>
                  </div>
                )}

                {/* What I Learned */}
                {project.story?.learnings && (
                  <div className="rounded-2xl border border-border/70 bg-surface-2/60 p-5">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-2 mb-2.5">
                      <Compass size={16} className="text-emerald-400" />
                      Key Takeaway & What I Learned
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-muted font-normal">
                      {project.story.learnings}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SPECS & FEATURES */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-2 mb-2">
                    Project Overview
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-muted font-normal">
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
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
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
                      <Layers size={14} className="text-primary" /> Key Highlights & Implementation Details
                    </h3>
                    <ul className="grid gap-2.5 sm:grid-cols-2">
                      {project.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                          <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: DEMO VIDEO */}
            {activeTab === 'video' && videoUrl && (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-border/80 bg-slate-950 shadow-inner">
                  {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={videoUrl.replace('watch?v=', 'embed/')}
                        title={`${project.title} Demo Video`}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : videoUrl.includes('loom.com') ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={videoUrl.replace('/share/', '/embed/')}
                        title={`${project.title} Loom Walkthrough`}
                        className="h-full w-full border-0"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-sm text-muted mb-4">
                        Video walkthrough available at external link:
                      </p>
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-light"
                      >
                        <Play size={16} className="fill-current" /> Open Video in New Tab
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
}
