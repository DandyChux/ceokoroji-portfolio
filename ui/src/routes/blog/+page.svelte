<script lang="ts">
	import type { Post } from "./schema";
	import PostView from "$components/post-view.svelte";
	import { page } from "$app/state";
	import { createQuery } from "@tanstack/svelte-query";
	import * as Alert from "$components/ui/alert";
	import Spinner from "$components/ui/spinner/spinner.svelte";
	import { cn } from "$lib/utils";
	import { useSidebar } from "$components/ui/sidebar";

	let { data } = $props();

	const sidebarState = $derived(useSidebar());

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

	{#if !data.posts.length}
		<Alert.Root>
			<Alert.Title>No posts found</Alert.Title>
			<Alert.Description>
				There are no posts {searchQuery
					? "matching your search query"
					: "available"}
			</Alert.Description>
		</Alert.Root>
	{:else}
		<PostView {searchQuery} posts={data.posts} />
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
