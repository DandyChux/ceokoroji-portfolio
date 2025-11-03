<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { page } from "$app/state";
	import Nav from "$components/navbar.svelte";
	import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";
	import AppSidebar from "$components/app-sidebar.svelte";
	import * as Sidebar from "$components/ui/sidebar";
	import { browser } from "$app/environment";

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				enabled: browser,
			},
		},
	});

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta charset="utf-8" />
	<title>Chukwuma Okoroji</title>
</svelte:head>

<Sidebar.Provider>
	<QueryClientProvider client={queryClient}>
		<div class="flex h-[100dvh] w-screen">
			<Nav />
			<AppSidebar />
			<Sidebar.Trigger class="text-accent hidden xl:flex" />
			<main
				class="flex h-full w-full flex-col overflow-y-auto px-4 lg:px-8 2xl:px-16"
			>
				{@render children()}
			</main>
		</div>
	</QueryClientProvider>
</Sidebar.Provider>
