import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-48 h-48 rounded-full border border-primary/20 top-1/4 left-1/4 animate-float"></div>
        <div className="absolute w-24 h-24 rounded-full border border-primary/20 bottom-1/3 right-1/4 animate-float animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gray-400">Hi, I'm </span>
            <span className="text-black animate-glitch-text">Rishiraj Debnath</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-primary mb-6">
            Electronics & Communication Engineering Student
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Passionate about web development, AI, and open source. I love creating
            innovative solutions and contributing to the tech community. Let's build something amazing together!
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <motion.a
              href="#projects"
              className="border bg-primary hover:bg-primary-light text-black px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>

          <div className="flex justify-center gap-6">
            <motion.a
              href="https://github.com/13507-IN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/rishiraj-debnath-890322313"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:rishirajnatj@gmail.com"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}