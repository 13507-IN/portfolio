import { AnimatePresence, motion as Motion } from 'framer-motion';

const loaderWords = ['Developer', 'Engineer', 'Builder'];

export default function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <Motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } }}
        >
          <div className="loader-grid" />
          <Motion.div
            className="loader-panel"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18, transition: { duration: 0.35 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Motion.p
              className="loader-kicker"
              initial={{ letterSpacing: '0.35em', opacity: 0 }}
              animate={{ letterSpacing: '0.24em', opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              Portfolio loading
            </Motion.p>

            <div className="overflow-hidden">
              <Motion.h1
                className="loader-title"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                Rishiraj.dev
              </Motion.h1>
            </div>

            <div className="loader-word-stack" aria-hidden="true">
              {loaderWords.map((word, index) => (
                <Motion.span
                  key={word}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [18, 0, 0, -18],
                  }}
                  transition={{
                    duration: 1.35,
                    delay: 0.45 + index * 0.26,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </Motion.span>
              ))}
            </div>

            <div className="loader-track">
              <Motion.div
                className="loader-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35, duration: 1.75, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
