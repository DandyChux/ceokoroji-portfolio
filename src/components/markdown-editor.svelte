<script lang="ts">
	import { renderMarkdown } from "$lib/utils/markdown";

	interface Props {
		value: string;
		onchange?: (value: string) => void;
		placeholder?: string;
		height?: string;
	}

	let {
		value = $bindable(""),
		onchange,
		placeholder = "Write your markdown here...",
		height = "500px",
	}: Props = $props();

	let showPreview = $state(true);
	let activeTab = $state<"write" | "preview" | "split">("split");

	// Reactive HTML rendering
	let renderedHTML = $derived(renderMarkdown(value));

	function handleInput(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		value = target.value;
		if (onchange) {
			onchange(value);
		}
	}

	function insertMarkdown(syntax: string, placeholder: string = "") {
		const textarea = document.querySelector(
			".markdown-textarea",
		) as HTMLTextAreaElement;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = value.substring(start, end) || placeholder;

		const before = value.substring(0, start);
		const after = value.substring(end);

		// Handle different syntax types
		let newText = "";
		let cursorOffset = 0;

		if (syntax === "bold") {
			newText = `${before}**${selectedText}**${after}`;
			cursorOffset = start + 2 + selectedText.length;
		} else if (syntax === "italic") {
			newText = `${before}_${selectedText}_${after}`;
			cursorOffset = start + 1 + selectedText.length;
		} else if (syntax === "code") {
			newText = `${before}\`${selectedText}\`${after}`;
			cursorOffset = start + 1 + selectedText.length;
		} else if (syntax === "link") {
			newText = `${before}[${selectedText}](url)${after}`;
			cursorOffset = start + selectedText.length + 3;
		} else if (syntax === "image") {
			newText = `${before}![${selectedText}](image-url)${after}`;
			cursorOffset = start + selectedText.length + 4;
		} else if (syntax === "h1") {
			newText = `${before}# ${selectedText}${after}`;
			cursorOffset = start + 2 + selectedText.length;
		} else if (syntax === "h2") {
			newText = `${before}## ${selectedText}${after}`;
			cursorOffset = start + 3 + selectedText.length;
		} else if (syntax === "h3") {
			newText = `${before}### ${selectedText}${after}`;
			cursorOffset = start + 4 + selectedText.length;
		} else if (syntax === "ul") {
			newText = `${before}- ${selectedText}${after}`;
			cursorOffset = start + 2 + selectedText.length;
		} else if (syntax === "ol") {
			newText = `${before}1. ${selectedText}${after}`;
			cursorOffset = start + 3 + selectedText.length;
		} else if (syntax === "code-block") {
			newText = `${before}\`\`\`\n${selectedText}\n\`\`\`${after}`;
			cursorOffset = start + 4 + selectedText.length;
		}

		value = newText;
		if (onchange) onchange(value);

		// Restore cursor position
		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(cursorOffset, cursorOffset);
		}, 0);
	}
</script>

<div class="markdown-editor border border-border rounded-lg overflow-hidden">
	<!-- Toolbar -->
	<div class="flex items-center gap-2 p-2 border-b border-border bg-muted/30">
		<!-- View mode tabs -->
		<div class="flex gap-1 mr-4">
			<button
				onclick={() => (activeTab = "write")}
				class="px-3 py-1 text-sm rounded {activeTab === 'write'
					? 'bg-background'
					: 'hover:bg-background/50'}"
			>
				Write
			</button>
			<button
				onclick={() => (activeTab = "preview")}
				class="px-3 py-1 text-sm rounded {activeTab === 'preview'
					? 'bg-background'
					: 'hover:bg-background/50'}"
			>
				Preview
			</button>
			<button
				onclick={() => (activeTab = "split")}
				class="px-3 py-1 text-sm rounded {activeTab === 'split'
					? 'bg-background'
					: 'hover:bg-background/50'}"
			>
				Split
			</button>
		</div>

		<div class="h-6 w-px bg-border"></div>

		<!-- Markdown toolbar buttons -->
		<button
			onclick={() => insertMarkdown("bold", "bold text")}
			class="p-1.5 hover:bg-background rounded"
			title="Bold"
		>
			<strong>B</strong>
		</button>
		<button
			onclick={() => insertMarkdown("italic", "italic text")}
			class="p-1.5 hover:bg-background rounded"
			title="Italic"
		>
			<em>I</em>
		</button>
		<button
			onclick={() => insertMarkdown("code", "code")}
			class="p-1.5 hover:bg-background rounded font-mono text-sm"
			title="Inline Code"
		>
			&lt;/&gt;
		</button>
		<button
			onclick={() => insertMarkdown("link", "link text")}
			class="p-1.5 hover:bg-background rounded"
			title="Link"
		>
			🔗
		</button>
		<button
			onclick={() => insertMarkdown("image", "alt text")}
			class="p-1.5 hover:bg-background rounded"
			title="Image"
		>
			🖼️
		</button>

		<div class="h-6 w-px bg-border"></div>

		<button
			onclick={() => insertMarkdown("h1", "Heading 1")}
			class="p-1.5 hover:bg-background rounded font-bold"
			title="Heading 1"
		>
			H1
		</button>
		<button
			onclick={() => insertMarkdown("h2", "Heading 2")}
			class="p-1.5 hover:bg-background rounded font-bold"
			title="Heading 2"
		>
			H2
		</button>
		<button
			onclick={() => insertMarkdown("h3", "Heading 3")}
			class="p-1.5 hover:bg-background rounded font-bold"
			title="Heading 3"
		>
			H3
		</button>

		<div class="h-6 w-px bg-border"></div>

		<button
			onclick={() => insertMarkdown("ul", "List item")}
			class="p-1.5 hover:bg-background rounded"
			title="Bullet List"
		>
			• List
		</button>
		<button
			onclick={() => insertMarkdown("ol", "List item")}
			class="p-1.5 hover:bg-background rounded"
			title="Numbered List"
		>
			1. List
		</button>
		<button
			onclick={() => insertMarkdown("code-block", "code here")}
			class="p-1.5 hover:bg-background rounded font-mono text-sm"
			title="Code Block"
		>
			&lbrace;&rbrace;
		</button>
	</div>

	<!-- Editor area -->
	<div class="flex" style="height: {height}">
		<!-- Write tab -->
		{#if activeTab === "write" || activeTab === "split"}
			<textarea
				class="markdown-textarea flex-1 p-4 bg-background resize-none focus:outline-none font-mono text-sm"
				{placeholder}
				{value}
				oninput={handleInput}
			></textarea>
		{/if}

		<!-- Preview tab -->
		{#if activeTab === "preview" || activeTab === "split"}
			<div
				class="flex-1 p-4 overflow-y-auto prose prose-sm dark:prose-invert max-w-none
				       {activeTab === 'split' ? 'border-l border-border' : ''}"
			>
				{#if value.trim()}
					{@html renderedHTML}
				{:else}
					<p class="text-muted-foreground italic">
						Preview will appear here...
					</p>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.prose) {
		color: inherit;
	}

	:global(.prose h1) {
		font-size: 2em;
		font-weight: 700;
		margin-top: 1em;
		margin-bottom: 0.5em;
	}

	:global(.prose h2) {
		font-size: 1.5em;
		font-weight: 600;
		margin-top: 1em;
		margin-bottom: 0.5em;
	}

	:global(.prose h3) {
		font-size: 1.25em;
		font-weight: 600;
		margin-top: 0.75em;
		margin-bottom: 0.5em;
	}

	:global(.prose p) {
		margin-top: 0.75em;
		margin-bottom: 0.75em;
		line-height: 1.7;
	}

	:global(.prose pre) {
		background-color: #1e1e1e;
		padding: 1em;
		border-radius: 0.5em;
		overflow-x: auto;
		margin: 1em 0;
	}

	:global(.prose code) {
		background-color: rgba(0, 0, 0, 0.1);
		padding: 0.2em 0.4em;
		border-radius: 0.25em;
		font-size: 0.9em;
	}

	:global(.prose pre code) {
		background-color: transparent;
		padding: 0;
	}

	:global(.prose a) {
		color: hsl(var(--accent));
		text-decoration: underline;
	}

	:global(.prose ul, .prose ol) {
		margin-top: 0.75em;
		margin-bottom: 0.75em;
		padding-left: 1.5em;
	}

	:global(.prose li) {
		margin-top: 0.25em;
		margin-bottom: 0.25em;
	}

	:global(.prose blockquote) {
		border-left: 4px solid hsl(var(--border));
		padding-left: 1em;
		font-style: italic;
		color: hsl(var(--muted-foreground));
	}

	:global(.prose img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5em;
		margin: 1em 0;
	}

	:global(.prose table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1em 0;
	}

	:global(.prose th, .prose td) {
		border: 1px solid hsl(var(--border));
		padding: 0.5em;
		text-align: left;
	}

	:global(.prose th) {
		background-color: hsl(var(--muted));
		font-weight: 600;
	}
</style>
