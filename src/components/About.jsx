import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Cpu, GraduationCap, Check, Copy, Terminal, Sparkles, BookOpen } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: 'Education',
    line1: 'B.Tech in ECE (2024 - 2028)',
    line2: 'Techno Main Salt Lake, Kolkata',
    line3: 'Deep dive into Circuits, Signals & Embedded Logic',
  },
  {
    icon: Code2,
    title: 'Development',
    line1: 'Full-Stack & Interactive UI',
    line2: 'JavaScript, React, Python, Flask, Next.js',
    line3: '9+ projects built & deployed',
  },
  {
    icon: Cpu,
    title: 'Hardware & Systems',
    line1: 'IoT + Embedded Systems Curiosity',
    line2: 'Arduino microcontrollers & hardware logic',
    line3: 'Engineering-first problem solver',
  },
];

const devSnippets = {
  'rishiraj.config.json': `{
  "name": "Rishiraj Debnath",
  "role": "ECE Student & Web/AI Builder",
  "location": "Kolkata, West Bengal, India",
  "university": "Techno Main Salt Lake",
  "status": "Available for hackathons & projects",
  "interests": ["Clean UI", "AI Systems", "IoT", "Guitar"],
  "currentlyLearning": ["Advanced Next.js", "LLM Fine-tuning", "Rust"]
}`,
  'stack.ts': `interface Developer {
  coreLanguages: string[];
  frameworks: string[];
  tools: string[];
}

export font Rishiraj: Developer = {
  coreLanguages: ["JavaScript", "Python", "C", "PHP"],
  frameworks: ["React", "Flask", "Tailwind CSS", "Next.js"],
  tools: ["Git", "Vite", "VS Code", "Arduino IDE"]
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
            <h2 className="section-heading text-foreground">Engineering logic, creative execution.</h2>
          </div>
          <p className="section-copy">
            I like building products that feel clear, useful, and grounded in
            real problems. My background in electronics shapes the way I think
            about systems, while web development lets me bring ideas to life quickly.
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
                  student at{' '}
                  <span className="font-semibold text-primary">
                    Techno Main Salt Lake
                  </span>
                  , passionate about merging software design with intelligent systems.
                </p>
                <p className="text-muted-2">
                  My journey picked up speed through hackathons and hands-on projects.
                  Since then, I&apos;ve been chasing the sweet spot between thoughtful design,
                  reliable functionality, and practical tools.
                </p>
                <p className="text-muted-2">
                  When I&apos;m not coding or experimenting with circuits, I usually spend time
                  exploring new tools, refining ideas, playing guitar, or learning from other builders.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                {['Hackathons', 'Open Source', 'UI Craft', 'Problem Solving', 'IoT Systems'].map((item) => (
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
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-3 flex gap-2">
                    {Object.keys(devSnippets).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
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
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
                  title="Copy code snippet"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code Snippet Content */}
              <div className="p-4 sm:p-5 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-indigo-200/90">
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
