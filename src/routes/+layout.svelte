<script lang="ts">
	import "../app.css";
	import { page } from "$app/state";
	import Nav from "$components/navbar.svelte";
	import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";
	import AppSidebar from "$components/app-sidebar.svelte";
	import { ModeWatcher } from "mode-watcher";
	import * as Sidebar from "$components/ui/sidebar";
	import { browser } from "$app/environment";
	import Logo from "$components/logo.svelte";
	import { Toaster } from "svelte-sonner";

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				enabled: browser,
			},
		},
	});

	let { children } = $props();

	const isAdminRoute = $derived(page.url.pathname.startsWith("/admin"));
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={"/favicon.ico"} />
	<meta charset="utf-8" />
	<meta property="og:title" content="Chukwuma Okoroji" />
	<meta
		property="og:description"
		content="Chukwuma Okoroji is a software engineer and entrepreneur."
	/>
	<meta property="og:image" content="/ceokoroji-logo.webp" />
	<meta property="og:url" content="https://ceokoroji.dev" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Chukwuma Okoroji" />
	<title>Chukwuma Okoroji</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<ModeWatcher />
	<Toaster richColors />

	{#if isAdminRoute}
		<!-- Admin routes: minimal wrapper, let admin layout handle everything -->
		{@render children()}
	{:else}
		<!-- Public routes: full sidebar layout -->
		<Sidebar.Provider>
			<div class="flex flex-col xl:flex-row h-[100dvh] w-screen">
				<Nav />
				<AppSidebar />
				<main
					class="relative flex flex-col size-full overflow-y-auto p-4 lg:p-6 2xl:p-8"
				>
					{@render children()}
					<Logo />
				</main>
			</div>
		</Sidebar.Provider>
	{/if}
</QueryClientProvider>
