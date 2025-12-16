<script lang="ts">
	import ShareLinks from "$components/share-links.svelte";
	import { renderMarkdown } from "$lib/utils/markdown";
	import { Clock } from "@lucide/svelte";
	import type { PageData } from "./$types";
	import { parseISO } from "date-fns";
	import readingTime from "$lib/utils/reading-time";

	let { data }: { data: PageData } = $props();

	// Parse date if it's a string
	const parsedDate = $derived(
		data.post.date
			? typeof data.post.date === "string"
				? parseISO(data.post.date)
				: data.post.date
			: null,
	);
	console.log("RAW DATE: ", data.post.date);
	// console.log("PARSED DATE: ", parseISO(data.post.date));

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

	// Format time
	function formatTime(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
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
						<time
							datetime={parsedDate.toISOString()}
							class="font-montserrat tracking-wide"
						>
							{formatDate(parsedDate.toString())} @ {formatTime(
								parsedDate.toString(),
							)}
						</time>
						<span>&bull;</span>
					{/if}
					<span
						class="px-3 py-1 bg-primary/10 text-primary rounded-full font-science-gothic"
					>
						{data.post?.category}
					</span>
					{#if data.post?.tags && data.post?.tags.length > 0}
						<span>&bull;</span>
						<div class="flex gap-2">
							{#each data.post?.tags as tag}
								<span
									class="px-2 py-1 bg-muted/30 rounded text-xs font-science-gothic font-[500] tracking-wider"
								>
									&num;{tag}
								</span>
							{/each}
						</div>
					{/if}
				</div>

				<div class="flex flex-wrap items-center w-full my-4 lg:my-8">
					<div class="text-sm leading-6">
						<span class="inline-flex items-center font-semibold">
							<Clock class="size-4 mr-2" />
							{readingTime(data.post.content)}
						</span>
					</div>

					<ShareLinks
						title={data.post?.title}
						description={data.post?.description}
						class="flex-1 justify-end my-0"
					/>
				</div>

				<p class="text-md lg:text-xl text-muted-foreground mt-4">
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
