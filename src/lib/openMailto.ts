export function buildMailtoUrl(params: {
  to: string;
  subject?: string;
  body?: string;
}) {
  const { to, subject, body } = params;
  const q = new URLSearchParams();
  if (subject) q.set('subject', subject);
  if (body) q.set('body', body);
  const query = q.toString();
  return `mailto:${to}${query ? `?${query}` : ''}`;
}

/**
 * Attempts to open the user's email client reliably across browsers/iframes.
 * Returns true if a new window was opened, false otherwise.
 */
export function openMailto(params: { to: string; subject?: string; body?: string }) {
  const url = buildMailtoUrl({
    to: params.to,
    subject: params.subject ? encodeURIComponent(params.subject) : undefined,
    body: params.body ? encodeURIComponent(params.body) : undefined,
  });

  try {
    // Best-effort: try a popup first (often required in embedded previews)
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (w) return true;
  } catch {
    // ignore
  }

  try {
    window.location.href = url;
  } catch {
    // ignore
  }

  return false;
}
