<script lang="ts">
	import PostView from "$components/post-view.svelte";
	import { page } from "$app/state";
	import * as Alert from "$components/ui/alert";
	import { cn } from "$lib/utils";
	import { useSidebar } from "$components/ui/sidebar";
	import { BookOpen, Sparkles } from "@lucide/svelte";

	let { data } = $props();

	const sidebarState = $derived(useSidebar());
	const searchQuery = $derived(page.url.searchParams.get("search") || "");
</script>

<svelte:head>
	<title>Blog | Chukwuma Okoroji</title>
	<meta
		name="description"
		content="Notes on software, research, and the things I learn while building."
	/>
</svelte:head>

<div class="page-shell blog-page">
	<header class="blog-intro">
		<p class="eyebrow">
			<Sparkles class="size-4" />
			Notes from the workbench
		</p>

		<h1>
			Things I&apos;m
			<br />
			<span>still figuring out.</span>
		</h1>

		<p>
			Occasional notes on software, research, and the rabbit holes that
			turn into useful ideas.
		</p>
	</header>

	{#if !data.posts.length}
		<Alert.Root class="empty-state">
			<BookOpen class="size-5" />

			<div>
				<Alert.Title>No notes yet</Alert.Title>

				<Alert.Description>
					{searchQuery
						? "Nothing matched that search."
						: "I haven't published anything here yet."}
				</Alert.Description>
			</div>
		</Alert.Root>
	{:else}
		<PostView {searchQuery} posts={data.posts} />
	{/if}
</div>

<div
	class={cn(
		"fixed left-0 -translate-x-14 bottom-24 w-24 h-24 rounded-full border-2 border-accent/80 -z-1",
		{
			"2xl:translate-x-0": !sidebarState.open,
		},
	)}
></div>

<div
	class="fixed right-0 translate-x-14 top-24 w-24 h-24 rounded-full border-2 border-accent/80 -z-1"
></div>

<style>
	.blog-page {
		padding-block: 2rem 5rem;
	}

	.blog-intro {
		max-width: 760px;
		padding-block: 2rem 4rem;
	}

	.blog-intro h1 {
		margin-top: 1.5rem;
		font-size: clamp(3rem, 7vw, 6.2rem);
		line-height: 0.94;
		letter-spacing: -0.06em;
	}

	.blog-intro h1 span {
		color: var(--color-accent);
	}

	.blog-intro > p:last-child {
		max-width: 38rem;
		margin-top: 2rem;
		font-size: 1.2rem;
		line-height: 1.6;
	}

	.blog-page :global(.empty-state) {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		max-width: 700px;
	}

	.blog-page :global(.empty-state svg) {
		color: var(--color-accent);
	}
</style>
