import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/** Converts admin-written Markdown to HTML. External links open in a new tab. */
export function renderMarkdown(source: string) {
  const html = marked.parse(source || "", { async: false }) as string;
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
}

/** Extracts `## headings` for a table of contents. */
export function extractHeadings(source: string) {
  return (source.match(/^##\s+.+$/gm) ?? []).map((line) => line.replace(/^##\s+/, "").trim());
}
