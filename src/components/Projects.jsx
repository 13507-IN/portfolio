import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, ExternalLink, Github, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Import your project images
import SerenityImage from '../assets/serenity.png'; // Adjust the path as necessary
import ToDoImage from '../assets/taskmaster.png';

const projects = [
  {
    id: 1,
    title: "Serenity",
    description: "An AI powered personal assistant that helps to support mental health.",
    tags: ["Python-flask", "Gemini-API", "SQLAlchemy"],
    github: "https://github.com/13507-IN/Serenity",
    demo: "#",
    image: SerenityImage, // Added image reference
    alt: "Serenity AI Assistant Preview"
  },
  {
    id: 2,
    title: "To Do List App",
    description: "A sleek, functional to-do list web app with all the productivity features.",
    tags: ["JavaScript", "Clear UI"],
    github: "https://github.com/13507-IN/TaskMaster",
    demo: "#",
    image: ToDoImage, // Added image reference
    alt: "DSP Algorithms Preview"
  },
  // Add 2 more projects
];

export default function Projects() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleImageClick = (image, alt) => {
    setSelectedImage({ image, alt });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section 
      id="projects" 
      ref={ref}
      className="py-20 bg-dark"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 relative text-black">
          My Projects
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary rounded-full"></span>
        </h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="bg-dark-secondary rounded-xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-300"
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Project Image - Replace placeholder with actual image */}
              <div 
                className="h-70 bg-gray-900 overflow-hidden relative cursor-pointer"
                onClick={() => handleImageClick(project.image, project.alt)}
              >
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <div className="text-gray-400 text-lg font-bold">Project Preview</div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <a href={project.github}><Github size={24} /></a>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    aria-label="View code"
                  >
                    <Code size={20} />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    aria-label="View demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>



      {/* Full-screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-6xl w-full max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.alt}
                className="w-full h-full object-contain max-h-[80vh] mx-auto rounded-lg"
              />
              <p className="text-white text-center mt-2">{selectedImage.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}