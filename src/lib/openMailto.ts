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
 * Opens the user's email client.
 * Note: opening mailto: in a new tab often results in a blank tab in embedded previews,
 * so we intentionally open in the same browsing context.
 */
export function openMailto(params: { to: string; subject?: string; body?: string }) {
  const url = buildMailtoUrl({
    to: params.to,
    subject: params.subject,
    body: params.body,
  });

  try {
    // Use a real click to satisfy browser "user gesture" requirements
    const a = document.createElement('a');
    a.href = url;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  } catch {
    // ignore
  }

  try {
    window.location.assign(url);
    return true;
  } catch {
    // ignore
  }

  return false;
}
