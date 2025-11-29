<script lang="ts">
	import { renderMarkdown } from "$lib/utils/markdown";
	import type { PageData } from "./$types";
	import { parseISO } from "date-fns";

	let { data }: { data: PageData } = $props();

	// Parse date if it's a string
	const parsedDate = $derived(
		data.post.date
			? typeof data.post.date === "string"
				? parseISO(data.post.date)
				: data.post.date
			: null,
	);

	// Render the markdown content
	let renderedContent = $derived(
		data.post ? renderMarkdown(data.post?.content) : "",
	);

	// Format date
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}
</script>

<svelte:head>
	<title>{data.post?.title} | Chukwuma Okoroji</title>
	<meta name="description" content={data.post?.description} />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<div class="w-full max-w-4xl mx-auto p-6 lg:p-12">
		<!-- Blog post content -->
		<article>
			<!-- Header -->
			<header class="mb-8">
				<a
					href="/blog"
					class="text-accent hover:underline mb-4 inline-block"
				>
					← Back to Blog
				</a>

				<h1 class="text-4xl lg:text-6xl font-bold mb-4">
					{data.post?.title}
				</h1>

				<div
					class="flex flex-wrap items-center gap-4 text-muted-foreground text-sm"
				>
					{#if parsedDate}
						<time datetime={parsedDate.toISOString()}>
							{formatDate(parsedDate.toString())}
						</time>
						<span>•</span>
					{/if}
					<span
						class="px-3 py-1 bg-primary/10 text-primary rounded-full"
					>
						{data.post?.category}
					</span>
					{#if data.post?.tags && data.post?.tags.length > 0}
						<span>•</span>
						<div class="flex gap-2">
							{#each data.post?.tags as tag}
								<span
									class="px-2 py-1 bg-muted/30 rounded text-xs"
								>
									#{tag}
								</span>
							{/each}
						</div>
					{/if}
				</div>

				<p class="text-xl text-muted-foreground mt-4">
					{data.post?.description}
				</p>
			</header>

			<hr class="border-border my-8" />

			<!-- Rendered markdown content -->
			<div class="prose prose-lg dark:prose-invert max-w-none">
				{@html renderedContent}
			</div>
		</article>
	</div>
</div>
