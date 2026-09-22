import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// New page -> start at the top. #hash links -> smooth-scroll to the target
// once the (animated) page has mounted.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      tries += 1;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(timer);
      } else if (tries > 25) {
        clearInterval(timer);
      }
    }, 120);
    return () => clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
