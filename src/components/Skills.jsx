import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: "HTML", level: 85 },
  { name: "CSS", level: 75 },
  { name: "JavaScript", level: 70 },
  { name: "C Programming", level: 65 },
  { name: "Python", level: 60 },
  { name: "PHP", level: 45 },
];

// Card sizes based on skill level
function getCardSize(level) {
  if (level >= 80) return "col-span-2 row-span-2";
  if (level >= 65) return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
}

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 md:py-32 bg-surface-2 relative overflow-hidden"
    >
      {/* Giant background text */}
      <div className="absolute top-8 md:top-12 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="bg-text bg-text--light block text-center">SKILLS</span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-heading text-foreground">My Skills</h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-4" />
        </motion.div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto auto-rows-[minmax(100px,auto)]">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className={`relative bg-surface rounded-xl border border-border hover:border-primary/40 p-5 sm:p-6 flex flex-col justify-between group transition-all duration-500 overflow-hidden ${getCardSize(skill.level)}`}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, rotate: 0 }
                  : {}
              }
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
            >
              {/* Gradient left border — height based on skill level */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-border rounded-l-xl overflow-hidden">
                <motion.div
                  className="w-full bg-gradient-to-b from-primary to-primary-light rounded-full"
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {skill.name}
                </h3>
              </div>

              {/* Subtle level indicator in bottom-right */}
              <div className="self-end">
                <span className="text-2xl sm:text-3xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors duration-300 tabular-nums">
                  {skill.level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
