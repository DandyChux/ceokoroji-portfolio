import { marked } from 'marked';
import hljs from 'highlight.js';

// Custom renderer for code blocks with syntax highlighting
const renderer = new marked.Renderer();

renderer.code = ({ lang, text }) => {
	// If language is specified and supported, highlight it
	if (lang && hljs.getLanguage(lang)) {
		try {
			const highlighted = hljs.highlight(text, { language: lang }).value;
			return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
		} catch (err) {
			console.error('Highlight error:', err);
		}
	}

	// Fallback: auto-detect or plain
	try {
		const highlighted = hljs.highlightAuto(text).value;
		return `<pre><code class="hljs">${highlighted}</code></pre>`;
	} catch (err) {
		return `<pre><code>${text}</code></pre>`;
	}
};

// Configure marked options
marked.use({
	renderer,
	breaks: true,
	gfm: true,
});

/**
 * Converts markdown to HTML
 * @param markdown - Raw markdown string
 * @returns Rendered HTML string
 */
export function renderMarkdown(markdown: string): string {
	if (!markdown) return '';

	try {
		return marked.parse(markdown) as string;
	} catch (error) {
		console.error('Markdown rendering error:', error);
		return '<p>Error rendering markdown</p>';
	}
}

/**
 * Sanitizes markdown for preview (optional - add DOMPurify if needed)
 */
export function sanitizeMarkdown(html: string): string {
	// For now, just return as-is
	// Consider adding DOMPurify for production: import DOMPurify from 'isomorphic-dompurify';
	// return DOMPurify.sanitize(html);
	return html;
}

/**
 * Generates a slug from a title
 */
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}
