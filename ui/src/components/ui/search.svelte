<script lang="ts">
	import Input from "./input/input.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import Spinner from "./spinner/spinner.svelte";
	import { debounce } from "$lib/utils/debounce.svelte";

	let searchText = $state("");
	let searchParams = $derived(page.url.searchParams);
	let mounted = $state(false);
	let isSearching = $state(false);
	let pathname = $derived(page.url.pathname);

	// Initialize search text from URL params on mount
	onMount(() => {
		const initialSearch = searchParams.get("search");
		if (initialSearch) {
			searchText = initialSearch;
		}
		mounted = true;
	});

	// Create debounced search function
	const performSearch = debounce((searchValue: string) => {
		const params = new URLSearchParams(searchParams);

		if (searchValue.length > 0) {
			params.set("search", searchValue);
		} else {
			params.delete("search");
		}

		isSearching = true;

		// Update URL with search params
		goto(`${pathname}?${params.toString()}`, {
			replaceState: true,
			noScroll: true,
			keepFocus: true,
		}).then(() => {
			isSearching = false;
		});
	}, 500);

	// Handle search when text changes
	$effect(() => {
		if (!mounted) return;
		performSearch(searchText);
	});
</script>

<div class="relative mt-8 mb-5 flex-1">
	<Input
		type="search"
		bind:value={searchText}
		placeholder="Search..."
		class="text-base"
	/>
	{#if isSearching}
		<div class="absolute top-2 right-2">
			<Spinner />
		</div>
	{/if}
</div>
