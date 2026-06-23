import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Code2, Cpu } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    line1: "B.Tech in ECE",
    line2: "Techno Main Salt Lake",
    line3: "2024-2028",
  },
  {
    icon: Code2,
    title: "Development",
    line1: "4+ Projects",
    line2: "JavaScript, Python",
    line3: null,
  },
  {
    icon: Cpu,
    title: "Hardware",
    line1: "Arduino Uno",
    line2: "Line Follower Bot",
    line3: null,
  },
];

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32 bg-surface-2 relative overflow-hidden"
    >
      {/* Giant background text — top center, partially clipped */}
      <div className="absolute -top-10 md:-top-16 left-0 right-0 pointer-events-none select-none text-center">
        <span className="bg-text" style={{ WebkitTextStrokeColor: 'rgba(139, 92, 246, 0.07)', color: 'transparent' }}>ABOUT</span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section heading with reveal mask */}
        <motion.div
          className="mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-heading text-foreground">
            About Me
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-4" />
        </motion.div>

        {/* Asymmetric layout: wide text left, cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Text — takes 3 of 5 columns */}
          <motion.div
            className="lg:col-span-3 space-y-5"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              I'm an{" "}
              <span className="text-primary font-semibold">
                Electronics & Communication Engineering
              </span>{" "}
              student at{" "}
              <span className="text-primary font-semibold">
                Techno Main Salt Lake
              </span>
              , passionate about web development, IoT, and cutting-edge technology.
            </p>
            <p className="text-muted-2 text-base sm:text-lg leading-relaxed">
              My journey in tech began when I first participated in a hackathon, and
              since then I've been obsessed with creating solutions that solve real
              life problems we face daily. I love to explore new technologies, and
              making a positive impact in the society through my work is what drives
              me.
            </p>
            <p className="text-muted-2 text-base sm:text-lg leading-relaxed">
              When I'm not coding or tinkering with circuits, you can find me
              contributing to open-source projects or exploring new tech stacks. In
              free time I love to spend my time playing guitar and listening to music.
            </p>
          </motion.div>

          {/* Cards — takes 2 of 5 columns, stacked vertically */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="bg-surface p-5 sm:p-6 rounded-xl border border-border hover:border-primary/40 transition-all duration-500 group"
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                >
                  <Icon
                    size={22}
                    className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm">{item.line1}</p>
                  {item.line2 && (
                    <p className="text-muted-2 text-sm">{item.line2}</p>
                  )}
                  {item.line3 && (
                    <p className="text-muted-2 text-sm">{item.line3}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
