<script lang="ts">
	import { onMount } from 'svelte';

	interface Post {
		id: string;
		title: string;
		date: string;
		description: string;
		published: boolean;
		slug: string;
		category: string;
	}

	let posts = $state<Post[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	const API_URL = 'http://localhost:8080';

	onMount(async () => {
		try {
			const response = await fetch(`${API_URL}/api/posts`);
			if (response.ok) {
				const data = await response.json();
				posts = data.data || [];
			} else {
				error = 'Failed to fetch posts';
			}
		} catch (err) {
			error = 'Failed to connect to the server';
		} finally {
			loading = false;
		}
	});
</script>

<div class="flex flex-col min-h-screen p-12">
	<div class="w-full max-w-4xl mx-auto">
		<h1 class="text-4xl lg:text-6xl mb-8 font-semibold">Blog</h1>

		{#if loading}
			<p class="text-muted">Loading posts...</p>
		{:else if error}
			<div class="p-4 rounded-lg bg-red-100 text-red-800">
				{error}
			</div>
		{:else if posts.length === 0}
			<p class="text-muted">No posts yet. Check back soon!</p>
		{:else}
			<div class="space-y-6">
				{#each posts.filter(p => p.published) as post}
					<article class="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
						<h2 class="text-2xl font-semibold mb-2">
							<a href="/blog/{post.slug}" class="hover:text-accent">{post.title}</a>
						</h2>
						<p class="text-sm text-muted mb-3">
							{new Date(post.date).toLocaleDateString()} • {post.category}
						</p>
						<p class="text-lg">{post.description}</p>
						<a href="/blog/{post.slug}" class="text-accent hover:underline mt-4 inline-block">
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
