import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  FileCode,
  Terminal,
  Cpu,
  Boxes,
  Database,
  Flame,
  Globe,
  Sparkles,
} from 'lucide-react';

const categories = ['All', 'Web Development', 'Languages & AI', 'Hardware & Systems'];

const skills = [
  {
    name: 'HTML & CSS',
    category: 'Web Development',
    level: 88,
    status: 'Advanced',
    note: 'Responsive layouts & Tailwind CSS styling',
    icon: Globe,
  },
  {
    name: 'JavaScript',
    category: 'Web Development',
    level: 78,
    status: 'Advanced',
    note: 'Modern ES6+, DOM manipulation & React',
    icon: FileCode,
  },
  {
    name: 'React & Next.js',
    category: 'Web Development',
    level: 75,
    status: 'Intermediate',
    note: 'Component architecture, state & SSR',
    icon: Boxes,
  },
  {
    name: 'Python',
    category: 'Languages & AI',
    level: 72,
    status: 'Intermediate',
    note: 'Flask web backends, automation & Gemini AI',
    icon: Terminal,
  },
  {
    name: 'C Programming',
    category: 'Languages & AI',
    level: 70,
    status: 'Intermediate',
    note: 'Core algorithms, memory & logic',
    icon: Code2,
  },
  {
    name: 'Electronics & IoT',
    category: 'Hardware & Systems',
    level: 68,
    status: 'Intermediate',
    note: 'ECE fundamentals, Arduino & circuits',
    icon: Cpu,
  },
  {
    name: 'PHP & MySQL',
    category: 'Web Development',
    level: 60,
    status: 'Exploring',
    note: 'Relational databases & server-side scripts',
    icon: Database,
  },
  {
    name: 'Git & Linux CLI',
    category: 'Hardware & Systems',
    level: 80,
    status: 'Advanced',
    note: 'Version control, shell scripting & workflow',
    icon: Flame,
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" ref={ref} className="section-shell relative overflow-hidden bg-surface-2">
      <div className="absolute top-6 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="bg-text bg-text--light block text-center">SKILLS</span>
      </div>

      <div className="page-width relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <Motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-kicker">Core toolkit</p>
            <h2 className="section-heading text-foreground">
              Technologies I work with.
            </h2>
          </Motion.div>

          {/* Skill Filter Pills */}
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

        {/* Skills Cards Grid */}
        <Motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const IconComponent = skill.icon;

              return (
                <Motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="glass-glow-card rounded-[1.75rem] border border-border/80 bg-surface/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                        <IconComponent size={22} />
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          skill.status === 'Advanced'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : skill.status === 'Intermediate'
                            ? 'bg-primary/15 text-primary border border-primary/30'
                            : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {skill.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground">{skill.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-2">{skill.note}</p>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs font-semibold text-muted mb-2">
                      <span>Proficiency</span>
                      <span className="text-primary font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-3">
                      <Motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 0.9, delay: 0.15 + index * 0.08 }}
                      />
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </AnimatePresence>
        </Motion.div>
      </div>
    </section>
  );
}
