import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, ExternalLink, Github, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';

// Import your project images
import SerenityImage from '../assets/serenity.png';
import ToDoImage from '../assets/taskmaster.png';
import FinMateImage from '../assets/FinMate.jpeg';
import InceptIQImage from '../assets/inceptIQ.png';
import MimicImage from '../assets/mimic.png';

// Unique gradient pairs for projects without images
const gradients = [
  "from-violet-600/30 to-indigo-800/30",
  "from-blue-600/30 to-cyan-800/30",
  "from-emerald-600/30 to-teal-800/30",
  "from-amber-600/30 to-orange-800/30",
  "from-rose-600/30 to-pink-800/30",
  "from-fuchsia-600/30 to-purple-800/30",
];

const projects = [
  {
    id: 1,
    title: "Serenity",
    description: "An AI powered personal assistant that helps to support mental health.",
    tags: ["Python-flask", "Gemini-API", "SQLAlchemy"],
    github: "https://github.com/13507-IN/Serenity",
    demo: "#",
    image: SerenityImage,
    alt: "Serenity AI Assistant Preview"
  },
  {
    id: 2,
    title: "To Do List App",
    description: "A sleek, functional to-do list web app with all the productivity features.",
    tags: ["JavaScript", "Clear UI"],
    github: "https://github.com/13507-IN/TaskMaster",
    demo: "#",
    image: ToDoImage,
    alt: "DSP Algorithms Preview"
  },
  {
    id: 3,
    title: "FinMate",
    description: "A personal finance management app that helps users track expenses and savings using graphs and charts.",
    tags: ["PHP", "Full-Stack", "MySQL"],
    github: "https://github.com/13507-IN/FinMate",
    demo: "#",
    image: FinMateImage,
    alt: "FinMate Finance Management App Preview"
  },
  {
    id: 4,
    title: "InceptIQ",
    description: "An AI-powered idea validator that helps to validate startup ideas quickly and efficiently , comparing them against existing market data.",
    tags: ["AI", "Full-Stack", "Next.js"],
    github: "https://github.com/13507-IN/InceptIQ",
    demo: "https://incept-iq.vercel.app/",
    image: InceptIQImage,
    alt: "InceptIQ Idea Validator Preview"
  },
  {
    id: 5,
    title: "Mimic",
    description: "An AI-powered chatbot that mimics user behavior and responses for enhanced interaction.",
    tags: ["AI", "Full-Stack", "Next.js", "chatbot"],
    github: "https://github.com/13507-IN/Mimic",
    demo: "https://mimic-eta.vercel.app/",
    image: MimicImage,
    alt: "Mimic Chatbot Preview"
  },
  {
    id: 6,
    title: "Clip",
    description: "A high performance URL shortner.",
    tags: ["Rust"],
    github: "https://github.com/13507-IN/Clip",
    demo: "#",
    image: null,
    alt: "Clip Preview"
  },
  {
    id: 7,
    title: "Barcelona",
    description: "A Python project.",
    tags: ["Python"],
    github: "https://github.com/13507-IN/Barcelona",
    demo: "https://barcalona.vercel.app",
    image: null,
    alt: "Barcelona Preview"
  },
  {
    id: 8,
    title: "AutoClass-AI",
    description: "An AI tool built with JavaScript.",
    tags: ["JavaScript", "AI"],
    github: "https://github.com/13507-IN/AutoClass-AI",
    demo: "#",
    image: null,
    alt: "AutoClass-AI Preview"
  },
  {
    id: 9,
    title: "MediOps",
    description: "A project called MediOps.",
    tags: ["Project"],
    github: "https://github.com/13507-IN/MediOps",
    demo: "#",
    image: null,
    alt: "MediOps Preview"
  }
];

// ===================== DESKTOP: Horizontal Scroll =====================
function HorizontalGallery() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 80; // vw
  const gap = 3; // vw
  const totalScrollWidth = projects.length * (cardWidth + gap);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${totalScrollWidth - 100 + gap}vw`]
  );

  // Track current index for counter
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.round(v * (projects.length - 1));
      setCurrentIndex(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      className="horizontal-scroll-section"
      style={{ "--section-height": `${projects.length * 100}vh` }}
    >
      <div className="horizontal-scroll-sticky flex flex-col justify-center">
        {/* Header row */}
        <div className="container mx-auto px-6 mb-6 flex justify-between items-end">
          <div>
            <h2 className="section-heading text-foreground">My Projects</h2>
            <div className="w-12 h-1 bg-primary rounded-full mt-4" />
          </div>
          <span className="text-muted-2 font-mono text-sm tabular-nums">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Scrolling track */}
        <motion.div className="flex gap-[3vw] pl-6" style={{ x }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Progress dots */}
        <div className="container mx-auto px-6 mt-8 flex gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "w-8 bg-primary"
                  : "w-3 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== MOBILE: Vertical Cards =====================
function MobileGallery() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="projects-mobile" ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading text-foreground">My Projects</h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-4" />
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ProjectCard project={project} index={i} mobile />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== Card Component =====================
function ProjectCard({ project, index, mobile = false }) {
  const gradientClass = gradients[index % gradients.length];
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl overflow-hidden border border-border bg-surface flex-shrink-0 transition-all duration-500 hover:border-primary/30 ${
        mobile ? "w-full" : "w-[80vw] h-[65vh]"
      }`}
    >
      {/* Cursor spotlight glow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(139, 92, 246, 0.15), transparent 60%)`,
        }}
      />

      {/* Image or gradient placeholder */}
      <div className={`relative overflow-hidden ${mobile ? "h-52" : "h-full"} bg-surface-3`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.alt}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
          >
            <span className="text-foreground/10 font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tighter select-none">
              {project.title}
            </span>
          </div>
        )}

        {/* Bottom gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content overlaid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 z-20">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {project.title}
            </h3>
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="View code"
              >
                <Github size={20} />
              </a>
              {project.demo && project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="View demo"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="text-white/70 text-sm sm:text-base mb-4 max-w-xl leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs sm:text-sm bg-white/10 backdrop-blur-sm text-white/90 rounded-full border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ===================== Main Export =====================
export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="projects">
      {isMobile ? <MobileGallery /> : <HorizontalGallery />}
    </section>
  );
}
