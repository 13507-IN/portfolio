import { useEffect, useState } from 'react';
import { motion as Motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setEnabled(true);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest('a, button, input, textarea, select, [role="button"]') !== null;
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      {/* Ambient glow trailing cursor */}
      <Motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full bg-primary/20 blur-xl dark:bg-primary/25"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 120 : 60,
          height: isHovered ? 120 : 60,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      />
      {/* Sharp central dot */}
      <Motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full border border-primary/50 bg-primary/40 backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 24 : 10,
          height: isHovered ? 24 : 10,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      />
    </>
  );
}
