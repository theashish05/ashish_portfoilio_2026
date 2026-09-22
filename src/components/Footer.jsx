import { logotext, contactConfig } from "../data/content";
import SocialIcons from "./SocialIcons";
import { handleEmailClick, mailtoHref } from "../utils/contact";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg text-text">{logotext}</p>
          <p className="text-sm text-muted mt-1">
            <a
              href={mailtoHref(contactConfig.email)}
              onClick={(e) => handleEmailClick(e, contactConfig.email)}
              className="hover:text-spark transition-colors"
            >
              {contactConfig.email}
            </a>
          </p>
        </div>
        <SocialIcons />
        <p className="text-xs font-mono text-faint order-last sm:order-none">
          &copy; {new Date().getFullYear()} Ashish Acharya
        </p>
      </div>
    </footer>
  );
}
