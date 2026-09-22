import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { socialProfiles } from "../data/content";

const ICONS = [
  { href: socialProfiles.github, Icon: FaGithub, label: "GitHub" },
  { href: socialProfiles.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
  { href: socialProfiles.facebook, Icon: FaFacebook, label: "Facebook" },
  { href: socialProfiles.instagram, Icon: FaInstagram, label: "Instagram" },
];

export default function SocialIcons({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {ICONS.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="group grid place-items-center h-11 w-11 rounded-full border border-line text-muted hover:text-ink hover:bg-spark hover:border-spark transition-all duration-300 hover:-translate-y-1"
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}
