<script lang="ts">
	import type { Post } from "./schema";
	import PostView from "$components/post-view.svelte";
	import { page } from "$app/state";
	import type { PageData } from "./$types";
	import { createQuery } from "@tanstack/svelte-query";
	import * as Alert from "$components/ui/alert";
	import Spinner from "$components/ui/spinner/spinner.svelte";
	import { cn } from "$lib/utils";
	import { useSidebar } from "$components/ui/sidebar";

	let { data }: { data: PageData } = $props();

	const sidebarState = $derived(useSidebar());

	const postsQuery = createQuery<Post[]>(() => ({
		queryKey: ["posts"],
		queryFn: async () => {
			const response = await fetch(`${data.apiUrl}/posts`);

			if (!response.ok) {
				throw new Error(
					`Failed to fetch posts: ${response.status} ${response.statusText}`,
				);
			}

			const result = await response.json();
			return result;
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
		refetchOnWindowFocus: true, // Refetch when user returns to tab
	}));

	const searchQuery = $derived(page.url.searchParams.get("search") || "");
</script>

<svelte:head>
	<title>Blog | Chukwuma Okoroji</title>
</svelte:head>

<div class="relative flex flex-col h-full">
	<h1
		class="text-3xl w-full text-center md:text-[5rem] leading-normal font-extrabold"
	>
		Blog
	</h1>

	{#if postsQuery.isPending}
		<Alert.Root>
			<Spinner />
			<Alert.Title>Loading posts...</Alert.Title>
		</Alert.Root>
	{:else if postsQuery.isError}
		<Alert.Root variant="destructive">
			<Alert.Title>Error loading posts</Alert.Title>
			<Alert.Description>
				{postsQuery.error.message}
			</Alert.Description>
		</Alert.Root>
	{:else if !postsQuery.data?.length}
		<Alert.Root>
			<Alert.Title>No posts found</Alert.Title>
			<Alert.Description>
				There are no posts matching your search query.
			</Alert.Description>
		</Alert.Root>
	{:else}
		<PostView {searchQuery} posts={postsQuery.data} />
	{/if}

	<!-- Circle vectors -->
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div
		class={cn(
			"fixed left-0 -translate-x-14 2xl:translate-x-[calc(var(--sidebar-width)-50px)] bottom-24 w-24 h-24 bg-transparent rounded-full border-2 border-accent/80 duration-300 ease-in-out",
			{
				"2xl:translate-x-0": !sidebarState.open,
			},
		)}
	/>
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div
		class="fixed right-0 translate-x-14 2xl:translate-x-12 top-24 2xl:top-52 w-24 h-24 bg-transparent rounded-full border-2 border-accent/80"
	/>
</div>
