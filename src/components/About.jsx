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
      className="py-20 bg-dark-secondary relative overflow-hidden"
    >
      {/* Background 2D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        {/* <motion.div
          className="absolute w-64 h-64 rounded-full border-2 border-primary/10 top-20 left-10%"
          animate={{
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        /> */}
        
        <motion.div
          className="absolute w-40 h-40 rounded-lg border-2 border-primary/10 bottom-20 right-15% rotate-45"
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

        {/* Abstract lines */}
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
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

        {/* Dotted grid pattern */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: 'radial-gradient(rgba(138, 43, 226, 0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-12 relative text-black">
          About Me
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary rounded-full"></span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-gray-800 text-lg leading-relaxed">
              I'm an <span className="text-primary font-semibold">Electronics & Communication Engineering</span> student at 
              <span className="text-primary font-semibold"> Techno Main Salt Lake</span>, passionate about web development, 
              IoT, and cutting-edge technology.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed">
              My journey in tech began when I built my first Arduino project, and 
              since then I've been obsessed with creating solutions that bridge 
              hardware and software.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed">
              When I'm not coding or tinkering with circuits, you can find me 
              contributing to open-source projects or exploring new tech stacks. In free time I love to spend my time playing guitar and listening to music.
            </p>
          </div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6">
            <motion.div 
              className="bg-dark p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <GraduationCap size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Education</h3>
              <p className="text-gray-500">B.Tech in ECE</p>
              <p className="text-gray-600">Techno Main Salt Lake</p>
              <p className="text-gray-600">2024-2028</p>
            </motion.div>

            <motion.div 
              className="bg-dark p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Code2 size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Development</h3>
              <p className="text-gray-500">4+ Projects</p>
              <p className="text-gray-600">JavaScript, Python</p>
            </motion.div>

            <motion.div 
              className="bg-dark p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Cpu size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Hardware</h3>
              <p className="text-gray-500">Arduino Uno</p>
              <p className="text-gray-600">Line Follower Bot</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}