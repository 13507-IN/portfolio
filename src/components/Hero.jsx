
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import myimage from "../assets/myphoto.jpeg";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dark to-dark-secondary pt-20 pb-10"
    >
      {/* Floating 2D elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes - Reduced size for mobile */}
        <motion.div
          className="absolute w-40 h-40 md:w-64 md:h-64 rounded-lg border-2 border-primary/20 top-[15%] left-[5%] md:top-1/4 md:left-10% rotate-45"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-primary/20 bottom-[25%] left-[5%] md:bottom-1/3 md:left-1/4"
          animate={{
            x: [0, 8, 0],
            y: [0, -8, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Abstract lines - Simplified for mobile */}
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0,150 Q150,50 300,200 T600,100"
            stroke="rgba(138, 43, 226, 0.1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
        {/* Text content - Adjusted padding for mobile */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-400">Hi, I'm </span>
            <span className="text-black">Rishiraj Debnath</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-primary mb-4 sm:mb-6">
            Electronics & Communication Engineering Student
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8">
            Passionate about web development, AI, and open source. I love creating
            innovative solutions and contributing to the tech community.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
            <motion.a
              href="#projects"
              className="border-2 bg-primary hover:bg-primary-light text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-300 shadow-primary/30 text-sm sm:text-base"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="border-2 border-primary text-primary hover:bg-primary/10 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>

          <div className="flex justify-center lg:justify-start gap-4 sm:gap-6">
            <motion.a
              href="https://github.com/13507-IN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/rishiraj-debnath-890322313"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
            <motion.a
              href="mailto:rishirajnatj@gmail.com"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </div>
        </motion.div>

        {/* Photo - Adjusted size for mobile */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/20 overflow-hidden shadow-lg md:shadow-2xl">
            <img 
              src={myimage}
              alt="Rishiraj Debnath"
              className="w-full h-full object-cover"
            />
            
            {/* Decorative elements - Smaller for mobile */}
            <div className="absolute -top-2 -left-2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-primary/10 z-[-1]"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg bg-primary/20 z-[-1] rotate-12"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles - Reduced number for mobile */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * 6 + 3 + 'px',
            height: Math.random() * 6 + 3 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%'
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 50],
            x: [0, (Math.random() - 0.5) * 30],
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