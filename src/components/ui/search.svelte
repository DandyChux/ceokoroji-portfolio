<script lang="ts">
	import Input from "./input/input.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import Spinner from "./spinner/spinner.svelte";
	import { debounce } from "$lib/utils";

	let searchText = $state("");
	let searchParams = $derived(page.url.searchParams);
	let mounted = $state(false);
	let isSearching = $state(false);
	let pathname = $derived(page.url.pathname);

	// Create debounced search text
	let debouncedValue = debounce(searchText, 500);

	// Initialize search text from URL params on mount
	onMount(() => {
		const initialSearch = searchParams.get("search");
		if (initialSearch) {
			searchText = initialSearch;
		}
	});

	// Set mounted state after first debounced value
	$effect(() => {
		if (debouncedValue.current.length > 0 && !mounted) {
			mounted = true;
		}
	});

	// Handle search when debounced value changes
	$effect(() => {
		if (!mounted) return;

		const searchValue = debouncedValue.current;
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
