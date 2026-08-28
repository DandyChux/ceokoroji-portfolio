<script lang="ts">
	import { ArrowLeft, FileQuestionMark } from "@lucide/svelte";
	import { page } from "$app/state";
</script>

<svelte:head>
	<title>Note not found | Chukwuma Okoroji</title>
</svelte:head>

<div class="page-shell not-found">
	<FileQuestionMark class="size-10 text-accent" />

	<p class="eyebrow">A missing page</p>

	<h1>That note wandered off.</h1>

	<p>The post you tried to open does not exist or may have been removed.</p>

	<a href="/blog">
		<ArrowLeft class="size-4" />
		Back to notes
	</a>

	{#if page.error?.message}
		<small>{page.error.message}</small>
	{/if}
</div>

<style>
	.not-found {
		display: flex;
		min-height: 70vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		text-align: center;
	}

	.not-found h1 {
		font-size: clamp(2.5rem, 6vw, 5rem);
		line-height: 1;
	}

	.not-found p:not(.eyebrow) {
		max-width: 34rem;
		color: var(--color-muted-foreground);
		line-height: 1.6;
	}

	.not-found a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1rem;
		color: var(--color-accent);
		font-family: var(--font-science-gothic);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.not-found small {
		color: var(--color-muted-foreground);
		font-size: 0.7rem;
	}
</style>
