import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';

const roles = ['Full-Stack Developer', 'Systems & Backend', 'Open Source Contributor'];

export default function Loader({ isLoading, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return undefined;

    const startTime = Date.now();
    const duration = 1400;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 220);
      }
    }, 25);

    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 450);

    return () => {
      clearInterval(interval);
      clearInterval(roleInterval);
    };
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <Motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b14] text-white select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          {/* Glowing Ambient Radial Glows */}
          <div className="absolute h-96 w-96 rounded-full bg-primary/25 blur-[120px] pointer-events-none" />
          <div className="absolute h-80 w-80 rounded-full bg-violet-600/20 blur-[100px] -bottom-20 -right-20 pointer-events-none" />

          {/* Cyber Dot Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 pointer-events-none" />

          <div className="relative flex flex-col items-center text-center px-4 max-w-sm w-full">
            {/* Logo Squircle with the initial "R" (Website Indicator) */}
            <div className="relative mb-6">
              {/* Outer Pulsing Glow Ring */}
              <Motion.div
                className="absolute -inset-2 rounded-[2.2rem] bg-gradient-to-r from-primary via-purple-500 to-indigo-500 opacity-60 blur-md"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.85, 0.5],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Logo Card */}
              <Motion.div
                className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-[1.75rem] border border-white/25 bg-gradient-to-br from-primary via-indigo-600 to-violet-800 shadow-[0_12px_40px_rgba(79,70,229,0.5)]"
                initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* SVG Initial "R" matching favicon */}
                <svg
                  viewBox="0 0 64 64"
                  className="h-11 w-11 sm:h-13 sm:w-13 text-white fill-current drop-shadow-md"
                  role="img"
                  aria-label="Rishiraj Logo"
                >
                  <path d="M17 17h19c9 0 14 5 14 13 0 6-3 10-9 12l10 12H39L29 42h-1v12H17V17zm11 9v8h8c3 0 4-1 4-4 0-3-1-4-4-4h-8z" />
                </svg>
              </Motion.div>
            </div>

            {/* Brand Title */}
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Rishiraj<span className="text-primary-light">.dev</span>
              </h1>
            </Motion.div>

            {/* Role Switcher */}
            <div className="h-6 mt-1.5 overflow-hidden">
              <Motion.p
                key={roleIndex}
                className="text-xs sm:text-sm font-medium tracking-wider uppercase text-slate-400"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {roles[roleIndex]}
              </Motion.p>
            </div>

            {/* Progress Track & Numeric Counter */}
            <div className="w-full mt-6 space-y-2">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <Motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-indigo-400 to-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.7)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="tracking-widest">INITIALIZING</span>
                <span className="text-primary-light font-semibold">{progress}%</span>
              </div>
            </div>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
