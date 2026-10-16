import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  FileCode,
  Terminal,
  Boxes,
  Database,
  Globe,
  Server,
  GitBranch,
} from 'lucide-react';

const categories = ['All', 'Frontend', 'Backend', 'Workflow'];

const skills = [
  {
    name: 'HTML, CSS & Tailwind',
    category: 'Frontend',
    note: 'Responsive layouts and reusable design patterns.',
    usedIn: 'Portfolio, InceptIQ, Funfy',
    icon: Globe,
  },
  {
    name: 'JavaScript & TypeScript',
    category: 'Frontend',
    note: 'Interactive interfaces and typed application code.',
    usedIn: 'TaskMaster, Funfy',
    icon: FileCode,
  },
  {
    name: 'React & Next.js',
    category: 'Frontend',
    note: 'Component-driven apps and browser-based product flows.',
    usedIn: 'InceptIQ, Funfy, ScholarCatalyst',
    icon: Boxes,
  },
  {
    name: 'Node.js & Express',
    category: 'Backend',
    note: 'REST APIs, authentication, and application logic.',
    usedIn: 'InceptIQ, Rishiraj Auth',
    icon: Server,
  },
  {
    name: 'Databases',
    category: 'Backend',
    note: 'PostgreSQL, MongoDB, and MySQL in project work.',
    usedIn: 'Rishiraj Auth, ScholarCatalyst, FinMate',
    icon: Database,
  },
  {
    name: 'Python & PHP',
    category: 'Backend',
    note: 'Server-side features and data-oriented applications.',
    usedIn: 'Barcelona, FinMate',
    icon: Terminal,
  },
  {
    name: 'Authentication & APIs',
    category: 'Backend',
    note: 'JWT flows, role-based access, and API integration.',
    usedIn: 'Rishiraj Auth, InceptIQ',
    icon: Code2,
  },
  {
    name: 'Git & GitHub',
    category: 'Workflow',
    note: 'Versioned projects with public source and documentation.',
    usedIn: 'Explore my repositories',
    icon: GitBranch,
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
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        {skill.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground">{skill.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-2">{skill.note}</p>
                  </div>

                  <div className="mt-6 border-t border-border/60 pt-3 text-xs text-muted-2">
                    <span className="font-semibold text-primary">Used in:</span> {skill.usedIn}
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
