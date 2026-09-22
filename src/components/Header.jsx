import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { logotext, socialProfiles } from "../data/content";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export default function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-lg shadow-black/10" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
          <NavLink
            to="/"
            className="font-display text-lg sm:text-xl font-semibold tracking-tight text-text flex items-center gap-2"
          >
            <span className="grid place-items-center h-9 w-9 rounded-xl border border-line text-spark font-display text-sm">
              {logotext}
            </span>
            <span className="hidden sm:inline">Ashish Acharya</span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-ink bg-spark"
                      : "text-muted hover:text-text"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden grid place-items-center h-10 w-10 rounded-full border border-line text-text active:scale-90 transition-transform"
            >
              {open ? <HiX size={20} /> : <HiMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl md:hidden"
          >
            <div className="h-full flex flex-col justify-between px-8 pt-28 pb-10">
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.35 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block py-4 font-display text-4xl tracking-tight border-b border-line ${
                          isActive ? "text-spark" : "text-text"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between text-sm text-muted"
              >
                <div className="flex gap-4">
                  <a href={socialProfiles.github} target="_blank" rel="noreferrer" className="hover:text-spark">
                    GitHub
                  </a>
                  <a href={socialProfiles.linkedin} target="_blank" rel="noreferrer" className="hover:text-spark">
                    LinkedIn
                  </a>
                </div>
                <p className="font-mono">&copy; {logotext}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
