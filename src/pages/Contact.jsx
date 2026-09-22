import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { meta, contactConfig } from "../data/content";
import Reveal from "../components/Reveal";
import GlowButton from "../components/GlowButton";
import { handleEmailClick, mailtoHref, gmailWebHref, isMobileDevice } from "../utils/contact";

const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const emailjsReady =
  EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", text: "" });

  useEffect(() => {
    document.title = `Contact | ${meta.title}`;
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Until EmailJS keys are added, hand the message to the visitor's mail app instead.
    if (!emailjsReady) {
      const opts = {
        subject: `Portfolio message from ${form.name}`,
        body: `${form.message}\n\n— ${form.name} (${form.email})`,
      };
      if (isMobileDevice()) {
        window.location.href = mailtoHref(contactConfig.email, opts);
      } else {
        window.open(gmailWebHref(contactConfig.email, opts), "_blank", "noopener,noreferrer");
      }
      setStatus({ state: "success", text: "Opening your email app with the message ready to send." });
      return;
    }

    setStatus({ state: "loading", text: "" });
    try {
      await emailjs.send(
        contactConfig.serviceId,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: contactConfig.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus({ state: "success", text: "Thanks — your message is on its way!" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        state: "error",
        text: "Something went wrong sending that. Try emailing me directly instead.",
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-32 pb-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-spark mb-4">Get in touch</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-text">Contact me</h1>
        <div className="h-px w-24 bg-gradient-to-r from-spark to-transparent mt-6" />
      </Reveal>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 mt-16">
        <Reveal>
          <p className="text-muted leading-relaxed mb-8">{contactConfig.description}</p>

          <div className="space-y-4">
            <a
              href={mailtoHref(contactConfig.email)}
              onClick={(e) => handleEmailClick(e, contactConfig.email)}
              className="flex items-center gap-4 p-4 rounded-xl border border-line glass hover:border-spark/50 transition-colors group"
            >
              <span className="grid place-items-center h-10 w-10 rounded-full bg-surface-2 text-spark">
                <HiOutlineMail size={18} />
              </span>
              <div>
                <p className="text-xs text-faint">Email</p>
                <p className="text-sm text-text group-hover:text-spark transition-colors">
                  {contactConfig.email}
                </p>
              </div>
            </a>

            <a
              href={`tel:${contactConfig.phoneIntl}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-line glass hover:border-spark/50 transition-colors group"
            >
              <span className="grid place-items-center h-10 w-10 rounded-full bg-surface-2 text-spark">
                <HiOutlinePhone size={18} />
              </span>
              <div>
                <p className="text-xs text-faint">Phone</p>
                <p className="text-sm text-text group-hover:text-spark transition-colors">
                  {contactConfig.phoneDisplay}
                </p>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                name="name"
                placeholder="Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-surface-2 border border-line focus:border-spark outline-none text-text placeholder:text-faint transition-colors"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-surface-2 border border-line focus:border-spark outline-none text-text placeholder:text-faint transition-colors"
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl bg-surface-2 border border-line focus:border-spark outline-none text-text placeholder:text-faint transition-colors resize-none"
            />
            <GlowButton type="submit" variant="solid" className="w-full sm:w-auto">
              {status.state === "loading" ? "Sending..." : "Send message"}
            </GlowButton>

            <AnimatePresence>
              {status.text && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-sm ${
                    status.state === "success" ? "text-spark" : "text-glow"
                  }`}
                >
                  {status.text}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
