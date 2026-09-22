const enc = encodeURIComponent;

export const isMobileDevice = () =>
  typeof navigator !== "undefined" &&
  /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent);

export function mailtoHref(email, { subject = "", body = "" } = {}) {
  const q = [];
  if (subject) q.push(`subject=${enc(subject)}`);
  if (body) q.push(`body=${enc(body)}`);
  return `mailto:${email}${q.length ? `?${q.join("&")}` : ""}`;
}

export function gmailWebHref(email, { subject = "", body = "" } = {}) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(email)}&su=${enc(subject)}&body=${enc(body)}`;
}

/**
 * Phones/tablets: let the plain mailto: link hand off to the mail app
 * (Gmail on most Android devices). Desktop: mailto: often does nothing,
 * so open a Gmail compose window instead.
 */
export function handleEmailClick(e, email, opts) {
  if (isMobileDevice() || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  window.open(gmailWebHref(email, opts), "_blank", "noopener,noreferrer");
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
