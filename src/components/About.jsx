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
      className="py-12 md:py-20 bg-dark-secondary relative overflow-hidden"
    >
      {/* Background 2D Elements - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-20 h-20 md:w-40 md:h-40 rounded-lg border-2 border-primary/10 bottom-10 md:bottom-20 right-5% md:right-15% rotate-45"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Hide complex SVG on mobile */}
        <svg className="hidden md:block absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0,150 Q150,50 300,200 T600,100 T900,200"
            stroke="rgba(138, 43, 226, 0.5)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5 }}
          />
        </svg>

        {/* Lighter dotted grid on mobile */}
        <div className="absolute inset-0 opacity-20 md:opacity-40" style={{
          backgroundImage: 'radial-gradient(rgba(138, 43, 226, 0.5) 1px, transparent 1px)',
          backgroundSize: '15px 15px'
        }}></div>
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 relative z-10"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 relative text-black">
          About Me
          <span className="absolute bottom-0 left-0 w-8 sm:w-12 h-1 bg-primary rounded-full"></span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
              I'm an <span className="text-primary font-semibold">Electronics & Communication Engineering</span> student at 
              <span className="text-primary font-semibold"> Techno Main Salt Lake</span>, passionate about web development, 
              IoT, and cutting-edge technology.
            </p>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              My journey in tech began when I first participated in a hackathon, and 
              since then I've been obsessed with creating solutions that solve real life
              problems we face daily. I love to explore new technologies, and making a positive impact in the society through my work is what drives me.
            </p>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              When I'm not coding or tinkering with circuits, you can find me 
              contributing to open-source projects or exploring new tech stacks. In free time I love to spend my time playing guitar and listening to music.
            </p>
          </div>

          {/* Highlight Cards - Adjusted for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            <motion.div 
              className="bg-dark p-4 sm:p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <GraduationCap size={24} className="text-primary mb-2 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-2">Education</h3>
              <p className="text-gray-500 text-sm sm:text-base">B.Tech in ECE</p>
              <p className="text-gray-600 text-sm sm:text-base">Techno Main Salt Lake</p>
              <p className="text-gray-600 text-sm sm:text-base">2024-2028</p>
            </motion.div>

            <motion.div 
              className="bg-dark p-4 sm:p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Code2 size={24} className="text-primary mb-2 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-2">Development</h3>
              <p className="text-gray-500 text-sm sm:text-base">4+ Projects</p>
              <p className="text-gray-600 text-sm sm:text-base">JavaScript, Python</p>
            </motion.div>

            <motion.div 
              className="bg-dark p-4 sm:p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Cpu size={24} className="text-primary mb-2 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-2">Hardware</h3>
              <p className="text-gray-500 text-sm sm:text-base">Arduino Uno</p>
              <p className="text-gray-600 text-sm sm:text-base">Line Follower Bot</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}