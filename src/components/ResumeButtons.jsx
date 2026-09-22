import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { resume } from "../data/content";
import GlowButton from "./GlowButton";

export default function ResumeButtons({ className = "" }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <GlowButton as="a" href={resume.download} target="_blank" rel="noreferrer" variant="solid">
        <FaDownload size={13} /> Download resume
      </GlowButton>
      <GlowButton as="a" href={resume.view} target="_blank" rel="noreferrer" variant="outline">
        <FaExternalLinkAlt size={12} /> View online
      </GlowButton>
    </div>
  );
}
