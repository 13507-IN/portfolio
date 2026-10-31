import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  X,
  Sparkles,
  Code2,
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

function parseThoughtProcess(text) {
  if (!text) return { intro: null, items: [] };

  const lines = text.split('\n\n').filter(Boolean);

  // If text contains bullet points (•)
  if (text.includes('•')) {
    const intro = !lines[0].trim().startsWith('•') ? lines[0].trim() : null;
    const bulletLines = intro ? lines.slice(1) : lines;

    const items = bulletLines.map((line) => {
      const clean = line.replace(/^[•\s-]+/, '').trim();
      const colonIdx = clean.indexOf(':');
      if (colonIdx !== -1) {
        return {
          title: clean.substring(0, colonIdx).trim(),
          body: clean.substring(colonIdx + 1).trim(),
        };
      }
      return { title: null, body: clean };
    });

    return { intro, items };
  }

  // If text contains colon-separated items (like Rishiraj Auth)
  if (lines.length > 1 && lines[1].includes(':')) {
    const intro = !lines[0].includes(':') ? lines[0].trim() : null;
    const itemLines = intro ? lines.slice(1) : lines;

    const items = itemLines.map((line) => {
      const clean = line.trim();
      const colonIdx = clean.indexOf(':');
      if (colonIdx !== -1) {
        return {
          title: clean.substring(0, colonIdx).trim(),
          body: clean.substring(colonIdx + 1).trim(),
        };
      }
      return { title: null, body: clean };
    });

    return { intro, items };
  }

  // Fallback: standard paragraphs
  return {
    intro: null,
    items: lines.map((para) => ({ title: null, body: para.trim() })),
  };
}

export default function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'specs' | 'video'

  useEffect(() => {
    if (!project) return undefined;

    setActiveTab(project.story ? 'story' : 'specs');

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Pause Lenis while modal is open so inner container scrolls natively
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
  const isFounderProject =
    project.id === 'campuskart' ||
    (project.title && project.title.toLowerCase().includes('campus'));

  const { intro: thoughtIntro, items: thoughtItems } = parseThoughtProcess(
    project.story?.thoughtProcess
  );

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden"
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
          className="relative w-full max-w-5xl h-[92vh] max-h-[860px] flex flex-col lg:flex-row rounded-[2rem] border border-border/80 bg-surface text-foreground shadow-2xl backdrop-blur-2xl overflow-hidden my-auto z-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Mobile Close Button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="lg:hidden absolute right-3.5 top-3.5 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-foreground shadow-md backdrop-blur-md transition-all hover:bg-surface"
            aria-label="Close dialog"
          >
            <X size={17} />
          </button>

          {/* LEFT SIDEBAR PANEL: Project Identity, Visual Preview, & Quick Actions */}
          <div className="lg:w-[380px] xl:w-[410px] shrink-0 border-b lg:border-b-0 lg:border-r border-border/70 bg-surface-2/30 flex flex-col overflow-y-auto scrollbar-thin">
            {/* Visual Cover / Mockup */}
            <div className="p-5 pb-3">
              {project.image ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-sm group">
                  <img
                    src={project.image}
                    alt={project.alt || project.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                /* Bespoke Browser Mockup for projects without an image (CampusSpace, Clip, etc.) */
                <div className="relative w-full rounded-2xl border border-border/80 bg-gradient-to-br from-violet-950/70 via-slate-900 to-indigo-950/70 p-4 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                      <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                      <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                    </div>
                    {domain ? (
                      <div className="flex items-center gap-1 font-mono text-[10px] text-slate-300">
                        <Lock size={10} className="text-emerald-400" />
                        <span>{domain}</span>
                      </div>
                    ) : (
                      <span className="font-mono text-[10px] text-slate-400">system/api</span>
                    )}
                  </div>
                  <div className="text-center py-2.5">
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary-light mb-1.5">
                      <Rocket size={11} /> {isFounderProject ? 'Founder Project' : 'Live Web App'}
                    </span>
                    <p className="text-lg font-bold text-white tracking-tight">{project.title}</p>
                    <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">{project.description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Title, Badge & Subtitle */}
            <div className="px-5 pb-4">
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  <Sparkles size={11} /> {project.category || 'Project'}
                </span>
                {isFounderProject && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Marketplace
                  </span>
                )}
                {domain && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-2">
                    <Globe size={11} /> {domain}
                  </span>
                )}
              </div>

              <h2 id="project-dialog-title" className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {project.title}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Primary Action Buttons (Pinned to Left Sidebar) */}
            <div className="px-5 pb-5 flex flex-wrap gap-2">
              {project.demo && project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-slide-fill flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:shadow-primary/40 transition-all hover:bg-primary-light"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:text-primary"
                >
                  <Github size={14} /> Source Code
                </a>
              )}
            </div>

            {/* Sidebar Details: Tech Stack */}
            <div className="hidden lg:block px-5 py-4 border-t border-border/60">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-2 mb-2.5 flex items-center gap-1.5">
                <Code2 size={12} className="text-primary" /> Technologies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar Details: Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="hidden lg:block px-5 py-4 border-t border-border/60">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-2 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-400" /> Key Highlights
                </p>
                <div className="space-y-2">
                  {project.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT MAIN PANEL: Dedicated Full-Height Reading Pane */}
          <div className="flex-1 flex flex-col overflow-hidden bg-surface">
            {/* Top Navigation Bar with Tabs & Desktop Close Button */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/70 bg-surface/95 px-5 py-3 backdrop-blur-xl sm:px-8 shrink-0">
              {/* Segmented Tab Switcher */}
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
                    <span>The Story & Decisions</span>
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
                  <span>Specs & Details</span>
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

              {/* Desktop Close Button */}
              <button
                onClick={onClose}
                className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-surface text-muted hover:text-foreground transition-all hover:bg-surface-2"
                aria-label="Close dialog"
              >
                <X size={17} />
              </button>
            </div>

            {/* Scrollable Reading Content Body */}
            <div
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-8 scrollbar-thin overscroll-contain"
            >
              {/* TAB 1: THE STORY & ARCHITECTURAL DECISIONS */}
              {activeTab === 'story' && hasStory && (
                <div className="space-y-8 max-w-2xl">
                  {/* Section 1: The Spark & Problem */}
                  {project.story?.why && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500">
                          <Lightbulb size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                            The Origin & Problem
                          </p>
                          <h3 className="text-base sm:text-lg font-bold text-foreground">
                            Why this project needed to exist
                          </h3>
                        </div>
                      </div>

                      <div className="border-l-2 border-amber-500/40 pl-4 py-0.5">
                        <p className="text-[15px] sm:text-base leading-[1.8] text-foreground/90 font-normal">
                          {project.story.why}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Section 2: Architectural Decisions */}
                  {project.story?.thoughtProcess && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                          <Brain size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                            Engineering Architecture
                          </p>
                          <h3 className="text-base sm:text-lg font-bold text-foreground">
                            Thought Process & Technical Decisions
                          </h3>
                        </div>
                      </div>

                      {/* Lead intro sentence */}
                      {thoughtIntro && (
                        <p className="text-[15px] sm:text-base text-foreground/90 leading-relaxed font-medium">
                          {thoughtIntro}
                        </p>
                      )}

                      {/* Numbered Pillars / Clean Cards */}
                      <div className="space-y-3.5">
                        {thoughtItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl border border-border/80 bg-surface-2/40 p-5 transition-all hover:border-primary/40 hover:bg-surface-2/60"
                          >
                            <div className="flex items-center gap-2.5 mb-2">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/15 font-mono text-xs font-bold text-primary">
                                0{idx + 1}
                              </span>
                              <h4 className="text-sm sm:text-base font-bold text-foreground">
                                {item.title || `Technical Decision 0${idx + 1}`}
                              </h4>
                            </div>
                            <p className="text-sm sm:text-[15px] text-muted leading-relaxed pl-8.5 font-normal">
                              {item.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section 3: Growth & Learnings */}
                  {project.story?.learnings && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                          <Target size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                            Growth & Reflection
                          </p>
                          <h3 className="text-base sm:text-lg font-bold text-foreground">
                            Key Takeaway & What I Learned
                          </h3>
                        </div>
                      </div>

                      <div className="border-l-2 border-emerald-500/40 pl-4 py-0.5">
                        <p className="text-[15px] sm:text-base leading-[1.8] text-foreground/90 font-normal">
                          {project.story.learnings}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SPECS & FEATURES */}
              {activeTab === 'specs' && (
                <div className="space-y-8 max-w-2xl">
                  {/* Detailed Overview */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-2">
                      Project Overview
                    </p>
                    <p className="text-[15px] sm:text-base leading-[1.8] text-foreground/90 font-normal">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Technical Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-3.5">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-2 flex items-center gap-1.5">
                        <Layers size={14} className="text-primary" /> Key Implementation Details
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.highlights.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 rounded-2xl border border-border/80 bg-surface-2/40 p-4 transition-colors hover:border-primary/40"
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

                  {/* Full Tech Stack */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-2 flex items-center gap-1.5">
                      <Code2 size={14} className="text-primary" /> Technologies Used
                    </p>
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
                </div>
              )}

              {/* TAB 3: DEMO VIDEO */}
              {activeTab === 'video' && videoUrl && (
                <div className="space-y-4 max-w-2xl">
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
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
}
