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
  Target,
  BookOpen,
  Rocket,
  Lock,
  Video,
  Globe,
} from 'lucide-react';

function getDomain(url) {
  if (!url || url === '#') return null;
  try {
    return new URL(url).hostname;
  } catch {
    return url.replace(/^https?:\/\//, '').split('/')[0];
  }
}

function renderStructuredThoughtProcess(text) {
  if (!text) return null;

  const hasBullets = text.includes('•') || text.includes('  Multi-Tier');

  if (hasBullets) {
    const parts = text.split('\n\n').filter(Boolean);
    const intro = !parts[0].trim().startsWith('•') && !parts[0].includes('Multi-Tier') ? parts[0] : null;
    const bulletItems = intro ? parts.slice(1) : parts;

    return (
      <div className="space-y-3">
        {intro && (
          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal mb-3">
            {intro}
          </p>
        )}
        <div className="grid gap-3">
          {bulletItems.map((item, idx) => {
            const cleanText = item.replace(/^[•\s-]+/, '').trim();
            const colonIndex = cleanText.indexOf(':');
            const title = colonIndex !== -1 ? cleanText.substring(0, colonIndex).trim() : null;
            const body = colonIndex !== -1 ? cleanText.substring(colonIndex + 1).trim() : cleanText;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-border/70 bg-surface/80 p-4 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40"
              >
                {title ? (
                  <>
                    <h4 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground mb-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      {title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed pl-4">
                      {body}
                    </p>
                  </>
                ) : (
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                    {cleanText}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Clean paragraph rendering
  return (
    <div className="space-y-3">
      {text.split('\n\n').filter(Boolean).map((para, idx) => (
        <p key={idx} className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
          {para}
        </p>
      ))}
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'specs' | 'video'

  useEffect(() => {
    if (!project) return undefined;

    // Reset to story tab when project opens if available, otherwise specs
    setActiveTab(project.story ? 'story' : 'specs');

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Stop Lenis while modal is open to enable native container scrolling
    window.__lenis?.stop();

    closeButtonRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      window.removeEventListener('keydown', handleEscape);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasStory = Boolean(project.story && (project.story.why || project.story.thoughtProcess));
  const videoUrl = project.video || project.demoVideo || project.story?.videoUrl;
  const domain = getDomain(project.demo);
  const isFounderProject = project.id === 'campuskart';

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
      >
        {/* Backdrop */}
        <Motion.div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <Motion.div
          data-lenis-prevent="true"
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[2rem] border border-border/80 bg-surface text-foreground shadow-2xl backdrop-blur-2xl overflow-hidden my-auto z-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute right-4 top-4 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border/80 bg-surface/85 text-foreground shadow-lg backdrop-blur-xl transition-all duration-200 hover:bg-surface hover:scale-105 active:scale-95"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          {/* Top Visual Banner */}
          {project.image ? (
            <div className="relative h-48 sm:h-64 w-full shrink-0 overflow-hidden bg-surface-3 group">
              <img
                src={project.image}
                alt={project.alt || project.title}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            /* Bespoke Interactive Mockup Header for projects without image (like CampusKart) */
            <div className="relative w-full shrink-0 overflow-hidden bg-gradient-to-br from-violet-950/80 via-slate-900 to-indigo-950/70 p-5 sm:p-7 border-b border-border/60">
              {/* Glowing Background Orbs */}
              <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-violet-500/25 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:18px_18px] opacity-40 pointer-events-none" />

              {/* Browser Mockup Window */}
              <div className="relative mx-auto max-w-xl rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
                {/* Browser Traffic Lights & URL Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  {domain && (
                    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-slate-300">
                      <Lock size={10} className="text-emerald-400" />
                      <span>{domain}</span>
                    </div>
                  )}
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Product
                  </span>
                </div>

                {/* Inside Showcase Card */}
                <div className="rounded-xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-4 sm:p-5 text-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-xs font-semibold text-primary-light mb-2.5">
                    <Rocket size={13} /> {isFounderProject ? 'Founder & Lead Engineer' : 'Full Stack Product'}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-md mx-auto line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Project Identity & Action Bar */}
          <div className="px-6 py-4 sm:px-8 border-b border-border/60 bg-surface/90 shrink-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Sparkles size={11} /> {project.category || 'Project'}
                  </span>
                  {isFounderProject && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Marketplace
                    </span>
                  )}
                  {domain && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-2">
                      <Globe size={12} /> {domain}
                    </span>
                  )}
                </div>
                <h2 id="project-dialog-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {project.title}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {videoUrl && (
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                      activeTab === 'video'
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                    }`}
                  >
                    <Play size={14} className="fill-current" /> Watch Demo
                  </button>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface-2/80 px-4 py-2 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:text-primary hover:-translate-y-0.5"
                  >
                    <Github size={15} /> Source Code
                  </a>
                )}
                {project.demo && project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:shadow-primary/40 transition-all hover:bg-primary-light hover:-translate-y-0.5"
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Tab Navigation */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/70 bg-surface/95 px-6 py-2.5 backdrop-blur-xl sm:px-8 shrink-0">
            <div className="inline-flex items-center gap-1 rounded-2xl border border-border/70 bg-surface-2/70 p-1">
              {hasStory && (
                <button
                  onClick={() => setActiveTab('story')}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'story'
                      ? 'bg-surface text-foreground shadow-sm border border-border/60'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  <BookOpen size={14} className={activeTab === 'story' ? 'text-primary' : ''} />
                  <span>The Story & Thinking</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('specs')}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'specs'
                    ? 'bg-surface text-foreground shadow-sm border border-border/60'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <Layers size={14} className={activeTab === 'specs' ? 'text-primary' : ''} />
                <span>Specs & Features</span>
              </button>

              {videoUrl && (
                <button
                  onClick={() => setActiveTab('video')}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'video'
                      ? 'bg-surface text-foreground shadow-sm border border-border/60'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  <Video size={14} className={activeTab === 'video' ? 'text-primary' : ''} />
                  <span>Demo Video</span>
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Modal Body */}
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-thin overscroll-contain"
          >
            {/* TAB 1: THE STORY & THOUGHT PROCESS */}
            {activeTab === 'story' && hasStory && (
              <div className="space-y-6">
                {/* The Spark / Why I Built This */}
                {project.story?.why && (
                  <div className="group rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.07] via-surface-2/30 to-surface p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-amber-500/40">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/15 text-amber-500 shadow-sm">
                        <Lightbulb size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-amber-500">
                          The Origin & Problem
                        </p>
                        <h3 className="text-lg font-bold text-foreground">
                          Why I Built This
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
                      {project.story.why}
                    </p>
                  </div>
                )}

                {/* The Engineering Thought Process */}
                {project.story?.thoughtProcess && (
                  <div className="group rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] via-surface-2/30 to-surface p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-primary/40">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary shadow-sm">
                        <Brain size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                          Engineering Architecture
                        </p>
                        <h3 className="text-lg font-bold text-foreground">
                          Thought Process & Technical Decisions
                        </h3>
                      </div>
                    </div>

                    {renderStructuredThoughtProcess(project.story.thoughtProcess)}
                  </div>
                )}

                {/* What I Learned */}
                {project.story?.learnings && (
                  <div className="group rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.07] via-surface-2/30 to-surface p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-emerald-500/40">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 shadow-sm">
                        <Target size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                          Growth & Reflection
                        </p>
                        <h3 className="text-lg font-bold text-foreground">
                          Key Takeaway & What I Learned
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
                      {project.story.learnings}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SPECS & FEATURES */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                {/* Overview Card */}
                <div className="rounded-3xl border border-border/80 bg-surface-2/40 p-6 sm:p-7 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-2 mb-2.5">
                    Project Overview
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="rounded-3xl border border-border/80 bg-surface-2/40 p-6 sm:p-7 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-2 mb-3.5 flex items-center gap-2">
                    <Code size={15} className="text-primary" /> Technologies & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="rounded-3xl border border-border/80 bg-surface-2/40 p-6 sm:p-7 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-2 mb-3.5 flex items-center gap-2">
                      <Layers size={15} className="text-primary" /> Key Highlights & Implementation Details
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.highlights.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-2xl border border-border/70 bg-surface/80 p-3.5 shadow-sm"
                        >
                          <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: DEMO VIDEO */}
            {activeTab === 'video' && videoUrl && (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-3xl border border-border/80 bg-slate-950 shadow-inner">
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
                    <div className="p-8 text-center">
                      <p className="text-sm text-muted mb-4">
                        Video walkthrough available at external link:
                      </p>
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-light"
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
