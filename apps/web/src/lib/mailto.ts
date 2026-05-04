/**
 * Mailto Utility — builds mailto links and opens application emails
 * Per PRD Section 7.5
 */

export function buildMailtoLink(
  hrEmail: string,
  jobTitle: string,
  userName: string,
  coverLetter: string
): string {
  const subject = `Application for ${jobTitle} — ${userName}`;
  const body = coverLetter.slice(0, 1500); // hard cap
  return `mailto:${hrEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function openApplicationEmail(
  hrEmail: string,
  jobTitle: string,
  userName: string,
  coverLetter: string
): Promise<void> {
  // Copy cover letter to clipboard first as backup
  try {
    await navigator.clipboard.writeText(coverLetter);
  } catch {
    // Clipboard API may fail in some contexts — continue anyway
    console.warn('Could not copy to clipboard');
  }

  // Open mailto link
  window.location.href = buildMailtoLink(hrEmail, jobTitle, userName, coverLetter);
}

export function buildWhatsAppShareLink(url: string, jobTitle: string): string {
  const text = `Check out this job on Jhub: ${jobTitle} — ${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
