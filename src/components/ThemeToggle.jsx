import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

export default function ThemeToggle({ theme, toggle }) {
  const isLight = theme === "light";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid place-items-center h-10 w-10 rounded-full border border-line text-text hover:text-spark hover:border-spark/60 transition-colors active:scale-90"
    >
      {isLight ? <HiOutlineMoon size={18} /> : <HiOutlineSun size={18} />}
    </button>
  );
}
