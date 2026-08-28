<script lang="ts">
	import ShareLinks from "$components/share-links.svelte";
	import { renderMarkdown } from "$lib/utils/markdown";
	import { ArrowLeft, Clock, Sparkles } from "@lucide/svelte";
	import { parseISO } from "date-fns";
	import readingTime from "$lib/utils/reading-time";

	let { data } = $props();

	const parsedDate = $derived(
		data.post.date
			? typeof data.post.date === "string"
				? parseISO(data.post.date)
				: data.post.date
			: null,
	);

	const renderedContent = $derived(
		data.post ? renderMarkdown(data.post.content) : "",
	);

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString("en-US", {
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

<div class="page-shell article-page">
	<a href="/blog" class="back-link">
		<ArrowLeft class="size-4" />
		Back to notes
	</a>

	<article>
		<header class="article-header">
			<p class="eyebrow">
				<Sparkles class="size-4" />
				A note from the workbench
			</p>

			<h1>{data.post?.title}</h1>

			<p class="article-description">
				{data.post?.description}
			</p>

			<div class="article-meta">
				{#if parsedDate}
					<time datetime={parsedDate.toISOString()}>
						{formatDate(parsedDate.toString())}
					</time>

					<span aria-hidden="true">•</span>
				{/if}

				<span class="category">
					{data.post?.category}
				</span>

				{#if data.post?.tags?.length}
					<div class="tags">
						{#each data.post.tags as tag (tag)}
							<span>#{tag}</span>
						{/each}
					</div>
				{/if}
			</div>

			<div class="article-tools">
				<span class="reading-time">
					<Clock class="size-4" />
					{readingTime(data.post.content)}
				</span>

				<ShareLinks
					title={data.post?.title}
					description={data.post?.description}
					class="article-share-links"
				/>
			</div>
		</header>

		<hr />

		<div class="prose prose-lg dark:prose-invert max-w-none">
			{@html renderedContent}
		</div>
	</article>
</div>

<style>
	.article-page {
		padding-block: 2rem 6rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-accent);
		font-family: var(--font-science-gothic);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.article-page article {
		max-width: 850px;
		margin: 4rem auto 0;
	}

	.article-header {
		display: grid;
		gap: 1.25rem;
	}

	.article-header h1 {
		max-width: 850px;
		font-size: clamp(2.5rem, 6vw, 5.5rem);
		line-height: 1;
		letter-spacing: -0.05em;
	}

	.article-description {
		max-width: 680px;
		color: var(--color-muted-foreground);
		font-size: clamp(1.05rem, 2vw, 1.35rem);
		line-height: 1.6;
	}

	.article-meta,
	.article-tools {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-muted-foreground);
		font-size: 0.8rem;
	}

	.category,
	.tags span {
		padding: 0.35rem 0.6rem;
		background: color-mix(in oklab, var(--color-primary) 12%, transparent);
		color: var(--color-primary);
		font-family: var(--font-science-gothic);
		font-size: 0.7rem;
		letter-spacing: 0.04em;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tags span {
		background: color-mix(in oklab, var(--color-muted) 15%, transparent);
		color: var(--color-muted-foreground);
	}

	.article-tools {
		justify-content: space-between;
		margin-top: 1rem;
	}

	.reading-time {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-weight: 600;
	}

	.article-page hr {
		margin-block: 2.5rem;
		border-color: color-mix(in oklab, var(--color-border) 60%, transparent);
	}
</style>
