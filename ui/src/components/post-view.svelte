<script lang="ts">
	import type { Post } from "$routes/blog/schema";
	import Filter from "./filter.svelte";
	import BlogCard from "./blog-card.svelte";
	import Search from "./ui/search.svelte";

	interface Props {
		searchQuery?: string;
		posts: Post[];
	}

	let { searchQuery = "", posts: allPosts }: Props = $props();

	// State for pagination
	let displayCount = $state(10);

	// Get unique categories
	let categories = $derived(
		Array.from(new Set(allPosts.map((post) => post.category))),
	);

	// Filtered posts for the filter component (not search)
	let filterResults = $state<Post[] | null>(null);

	// Compute filtered and sorted posts based on search query and filter
	let filteredPosts = $derived.by(() => {
		// Start with either filter results or all posts
		const postsToFilter = filterResults || allPosts;

		// Apply search filter
		const searched = searchQuery
			? postsToFilter.filter(
					(post) =>
						post.title
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) ||
						post.description
							.toLowerCase()
							.includes(searchQuery.toLowerCase()),
				)
			: postsToFilter;

		// Sort by date
		return searched.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
	});

	// Posts to display (with pagination)
	let displayedPosts = $derived(filteredPosts.slice(0, displayCount));
	let hasMore = $derived(displayCount < filteredPosts.length);

	// Intersection observer for infinite scroll
	let sentinel: HTMLDivElement;

	$effect(() => {
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore) {
					fetchMore();
				}
			},
			{ threshold: 0.1 },
		);

		observer.observe(sentinel);

		return () => {
			observer.disconnect();
		};
	});

	function fetchMore() {
		displayCount += 10;
	}

	function handleFilter(newPosts: Post[]) {
		filterResults = newPosts;
		displayCount = 10; // Reset pagination when filter changes
	}

	// Reset pagination when search changes
	$effect(() => {
		// searchQuery; // Track searchQuery
		displayCount = 10;
	});
</script>

<div class="flex flex-col w-full md:px-40">
	<div class="relative flex items-center mb-4">
		<Search />

		<Filter
			posts={allPosts}
			{categories}
			onFilter={handleFilter}
			class="absolute right-2 top-10"
		/>
	</div>

	<div>
		{#if displayedPosts.length === 0}
			<div class="text-center py-12 text-muted-foreground">
				No posts found matching your search.
			</div>
		{:else}
			{#each displayedPosts as post (post.id)}
				<BlogCard {...post} />
			{/each}
		{/if}
	</div>

	{#if hasMore}
		<div bind:this={sentinel} class="h-10 flex items-center justify-center">
			<div class="text-muted-foreground">Loading more...</div>
		</div>
	{/if}
</div>
