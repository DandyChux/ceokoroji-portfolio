<script lang="ts">
	import { onMount } from "svelte";
	import type { Post } from "./schema";
	import { createQuery } from "@tanstack/svelte-query";

	let posts = $state<Post[]>([]);

	const API_URL = import.meta.env.VITE_API_URL;

	const query = createQuery(() => ({
		queryKey: ["posts"],
		queryFn: async () => {
			const response = await fetch(`${API_URL}/posts`);
			if (response.ok) {
				const data = await response.json();
				posts = data.data || [];
			} else {
				throw new Error("Failed to fetch posts");
			}
		},
	}));
</script>

<div class="flex flex-col min-h-screen p-12">
	<div class="w-full max-w-4xl mx-auto">
		<h1 class="text-4xl lg:text-6xl mb-8 font-semibold">Blog</h1>

		{#if query.isLoading}
			<p class="text-muted">Loading posts...</p>
		{:else if query.isError}
			<div class="p-4 rounded-lg bg-red-100 text-destructive">
				{query.error.message}
			</div>
		{:else if posts.length === 0}
			<p class="text-muted">No posts yet. Check back soon!</p>
		{:else}
			<div class="space-y-6">
				{#each posts.filter((p) => p.published) as post}
					<article
						class="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
					>
						<h2 class="text-2xl font-semibold mb-2">
							<a
								href="/blog/{post.slug}"
								class="hover:text-accent">{post.title}</a
							>
						</h2>
						<p class="text-sm text-muted mb-3">
							{new Date(post.date).toLocaleDateString()} • {post.category}
						</p>
						<p class="text-lg">{post.description}</p>
						<a
							href="/blog/{post.slug}"
							class="text-accent hover:underline mt-4 inline-block"
						>
							Read more →
						</a>
					</article>
				{/each}
			</div>
		{/if}

		<div class="mt-8">
			<a href="/" class="text-accent hover:underline">← Back to Home</a>
		</div>
	</div>
</div>
