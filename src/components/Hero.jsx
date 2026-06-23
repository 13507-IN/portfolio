import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { useRef } from "react";
import myimage from "../assets/myimage.jpeg";

// Split text into individual characters for staggered animation
function SplitText({ children, className = "", delay = 0 }) {
  const chars = String(children).split("");
  return (
    <span className={className} aria-label={children}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background text moves faster, photo moves slower
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-24 pb-16"
    >
      {/* Giant background name */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: bgTextY, opacity: bgTextOpacity }}
      >
        <span className="bg-text bg-text--light whitespace-nowrap">
          RISHIRAJ
        </span>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        {/* Text content */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          style={{ y: contentY }}
        >
          <div className="mb-4 overflow-hidden">
            <motion.p
              className="text-sm sm:text-base font-medium tracking-widest uppercase text-primary"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hello, I'm
            </motion.p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.05] tracking-tight">
            <SplitText delay={0.2}>Rishiraj</SplitText>
            <br />
            <SplitText className="text-primary" delay={0.5}>
              Debnath
            </SplitText>
          </h1>

          <div className="overflow-hidden mb-6 sm:mb-8">
            <motion.p
              className="text-muted-2 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Electronics & Communication Engineering Student. Passionate about
              web development, AI, and building things that solve real problems.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <a
              href="#projects"
              className="btn-slide-fill bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-colors duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border-2 border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-colors duration-300"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-start gap-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            {[
              { icon: Github, href: "https://github.com/13507-IN", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/rishiraj-debnath-890322313", label: "LinkedIn" },
              { icon: Mail, href: "mailto:rishirajnatj@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-muted hover:text-primary transition-colors duration-300"
                aria-label={label}
              >
                <Icon size={22} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Photo — rotated rectangle with offset shadow */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Offset colored shadow */}
            <div className="absolute inset-0 bg-primary/20 rounded-2xl translate-x-4 translate-y-4 rotate-3" />
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden rotate-[-2deg] border-2 border-border shadow-xl">
              <img
                src={myimage}
                alt="Rishiraj Debnath"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-muted-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
