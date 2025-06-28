import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: "HTML", level: 85 },
  { name: "CSS", level: 75 },
  { name: "Java Script", level: 70 },
  { name: "C Programming", level: 65 },
  { name: "Python", level: 60 },
  { name: "PHP", level: 45 },
];

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-20 bg-dark-secondary"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 relative text-black">
          My Skills
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary rounded-full"></span>
        </h2>
        
        <motion.div
          className="space-y-8 max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="group"
              variants={item}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-medium group-hover:text-yellow-800 transition-colors duration-300">
                  {skill.name}
                </span>
                <span className="text-primary font-medium">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden bg-transparent">
                {/* Only the filled portion will be visible */}
                <motion.div
                  className="h-full bg-gray-800 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  {/* Percentage text inside the dark bar */}
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-white">
                    {inView && skill.level > 15 ? `${skill.level}%` : ''}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}