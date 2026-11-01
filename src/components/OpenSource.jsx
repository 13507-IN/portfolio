import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  GitPullRequest,
  GitMerge,
  Code2,
  Terminal,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const categories = ['All', 'Merged PRs', 'Libraries & Tools'];

const contributions = [
  {
    id: 'kana-dojo',
    title: 'lingdojo / kana-dojo',
    type: 'Merged PR',
    category: 'Merged PRs',
    badgeClass: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    icon: GitMerge,
    description:
      'Submitted merged pull request #31809 enhancing user interface rendering and state persistence on the interactive Japanese kana learning platform.',
    prNumber: '#31809',
    role: 'Contributor',
    tags: ['TypeScript', 'React', 'CSS'],
    github: 'https://github.com/lingdojo/kana-dojo/pull/31809',
    repoUrl: 'https://github.com/lingdojo/kana-dojo',
    highlight: 'Merged into main',
  },
  {
    id: 'rishiraj-auth',
    title: '13507-IN / Rishiraj-Auth',
    type: 'Library & Tool',
    category: 'Libraries & Tools',
    badgeClass: 'border-primary/30 bg-primary/10 text-primary',
    icon: Terminal,
    description:
      'A production-grade, zero-vendor-lockin authentication engine featuring multi-tier RBAC, dual-token access/refresh rotation, and native Google OAuth middleware.',
    role: 'Creator & Maintainer',
    tags: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'JWT'],
    github: 'https://github.com/13507-IN/Rishiraj-Auth',
    repoUrl: 'https://github.com/13507-IN/Rishiraj-Auth',
    highlight: 'Modular Identity Engine',
  },
  {
    id: 'clip',
    title: '13507-IN / Clip',
    type: 'Library & Tool',
    category: 'Libraries & Tools',
    badgeClass: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    icon: Code2,
    description:
      'High-performance systems microservice in Rust with Axum and SQLx. Achieves sub-2ms redirect resolution and analytics tracking with in-memory caching.',
    role: 'Creator & Maintainer',
    tags: ['Rust', 'Axum', 'SQLx', 'PostgreSQL', 'Systems'],
    github: 'https://github.com/13507-IN/Clip',
    repoUrl: 'https://github.com/13507-IN/Clip',
    highlight: 'Sub-2ms Latency',
  },
  {
    id: 'fitaura',
    title: '13507-IN / FitAura',
    type: 'Library & Tool',
    category: 'Libraries & Tools',
    badgeClass: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    icon: Sparkles,
    description:
      'Open-source AI-assisted styling and grooming recommendation engine with Next.js and Google Gemini API structured JSON inference.',
    role: 'Creator & Maintainer',
    tags: ['Next.js', 'TypeScript', 'Gemini API', 'Tailwind CSS'],
    github: 'https://github.com/13507-IN/FitAura',
    repoUrl: 'https://github.com/13507-IN/FitAura',
    highlight: 'AI Full-Stack App',
  },
  {
    id: 'gowavy',
    title: '13507-IN / GoWavy',
    type: 'Library & Tool',
    category: 'Libraries & Tools',
    badgeClass: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    icon: Code2,
    description:
      'Lightweight SVG wave shape and dynamic fluid gradient generator built for modern web interfaces and frontend developers.',
    role: 'Creator & Maintainer',
    tags: ['TypeScript', 'SVG', 'Canvas'],
    github: 'https://github.com/13507-IN/GoWavy',
    repoUrl: 'https://github.com/13507-IN/GoWavy',
    highlight: 'Developer Tooling',
  },
  {
    id: 'yew',
    title: 'yewstack / yew',
    type: 'Community PR',
    category: 'Merged PRs',
    badgeClass: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    icon: GitPullRequest,
    description:
      'Participated in community discussions and issue tracking for Yew, the modern Rust framework for compiling multi-threaded web applications using WebAssembly.',
    role: 'Contributor & Triage',
    tags: ['Rust', 'WebAssembly', 'Wasm'],
    github: 'https://github.com/yewstack/yew',
    repoUrl: 'https://github.com/yewstack/yew',
    highlight: 'Wasm Ecosystem',
  },
];

export default function OpenSource() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredContributions =
    activeCategory === 'All'
      ? contributions
      : contributions.filter((c) => c.category === activeCategory);

  return (
    <section id="opensource" className="section-shell relative overflow-hidden bg-surface-2/50">
      <div className="page-width mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="section-kicker">Open Source</p>
          <h2 className="section-heading text-foreground">
            Building in public & contributing to the ecosystem.
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface/80 p-1.5 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="page-width">
        <Motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredContributions.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <Motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="glass-glow-card group flex flex-col justify-between rounded-[1.75rem] border border-border/80 bg-surface/85 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${item.badgeClass}`}
                      >
                        <IconComponent size={12} /> {item.type}
                      </span>

                      <span className="text-[11px] font-mono text-muted-2 flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        {item.highlight}
                      </span>
                    </div>

                    {/* Repo Title */}
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/title flex items-center justify-between gap-2 text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary mb-2.5"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Github size={17} className="text-primary shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </span>
                      <ExternalLink
                        size={15}
                        className="text-muted-2 shrink-0 transition-transform group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:text-primary"
                      />
                    </a>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60 mb-3.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-muted-2 font-medium">Role: {item.role}</span>
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                      >
                        Repository <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </AnimatePresence>
        </Motion.div>

        {/* GitHub Callout Footer */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-3xl border border-border/80 bg-surface/70 p-5 sm:p-6 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-2 text-foreground shrink-0">
              <Github size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                More open-source repositories and experimental code
              </p>
              <p className="text-xs text-muted-2">
                Explore full commit history, branches, and community PRs on GitHub.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/13507-IN"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-slide-fill inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 shrink-0 w-full sm:w-auto"
          >
            <Github size={15} /> Visit GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
