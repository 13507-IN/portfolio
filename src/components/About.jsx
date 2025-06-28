import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Code2, Cpu } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-20 bg-dark-secondary"
    >
      <motion.div
        className="container mx-auto px-6"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-12 relative">
          About Me
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary rounded-full"></span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-black text-lg leading-relaxed">
              I'm an <span className="text-primary font-semibold">Electronics & Communication Engineering</span> student at 
              <span className="text-primary font-semibold"> Techno Main Salt Lake</span>, passionate about web development, 
              IoT, and cutting-edge technology.
            </p>
            <p className="text-zinc-600 text-lg leading-relaxed">
              My journey in tech began when I built my first Arduino project, and 
              since then I've been obsessed with creating solutions that bridge 
              hardware and software.
            </p>
            <p className="text-zinc-600 text-lg leading-relaxed">
              When I'm not coding or tinkering with circuits, you can find me 
              contributing to open-source projects or exploring new tech stacks. In free time i love to spend my time on playing guitar and listening to music.
            </p>
          </div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6">
            <motion.div 
              className="bg-dark p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <GraduationCap size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Education</h3>
              <p className="text-zinc-800">B.Tech in ECE</p>
              <p className="text-gray-800">Techno Main Salt Lake</p>
              <p className="text-gray-800">2024-2028</p>
            </motion.div>

            <motion.div 
              className="bg-dark p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <Code2 size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Development</h3>
              <p className="text-gray-800">4+ Projects</p>
              <p className="text-gray-800">Java Script, Python</p>
            </motion.div>

            <motion.div 
              className="bg-dark p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <Cpu size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Hardware</h3>
              <p className="text-gray-800">Arduino Uno</p>
              <p className="text-gray-800">Line Follower Bot</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}