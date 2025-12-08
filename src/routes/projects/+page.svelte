<script lang="ts">
	import ProjectCard from "$components/project-card.svelte";
	import * as Card from "$components/ui/card";
	import { Separator } from "$components/ui/separator";
	import type { ProjectResponse } from "./schema";
	import { AppWindow, Server, SquareStack } from "@lucide/svelte";
	import { useSidebar } from "$components/ui/sidebar";
	import { cn } from "$lib/utils";
	import { createQuery } from "@tanstack/svelte-query";
	import apiClient from "$lib/api";

	const sidebarState = $derived(useSidebar());

	const projectsQuery = createQuery(() => ({
		queryKey: ["projects"],
		queryFn: async () => {
			return await apiClient.get<ProjectResponse[]>("/projects");
		},
	}));
</script>

<svelte:head>
	<title>Projects | Chukwuma Okoroji</title>
</svelte:head>

<h1 class="text-4xl lg:text-6xl mb-8 font-semibold text-center">Projects</h1>

<span class="text-lg w-full text-center leading-normal font-medium mt-4">
	Specializations
</span>
<div
	class="grid grid-cols-auto md:inline-flex items-center justify-center w-full 2xl:w-1/2 mx-auto py-4 gap-4"
>
	<Card.Root class="flex-1 rounded-none py-4">
		<Card.Header class="px-0">
			<Separator class="!w-2/5" />
		</Card.Header>
		<Card.Content class="flex flex-col items-center gap-2">
			<AppWindow class="size-12" />
			<Card.Title>Web Development</Card.Title>
		</Card.Content>
	</Card.Root>

	<Card.Root class="flex-1 rounded-none py-4">
		<Card.Header class="px-0">
			<Separator class="!w-2/5" />
		</Card.Header>
		<Card.Content class="flex flex-col items-center gap-2">
			<Server class="size-12" />
			<Card.Title>API Development</Card.Title>
		</Card.Content>
	</Card.Root>

	<Card.Root class="flex-1 rounded-none py-4">
		<Card.Header class="px-0">
			<Separator class="!w-2/5" />
		</Card.Header>
		<Card.Content class="flex flex-col items-center gap-2">
			<SquareStack class="size-12" />
			<Card.Title>Mobile Development</Card.Title>
		</Card.Content>
	</Card.Root>
</div>

<div class="grid gap-3 pt-3 mt-3 md:grid-cols-2 2xl:grid-cols-3">
	{#each projectsQuery.data as project, index (index)}
		<ProjectCard {...project} />
	{/each}
</div>

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
