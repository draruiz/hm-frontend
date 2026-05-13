const HTML_TAG_RE = /<[^>]*>/g;
const DANGEROUS_CHARS_RE = /[<>"'`]/g;

export function sanitizeInput(value: string): string {
  return value.replace(HTML_TAG_RE, "").replace(DANGEROUS_CHARS_RE, "").trim();
}
