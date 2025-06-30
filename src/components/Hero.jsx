import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dark to-dark-secondary"
    >
      {/* Floating 2D elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes */}
        { <motion.div
          className="absolute w-64 h-64 rounded-lg border-2 border-primary/20 top-1/4 left-10% rotate-45"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        /> }
        
        <motion.div
          className="absolute w-32 h-32 rounded-full border-2 border-primary/20 bottom-1/3  left-1/4"
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Abstract lines */}
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0,100 Q250,50 400,200 T800,150"
            stroke="rgba(138, 43, 226, 0.1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* Text content */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gray-400">Hi, I'm </span>
            <span className="text-black animate-glitch-text">Rishiraj Debnath</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-primary mb-6">
            Electronics & Communication Engineering Student
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto lg:mx-0 mb-8">
            Passionate about web development, AI, and open source. I love creating
            innovative solutions and contributing to the tech community. Let's build something amazing together!
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
            <motion.a
              href="#projects"
              className="border-2 bg-primary hover:bg-primary-light text-black px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-primary/30"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="border-2 border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>

          <div className="flex justify-center lg:justify-start gap-6">
            <motion.a
              href="https://github.com/13507-IN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/rishiraj-debnath-890322313"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:rishirajnatj@gmail.com"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </motion.div>

        {/* Photo placeholder */}
        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/20 overflow-hidden shadow-2xl">
            {/* Replace this div with your actual photo */}
            <img 
                src="src/assets/myphoto.jpeg" 
                alt="Rishiraj Debnath"
                className="w-full h-full object-cover"
            />
            
            {/* Decorative elements around photo */}
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-primary/10 z-[-1]"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-lg bg-primary/20 z-[-1] rotate-12"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * 10 + 5 + 'px',
            height: Math.random() * 10 + 5 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%'
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </section>
  );
}