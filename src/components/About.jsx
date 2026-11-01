import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Rocket, GraduationCap, Check, Copy, Terminal, Sparkles, BookOpen } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: 'Education',
    line1: 'B.Tech in ECE (2024 - 2028)',
    line2: 'Techno India Salt Lake, Kolkata',
    line3: 'Engineering foundation with hands-on software projects',
  },
  {
    icon: Code2,
    title: 'Web development',
    line1: 'Frontend interfaces & backend APIs',
    line2: 'React, Next.js, Node.js, Express, PHP',
    line3: 'Public code and live products in selected work',
  },
  {
    icon: Rocket,
    title: 'Product work',
    line1: 'Founder of CampusSpace',
    line2: 'Student marketplace for campus communities',
    line3: 'Building from an idea through a live experience',
  },
];

const devSnippets = {
  'rishiraj.config.json': `{
  "name": "Rishiraj Debnath",
  "role": "Full-stack web developer",
  "location": "Kolkata, West Bengal, India",
  "focus": "Backend & Full-Stack Systems",
  "status": "Open to web developer opportunities",
  "work": ["CampusSpace", "Funfy", "InceptIQ"],
  "contact": "rishirajnatj@gmail.com"
}`,
  'stack.ts': `interface Developer {
  coreLanguages: string[];
  frameworks: string[];
  tools: string[];
}

export const Rishiraj: Developer = {
  coreLanguages: ["JavaScript", "TypeScript", "Python", "PHP"],
  frameworks: ["React", "Next.js", "Express", "Tailwind CSS"],
  tools: ["Git", "Vite", "PostgreSQL", "MySQL"]
};`,
};

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const [activeTab, setActiveTab] = useState('rishiraj.config.json');
  const [copied, setCopied] = useState(false);

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(devSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="about" ref={ref} className="section-shell relative overflow-hidden bg-surface-2">
      <div className="absolute -top-8 left-0 right-0 pointer-events-none select-none text-center">
        <span
          className="bg-text"
          style={{
            WebkitTextStrokeColor: 'rgba(99, 102, 241, 0.08)',
            color: 'transparent',
          }}
        >
          ABOUT
        </span>
      </div>

      <div className="page-width relative z-10">
        <Motion.div
          className="section-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="section-kicker">About me</p>
            <h2 className="section-heading text-foreground">I turn ideas into working web products.</h2>
          </div>
          <p className="section-copy">
            I work across the interface and the API, with a focus on clear user
            flows, responsive design, and features people can actually use.
          </p>
        </Motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Main About Copy & Interactive Code Card */}
          <div className="space-y-6">
            <Motion.div
              className="rounded-[2rem] border border-border/80 bg-surface/85 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8 space-y-5"
              initial={{ opacity: 0, y: 34 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-4 text-base leading-8 text-muted sm:text-lg">
                <p>
                  I&apos;m an{' '}
                  <span className="font-semibold text-primary">
                    Electronics & Communication Engineering
                  </span>{' '}
                  student and developer focused on building resilient APIs,
                  intuitive user interfaces, and systems that solve real problems.
                </p>
                <p className="text-muted-2">
                  I founded CampusSpace, a live student marketplace, and built
                  projects such as Funfy&apos;s browser design studio and InceptIQ&apos;s
                  React and Express analysis workflow. Each one has taught me
                  to connect product decisions with implementation details.
                </p>
                <p className="text-muted-2">
                  I&apos;m looking for a web development role where I can contribute
                  to frontend features, backend APIs, and the details that make
                  the whole experience work well.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                {['Responsive UI', 'API Development', 'Product Thinking', 'Problem Solving'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Motion.div>

            {/* Interactive Developer Code Card */}
            <Motion.div
              className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-slate-950 text-slate-200 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Terminal Titlebar with Mobile Overflow Safety */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/90 px-3.5 sm:px-4 py-3">
                <div className="flex items-center gap-2 min-w-0 overflow-x-auto scrollbar-none">
                  <div className="flex gap-1.5 shrink-0">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-2 sm:ml-3 flex gap-1.5 shrink-0">
                    {Object.keys(devSnippets).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono transition-colors shrink-0 ${
                          activeTab === tab
                            ? 'bg-slate-800 text-indigo-400 font-semibold border border-indigo-500/30'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCopyConfig}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:border-slate-500 hover:text-white shrink-0 active:scale-95"
                  title="Copy code snippet"
                  aria-label="Copy snippet"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span className="hidden xs:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code Snippet Content */}
              <div className="p-4 sm:p-5 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-indigo-200/90 scrollbar-thin">
                <pre>{devSnippets[activeTab]}</pre>
              </div>
            </Motion.div>
          </div>

          {/* Highlights & Milestones Cards */}
          <div className="grid gap-5">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <Motion.div
                  key={item.title}
                  className="glass-glow-card group rounded-[1.75rem] border border-border/80 bg-surface/88 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30"
                  initial={{ opacity: 0, x: 34 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3.5 text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm leading-6 text-muted-2">
                        <p className="font-semibold text-foreground/90">{item.line1}</p>
                        <p>{item.line2}</p>
                        <p className="text-xs text-primary font-medium mt-1">{item.line3}</p>
                      </div>
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
