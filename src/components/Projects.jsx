import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  ArrowUpRight,
  Filter,
  Star,
  RefreshCw,
  Search,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGitHubProjects } from '../services/githubService';

import ToDoImage from '../assets/taskmaster.png';
import FinMateImage from '../assets/FinMate.jpeg';
import InceptIQImage from '../assets/inceptIQ.png';
import ScholarCatalystImage from '../assets/scholarcatalyst.png';
import FunfyImage from '../assets/funfy.png';
import ProjectModal from './ProjectModal';

const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];
const FEATURED_IDS = ['campuskart', 'rishiraj-auth', 'inceptiq'];

const gradients = [
  'from-violet-600/30 to-indigo-800/30',
  'from-blue-600/30 to-cyan-800/30',
  'from-emerald-600/30 to-teal-800/30',
  'from-amber-600/30 to-orange-800/30',
  'from-rose-600/30 to-pink-800/30',
  'from-fuchsia-600/30 to-purple-800/30',
];

// Shared with the backend showcase route.
// eslint-disable-next-line react-refresh/only-export-components
export const projects = [
  {
    id: 'campuskart',
    title: 'CampusSpace',
    category: 'Full Stack',
    description: 'A student marketplace for campus buying, selling, messaging, and events.',
    longDescription:
      'I founded CampusSpace to make student-to-student trading easier within a campus community. The live product brings listings, direct messaging, and an events hub into one place.',
    highlights: [
      'Built around campus-specific listings and student profiles',
      'Messaging and events are part of the live experience',
      'Founder-led product, available to explore online',
    ],
    story: {
      why: "At the start of every college semester, student group chats would get flooded with chaotic messages: people trying to sell second-hand engineering books, drafters, calculators, and hostel essentials. Listings got buried within minutes, prices were arbitrary, and finding what you needed was frustrating. I realized campus communities needed their own dedicated micro-economy—a trusted space where students could discover, chat, and trade without the noise.",
      thoughtProcess: "When architecting CampusSpace, the priority was zero-friction mobile usability. Students list items between classes, so the flow had to take under 30 seconds: take a photo, set a price, select a category, and post. I designed direct messaging into the platform so buyers and sellers could coordinate without broadcasting their personal phone numbers, and added a campus events feed so the platform stayed valuable even outside semester transitions.",
      learnings: "Building CampusSpace transformed how I approach engineering. In course assignments, code runs in sterile, ideal conditions. In a live product, you face edge cases, patchy mobile network connections, and the psychology of community adoption. It taught me to connect every backend database schema and UI component directly to real human behavior.",
      videoUrl: null,
    },
    tags: ['Marketplace', 'Web App', 'Product'],
    github: null,
    demo: 'https://campusspacee.com/',
    image: null,
    alt: 'CampusSpace student marketplace',
  },
  {
    id: 'funfy',
    title: 'Funfy',
    category: 'Frontend',
    description: 'A sticker storefront and browser-based design studio with non-blocking Web Worker background removal.',
    longDescription:
      'Funfy combines a merchandise storefront with an in-browser creative studio powered by Fabric.js and HTML5 Canvas. Users can design custom artwork, strip image backgrounds via multi-threaded Web Workers, configure dimensions, and order heat-press transfers.',
    highlights: [
      'Interactive HTML5 Canvas editor with multi-layer controls and PNG export',
      'Non-blocking background removal offloaded to background Web Workers',
      'Custom sizing & heat-press transfer workflow for apparel & merchandise',
      'Local-first cart state persistence with IndexedDB & localStorage',
    ],
    story: {
      why: "Funfy began with an entrepreneurial spark: I wanted to launch a custom merchandise and apparel printing business. But as I explored user needs, I realized people didn't just want generic pre-printed shirts—they wanted hyper-personalization. Whether designing a surprise birthday gift for a close friend or creating unique laptop decals, people wanted complete creative control. I evolved the concept into an interactive studio where anyone can design custom stickers, pick exact dimensions, and order high-quality heat-press transfer stickers delivered to their doorstep to press onto T-shirts and gear at home.",
      thoughtProcess: "Before Funfy, I had never touched the HTML5 Canvas API, so this project became my proving ground for advanced frontend graphics:\n\n• Interactive Canvas Architecture: Leveraged Fabric.js and HTML5 Canvas to handle multi-layer object composition, vector shapes, custom typography, scaling, and high-resolution transparent PNG exports.\n\n• Solving the Main-Thread Freeze with Web Workers: When I initially integrated browser-side background removal, the website completely froze—clicks refused to register and animations stuttered because the heavy pixel computation was choking JavaScript's single-threaded event loop. I researched the problem and solved it by offloading the image processing into a dedicated Web Worker. Running the compute on a separate background thread kept the user interface buttery smooth and responsive while the background was stripped silently in parallel.\n\n• Local-First Design Persistence: Engineered client-side state storage using IndexedDB and localStorage fallbacks, ensuring user sticker designs and cart selections persisted across browser refreshes.",
      learnings: "Funfy took me beyond standard UI design deep into the mechanics of browser rendering and the JavaScript event loop. Hitting that performance wall and discovering how to offload heavy workloads to Web Workers was an eye-opener: it taught me that frontend engineering isn't just about styling buttons—it's about respecting CPU cycles and thread utilization. It showed me how to marry a creative physical business concept with robust browser engineering.",
      videoUrl: null,
    },
    tags: ['Next.js', 'TypeScript', 'Fabric.js', 'HTML5 Canvas', 'Web Workers'],
    github: 'https://github.com/13507-IN/Funfy',
    demo: 'https://funfy.vercel.app/',
    image: FunfyImage,
    alt: 'Funfy sticker design studio preview',
  },
  {
    id: 'inceptiq',
    title: 'InceptIQ',
    category: 'Full Stack',
    description: 'An AI-powered startup idea validator and live Hackathon War Room built with Google Gemini and Express.',
    longDescription:
      'InceptIQ is a SaaS-grade platform combining AI-driven startup feasibility analysis with a high-stakes Hackathon War Room. Powered by Google Gemini and an Express backend, it generates structured competitor benchmarks, risk scores, PDF reports, and real-time sprint milestones for hackathon teams.',
    highlights: [
      'Google Gemini AI pipeline delivering structured feasibility scores & competitor analysis',
      'Live Hackathon War Room with real-time countdown timer & milestone sprint tracker',
      'Interactive data visualizations via Recharts and downloadable PDF executive reports',
      'SaaS-ready architecture with tiered feature gating and monetization roadmap',
    ],
    story: {
      why: "InceptIQ was a project I built straight from the heart. I didn't want to build just another student portfolio project—I set out to create a genuine, production-grade SaaS product that could stand on its own in the commercial market. I wanted to build something so valuable that founders and hackers would actually consider paying for it. The original vision was an AI-powered startup feasibility engine: entrepreneurs submit their concept and receive structured market signals, competitor maps, risk matrices, and validation scores powered by Google Gemini. But as I tested it, I realized validation isn't just a slow, months-long corporate process—hackathon teams need that exact same rapid clarity in intense 24- to 48-hour pressure cookers. That sparked the evolution of InceptIQ into a dual-engine platform featuring the Hackathon War Room.",
      thoughtProcess: "When developing InceptIQ, I focused on building the mechanics of a real SaaS platform:\n\n• Structured AI Inference with Gemini: Rather than relying on generic chat replies, I engineered the Express backend to force Google Gemini into structured JSON payloads. This fed directly into Recharts dashboard visualizations, feasibility scorecards, and automated PDF executive reports.\n\n• The Hackathon War Room: Hackathons are chaotic races against time. I built a real-time 'War Room' dashboard equipped with a live countdown timer, milestone checkpoints, and sprint task boards. It keeps teams synchronized, helps them track remaining hours, and accelerates pitch preparation so they can deliver polished demos before the final deadline.\n\n• SaaS Architecture & Monetization Readiness: Designed the application around a multi-tier subscription model with planned payment gateway integration (Razorpay), structured route gating, and scalable user data handling.",
      learnings: "InceptIQ taught me the difference between writing code and building a viable SaaS product. It humbled me: building something 'good enough' is easy, but engineering a product with enough polish, reliability, and value that users will pull out their credit cards is an entirely different level of mastery. While InceptIQ hasn't fully reached my highest commercial ideals yet, treating it as a live, evolving laboratory has taught me more about product architecture, AI integration, and developer urgency than anything else I've built.",
      videoUrl: null,
    },
    tags: ['React', 'Node.js', 'Express', 'Google Gemini', 'SaaS', 'Recharts'],
    github: 'https://github.com/13507-IN/InceptIQ',
    demo: 'https://incept-iq.vercel.app/',
    image: InceptIQImage,
    alt: 'InceptIQ startup analysis preview',
  },
  {
    id: 'rishiraj-auth',
    title: 'Rishiraj Auth',
    category: 'Backend',
    description: 'A customizable multi-role authentication engine with token rotation, OAuth, and zero vendor lock-in.',
    longDescription:
      'A Node and Express authentication engine built to eliminate third-party vendor lock-in. Features multi-tier role-based access control (RBAC), short-lived access tokens with rotating refresh tokens, Google OAuth, and customizable middleware.',
    highlights: [
      'Multi-tier RBAC for complex roles (Admin, User, Observer, Evaluator)',
      'Short-lived JWT access tokens with persistent refresh token rotation',
      'Native Google OAuth integration with customizable redirect middleware',
      'Prisma & PostgreSQL data layer with zero external watermarks or bloat',
    ],
    story: {
      why: "While working on a project at a startup called Zynvo, our team kept hitting endless headaches with authentication. Redirection loops would break, sign-up flows failed randomly, and debugging third-party services like Clerk and Auth0 devoured hours of productive engineering time. On top of that, vendor free tiers imposed ugly watermarks and rigid customization barriers. As I built more projects, I got tired of outsourcing something as fundamental as user identity to brittle third-party black boxes. I decided to eliminate the vendor hassle and build my own fully customizable, multi-tier authentication engine from scratch.",
      thoughtProcess: "When architecting Rishiraj Auth, I focused on solving the exact failure points I experienced in production:\n\n• Multi-Tier Role-Based Access Control (RBAC): Modern applications don't just have 'users' and 'admins'—they require complex hierarchies with observers, evaluators, and custom permissions. I built customizable middleware that dynamically verifies permissions without vendor restrictions.\n\n• The Dual-Token Lifecycle (Access + Refresh): Few things ruin user experience like getting kicked out to the login screen after 4 minutes of inactivity. I implemented short-lived temporary access tokens for secure API requests, backed by secure, rotating refresh tokens for seamless session persistence.\n\n• Clean OAuth & Zero-Watermark Control: Integrated Google OAuth flows natively into the pipeline, giving developers complete control over session state, error handling, and redirection flows without vendor lock-in.",
      learnings: "Building Rishiraj Auth cemented my understanding of core backend fundamentals. There is a huge difference between knowing what a JWT is in theory and actually engineering a resilient, production-ready auth system that prevents session hijacking, handles token lifecycle expiration gracefully, and enforces security boundaries. Authentication and authorization are the bedrock of backend engineering—if your auth layer is compromised, your whole application is at risk. Building this from primitives gave me deep confidence in designing defensive, scalable server-side systems.",
      videoUrl: null,
    },
    tags: ['Node.js', 'Express', 'JWT', 'OAuth', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/13507-IN/Rishiraj-Auth',
    demo: null,
    image: null,
    alt: 'Rishiraj Auth API project',
  },
  {
    id: 'scholarcatalyst',
    title: 'ScholarCatalyst',
    category: 'Full Stack',
    description: 'A scholarship discovery platform with student tools and an admin dashboard.',
    longDescription:
      'ScholarCatalyst brings scholarship search together with student profiles, application tracking, document management, and community pages. The repository contains a React frontend and an Express backend using MongoDB.',
    highlights: [
      'Scholarship search and application tracking pages',
      'Student profile, document vault, and deadline calendar',
      'React frontend with Express and MongoDB backend',
    ],
    tags: ['React', 'Express', 'MongoDB'],
    github: 'https://github.com/13507-IN/ScholarCatalyst',
    demo: 'https://scholar-catalyst.vercel.app/',
    image: ScholarCatalystImage,
    alt: 'ScholarCatalyst scholarship platform preview',
  },
  {
    id: 'finmate',
    title: 'FinMate',
    category: 'Full Stack',
    description: 'A personal finance app for transactions, budgets, savings goals, and reports.',
    longDescription:
      'FinMate is a PHP and MySQL finance application. Users can track income and expenses, set category budgets and savings goals, filter by date, and explore charts and exportable reports.',
    highlights: [
      'Account login and transaction management',
      'Category budgets, savings goals, and charts',
      'Responsive interface with exportable reports',
    ],
    tags: ['PHP', 'MySQL', 'Bootstrap', 'Chart.js'],
    github: 'https://github.com/13507-IN/FinMate',
    demo: null,
    image: FinMateImage,
    alt: 'FinMate finance dashboard preview',
  },
  {
    id: 'taskmaster',
    title: 'TaskMaster',
    category: 'Frontend',
    description: 'A small, responsive task manager built with plain JavaScript.',
    longDescription:
      'TaskMaster is a focused task manager built with HTML, CSS, and JavaScript. It demonstrates practical DOM work and a clean interface without a framework.',
    highlights: [
      'Framework-free JavaScript interface',
      'Responsive layout for everyday task management',
      'Live demo and public source',
    ],
    tags: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/13507-IN/TaskMaster',
    demo: 'https://task-master-six-tau.vercel.app/',
    image: ToDoImage,
    alt: 'TaskMaster to-do app preview',
  },
  {
    id: 'clip',
    title: 'Clip',
    category: 'Backend',
    description: 'An ultra-fast Rust URL shortener API engineered for sub-2ms latency and minimal memory overhead.',
    longDescription:
      'Clip is a high-performance backend microservice written in Rust using Axum and SQLx. Engineered with low-latency in-memory caching and PostgreSQL persistence, it resolves redirects and tracks analytics in under 2 milliseconds without garbage collection pauses.',
    highlights: [
      'Sub-2ms redirect resolution and ultra-low latency API',
      'Written in Rust with Axum async routes & SQLx PostgreSQL persistence',
      'In-memory link caching layer to minimize database roundtrips',
      'Pure systems microservice architecture with redirect analytics tracking',
    ],
    story: {
      why: "After hearing about Rust's reputation for memory safety and blazing speed, I decided to go all-in. I spent over a month studying the official Rust Book, writing practice programs, and debating with seniors to truly wrap my head around ownership, borrowing, and lifetimes. Once the foundations clicked, I refused to stay trapped in tutorial purgatory. I wanted to build a real backend service where efficiency genuinely matters. While a URL shortener sounds simple on paper, it is the ultimate stress test for latency: a redirect must resolve instantaneously or the user experience falls apart.",
      thoughtProcess: "With Clip, my singular obsession was latency optimization and zero bloat:\n\n• Systems-Level Concurrency in Rust: Built on Axum and SQLx to harness asynchronous I/O and zero-cost abstractions without unpredictable garbage collection pauses.\n\n• Sub-2ms Resolution via In-Memory Caching: Rather than querying PostgreSQL on every hit, I implemented a lightweight in-memory cache for frequently accessed links, cutting lookup times down to 1–2 milliseconds.\n\n• Deliberate Backend Focus: I intentionally kept this purely as a backend service first. I wanted to focus 100% on API throughput, route encoding, and database connection pooling before wrapping it in a frontend interface.",
      learnings: "Clip proved to me that fighting the Rust borrow checker is worth every second. Wrestling with lifetimes and thread-safe data structures completely transformed how I think about memory allocation and runtime costs in every other language I write. It shifted my perspective from someone who simply glues web APIs together to an engineer who understands what happens all the way down at the systems level.",
      videoUrl: null,
    },
    tags: ['Rust', 'Axum', 'PostgreSQL', 'SQLx', 'Systems'],
    github: 'https://github.com/13507-IN/Clip',
    demo: null,
    image: null,
    alt: 'Clip URL shortener API',
  },
  {
    id: 'barcelona',
    title: 'Barcelona',
    category: 'Full Stack',
    description: 'A football site bringing match information and squad data into one interface.',
    longDescription:
      'A club-focused web application that presents match and squad information through a responsive interface, backed by Python data gathering.',
    highlights: [
      'Match and squad information in one place',
      'Responsive frontend',
      'Public repository and live deployment',
    ],
    tags: ['Python', 'JavaScript', 'Web'],
    github: 'https://github.com/13507-IN/Barcelona',
    demo: 'https://barcalona.vercel.app',
    image: null,
    alt: 'Barcelona football site',
  },
];

export default function Projects() {
  const [projectList, setProjectList] = useState(projects);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllOther, setShowAllOther] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsSyncing(true);

    fetchGitHubProjects(projects)
      .then((merged) => {
        if (isMounted && Array.isArray(merged) && merged.length > 0) {
          setProjectList(merged);
        }
      })
      .catch((err) => {
        console.warn('GitHub auto-sync error:', err);
      })
      .finally(() => {
        if (isMounted) setIsSyncing(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Top 3 Flagship Projects
  const featuredProjects = FEATURED_IDS.map((id) =>
    projectList.find(
      (p) =>
        p.id === id ||
        p.title.toLowerCase().replace(/[^a-z0-9]/g, '') === id.replace(/[^a-z0-9]/g, '')
    )
  ).filter(Boolean);

  // Fallback to top 3 if any missing
  while (featuredProjects.length < 3 && projectList.length > featuredProjects.length) {
    const next = projectList.find((p) => !featuredProjects.some((f) => f.id === p.id));
    if (next) featuredProjects.push(next);
    else break;
  }

  // All Other Projects
  const allOtherProjects = projectList.filter(
    (p) => !featuredProjects.some((f) => f.id === p.id)
  );

  const filteredOtherProjects = allOtherProjects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const displayedOtherProjects = showAllOther
    ? filteredOtherProjects
    : filteredOtherProjects.slice(0, 6);

  return (
    <section id="projects" className="section-shell relative overflow-hidden bg-background">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* SECTION 1: TOP 3 FLAGSHIP SHOWCASE */}
      <div className="page-width mb-14 sm:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="section-kicker m-0">Flagship Works // 01 — 03</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                <span className={`h-1.5 w-1.5 rounded-full bg-emerald-400 ${isSyncing ? 'animate-ping' : 'animate-pulse'}`} />
                {isSyncing ? 'Syncing GitHub...' : 'Live Synced'}
              </span>
            </div>
            <h2 className="section-heading text-foreground">
              Core Works & Case Studies
            </h2>
          </div>

          <p className="text-muted text-sm sm:text-base max-w-md">
            Three marquee systems highlighting founder-led product design, security protocols, and SaaS AI workflows.
          </p>
        </div>

        {/* Top 3 Bento Showcase Grid */}
        <div className="space-y-6">
          {/* Card 01: CampusSpace (Full-width Hero Card) */}
          {featuredProjects[0] && (
            <FeaturedHeroCard
              project={featuredProjects[0]}
              onInspect={() => setSelectedProject(featuredProjects[0])}
            />
          )}

          {/* Cards 02 & 03: Dual Column Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects[1] && (
              <FeaturedDualCard
                project={featuredProjects[1]}
                indexLabel="02 // BACKEND & SECURITY"
                onInspect={() => setSelectedProject(featuredProjects[1])}
              />
            )}
            {featuredProjects[2] && (
              <FeaturedDualCard
                project={featuredProjects[2]}
                indexLabel="03 // AI SAAS & WAR ROOM"
                onInspect={() => setSelectedProject(featuredProjects[2])}
              />
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: ALL OTHER PROJECTS & GITHUB REPOSITORIES */}
      <div className="page-width pt-10 border-t border-border/70">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="section-kicker m-0 text-muted-2">Explore The Archive</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              All Projects & Repositories
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Showing {filteredOtherProjects.length} projects auto-synced directly from GitHub (13507-IN).
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or stack..."
                className="w-full sm:w-56 rounded-xl border border-border bg-surface-2/80 pl-9 pr-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-surface/80 p-1 backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                      : 'text-muted hover:text-foreground hover:bg-surface-2'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Other Projects Grid */}
        {displayedOtherProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted text-sm">
            No projects found matching &quot;{searchQuery}&quot; in category &quot;{activeCategory}&quot;.
          </div>
        ) : (
          <Motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {displayedOtherProjects.map((project, index) => (
                <Motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onInspect={() => setSelectedProject(project)}
                  />
                </Motion.div>
              ))}
            </AnimatePresence>
          </Motion.div>
        )}

        {/* Show More / Show Less Toggle Button */}
        {filteredOtherProjects.length > 6 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAllOther((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/90 px-6 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-surface-3 transition-all shadow-sm"
            >
              <span>{showAllOther ? 'Show Less' : `View All Projects (${filteredOtherProjects.length})`}</span>
              {showAllOther ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal Dialog */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

/**
 * Project 01: Top Hero Showcase Card (CampusSpace)
 */
function FeaturedHeroCard({ project, onInspect }) {
  return (
    <div className="featured-hero-card group overflow-hidden p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-12 items-center">
        {/* Left Side: Editorial Story Details */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-bold tracking-wider uppercase text-primary">
              01 // FOUNDER PROJECT
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live at campusspacee.com
            </span>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-base sm:text-lg text-muted font-normal leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Spark Quote */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
            <p className="text-xs sm:text-sm italic text-foreground/90 leading-relaxed font-normal">
              &ldquo;Student group chats were flooded with chaotic sales. I realized campus communities needed their own dedicated micro-economy—a trusted space where students could discover, chat, and trade without the noise.&rdquo;
            </p>
          </div>

          {/* Highlights Checklist */}
          <div className="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary shrink-0" />
              <span>Campus-specific student marketplace</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary shrink-0" />
              <span>Built-in private direct messaging</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary shrink-0" />
              <span>Real-time campus events discovery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary shrink-0" />
              <span>Under 30-second mobile listing flow</span>
            </div>
          </div>

          {/* Tags & Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onInspect}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-105 transition-all"
              >
                <BookOpen size={15} />
                <span>Read Story & Thinking</span>
              </button>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all"
                >
                  <span>Visit Live</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Visual Graphic Canvas */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-950 p-6 flex flex-col justify-between shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_70%)]" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary-light">
                CAMPUSSPACEE.COM
              </span>
              <span className="text-xs font-mono text-muted">LIVE ENGINE</span>
            </div>

            <div className="relative z-10 text-center py-6">
              <span className="text-5xl sm:text-6xl font-black tracking-tighter text-foreground/20 select-none block">
                CAMPUS
              </span>
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-indigo-300 to-purple-400 bg-clip-text text-transparent block -mt-2">
                SPACE
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-muted-2 border-t border-white/10 pt-3">
              <span>FOUNDER-LED</span>
              <span>VERIFIED STUDENTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Projects 02 & 03: Dual Column Showcase Card
 */
function FeaturedDualCard({ project, indexLabel, onInspect }) {
  return (
    <div className="featured-bento-card group flex flex-col justify-between p-6 sm:p-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider uppercase text-primary">
            {indexLabel}
          </span>
          <span className="text-xs font-semibold text-muted font-mono">
            {project.category}
          </span>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted font-normal leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-2 pt-2">
          {project.highlights.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted">
              <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/80 bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onInspect}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-light transition-colors py-1 px-2"
          >
            <span>Story & Thinking</span>
            <ArrowUpRight size={14} />
          </button>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-muted hover:text-foreground hover:bg-surface-2 transition-colors"
              title="View GitHub Repository"
            >
              <Github size={16} />
            </a>
          )}
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-muted hover:text-foreground hover:bg-surface-2 transition-colors"
              title="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Compact Project Card for the "Other Projects" Catalog
 */
function ProjectCard({ project, index, onInspect }) {
  const gradientClass = gradients[index % gradients.length];
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpotlight({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
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
      className="glass-glow-card group relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface/90 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-md flex flex-col h-full"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(99, 102, 241, 0.18), transparent 60%)`,
        }}
      />

      {/* Card Header Media */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-3">
        {project.image ? (
          <img
            src={project.image}
            alt={project.alt || project.title}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
            <span className="select-none text-3xl font-extrabold tracking-tighter text-foreground/15 sm:text-4xl group-hover:scale-110 transition-transform duration-500">
              {project.title}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

        <div className="absolute left-3.5 top-3.5 z-20 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            {project.category}
          </span>
          {project.stars !== undefined && project.stars > 0 && (
            <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-black/50 px-2 py-0.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
              <Star size={11} className="fill-amber-300" />
              {project.stars}
            </span>
          )}
          {project.isAutoSynced && (
            <span className="rounded-full border border-emerald-500/30 bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
              Live Repo
            </span>
          )}
        </div>

        <div className="absolute left-4 bottom-3 z-20">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-primary-light transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Card Content Footer */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <p className="text-xs sm:text-sm leading-relaxed text-muted line-clamp-2">
          {project.description}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-border/60">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/80 bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onInspect}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-light transition-colors"
              aria-label={`View details for ${project.title}`}
            >
              Details <ArrowUpRight size={13} />
            </button>

            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded text-muted hover:text-foreground"
                title="Live Demo"
              >
                <ExternalLink size={13} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded text-muted hover:text-foreground"
                title="View Source on GitHub"
              >
                <Github size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
