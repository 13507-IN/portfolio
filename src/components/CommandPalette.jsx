import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import {
  Search,
  User,
  FolderGit2,
  Wrench,
  Mail,
  Home,
  Sun,
  Moon,
  Github,
  ExternalLink,
  Copy,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onToggleTheme, theme }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const actions = [
    {
      id: 'nav-hero',
      category: 'Navigation',
      label: 'Go to Home',
      icon: Home,
      action: () => {
        window.location.hash = '#hero';
        onClose();
      },
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      label: 'Go to About Me',
      icon: User,
      action: () => {
        window.location.hash = '#about';
        onClose();
      },
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      label: 'Explore Selected Work',
      icon: FolderGit2,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      },
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      label: 'View Tech Toolkit',
      icon: Wrench,
      action: () => {
        window.location.hash = '#skills';
        onClose();
      },
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      label: 'Contact & Connect',
      icon: Mail,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      },
    },
    {
      id: 'action-theme',
      category: 'Quick Actions',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'action-copy-email',
      category: 'Quick Actions',
      label: 'Copy Email Address',
      icon: copied ? Check : Copy,
      action: () => {
        navigator.clipboard.writeText('rishirajnatj@gmail.com');
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          onClose();
        }, 1200);
      },
    },
    {
      id: 'action-github',
      category: 'External Links',
      label: 'Visit GitHub Profile',
      icon: Github,
      action: () => {
        window.open('https://github.com/13507-IN', '_blank');
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null; // Handled globally in App or Header
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter' && filteredActions[selectedIndex]) {
        e.preventDefault();
        filteredActions[selectedIndex].action();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          <Motion.div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <Motion.div
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border/80 bg-surface/95 shadow-2xl backdrop-blur-2xl"
            initial={{ opacity: 0, scale: 0.94, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header Search Input */}
            <div className="flex items-center border-b border-border/60 px-5 py-4">
              <Search size={20} className="text-primary mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-base text-foreground placeholder-muted-2 outline-none font-medium"
              />
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-muted hover:bg-surface-2 hover:text-foreground transition-colors"
                aria-label="Close command palette"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Actions List */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1 scrollbar-thin">
              {filteredActions.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-2">
                  No matching commands found for &quot;{query}&quot;
                </div>
              ) : (
                filteredActions.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-150 ${
                        isSelected
                          ? 'bg-primary/10 border border-primary/25 text-primary'
                          : 'text-foreground hover:bg-surface-2'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`p-2 rounded-xl border ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-surface-2 border-border text-muted'
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{item.label}</p>
                          <p className="text-xs text-muted-2">{item.category}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-xs font-mono font-medium px-2 py-1 rounded bg-primary/15 text-primary">
                          ↵ Enter
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer tips */}
            <div className="flex items-center justify-between border-t border-border/60 bg-surface-2/60 px-5 py-2.5 text-xs text-muted-2">
              <span className="flex items-center gap-1">
                <Sparkles size={13} className="text-primary" />
                Press <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono">↑</kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono">↓</kbd> to navigate
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono">ESC</kbd> to close
              </span>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
