<script lang="ts">
	import ProjectCard from "$components/project-card.svelte";
	import * as Card from "$components/ui/card";
	import type { ProjectResponse } from "./schema";
	import { AppWindow, Server, SquareStack, Sparkles } from "@lucide/svelte";
	import { useSidebar } from "$components/ui/sidebar";
	import { cn } from "$lib/utils";
	import { createQuery } from "@tanstack/svelte-query";
	import apiClient from "$lib/api";

	const sidebarState = $derived(useSidebar());

	const projectsQuery = createQuery(() => ({
		queryKey: ["projects"],
		queryFn: async () =>
			await apiClient.get<ProjectResponse[]>("/projects"),
	}));

	const specializations = [
		{
			icon: AppWindow,
			title: "Web development",
			text: "Interfaces that feel clear and considered.",
		},
		{
			icon: Server,
			title: "API development",
			text: "Reliable boundaries for meaningful data.",
		},
		{
			icon: SquareStack,
			title: "Mobile development",
			text: "Useful tools for people on the move.",
		},
	];
</script>

<svelte:head>
	<title>Projects | Chukwuma Okoroji</title>
	<meta
		name="description"
		content="Selected software projects by Chukwuma Okoroji across web, API, and mobile development."
	/>
</svelte:head>

<div class="projects-page page-shell">
	<header class="projects-intro">
		<p class="eyebrow">
			<Sparkles class="size-4" />
			A record of the work
		</p>

		<h1>
			Built to be
			<br />
			<span>useful.</span>
		</h1>

		<p>
			Selected projects across product interfaces, data services, and the
			systems that connect them.
		</p>
	</header>

	<section class="specializations">
		<div class="section-label">Areas of practice</div>

		<div class="specialization-grid">
			{#each specializations as item (item.title)}
				<Card.Root class="specialization-card">
					<item.icon class="size-6 text-accent" />

					<div>
						<Card.Title>{item.title}</Card.Title>
						<Card.Description>{item.text}</Card.Description>
					</div>
				</Card.Root>
			{/each}
		</div>
	</section>

	<section class="work">
		<div class="work-heading">
			<div>
				<p class="eyebrow">The archive</p>
				<h2>Recent work</h2>
			</div>

			<span class="work-count">
				{projectsQuery.data?.length ?? 0}
				projects
			</span>
		</div>

		<div class="project-grid">
			{#each projectsQuery.data ?? [] as project (project.id)}
				<ProjectCard {...project} class="rounded-none" />
			{/each}
		</div>
	</section>
</div>

<div
	class={cn(
		"fixed left-0 -translate-x-14 bottom-24 w-24 h-24 rounded-full border-2 border-accent/80 -z-1",
		{
			"2xl:translate-x-0": !sidebarState.open,
		},
	)}
></div>

<div
	class="fixed right-0 translate-x-14 top-24 w-24 h-24 rounded-full border-2 border-accent/80 -z-1"
></div>

<style>
	.projects-page {
		padding-block: 2rem 5rem;
	}

	.projects-intro {
		max-width: 760px;
		padding-block: 2rem 5rem;
	}

	.eyebrow {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--color-accent);
		font: 0.72rem var(--font-science-gothic);
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	h1 {
		margin-top: 1.5rem;
		font-size: clamp(3rem, 7vw, 6.2rem);
		line-height: 0.94;
		letter-spacing: -0.06em;
	}

	h1 span {
		color: var(--color-accent);
	}

	.projects-intro > p:last-child {
		max-width: 36rem;
		margin-top: 2rem;
		font-size: 1.2rem;
		line-height: 1.6;
	}

	.specializations {
		border-block: 1px solid
			color-mix(in oklab, var(--color-primary) 35%, transparent);
		padding-block: 1.25rem 2rem;
	}

	.section-label {
		margin-bottom: 1.25rem;
		color: var(--color-muted-foreground);
		font: 0.7rem var(--font-science-gothic);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.specialization-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
	}

	:global(.specialization-card) {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		min-height: 150px;
		padding: 1.5rem;
		border: 0;
		border-radius: 0;
		background: color-mix(in oklab, var(--color-card) 80%, transparent);
	}

	:global(.specialization-card :global([data-slot="card-title"])) {
		margin-bottom: 0.4rem;
		font-size: 1rem;
	}

	:global(.specialization-card :global([data-slot="card-description"])) {
		line-height: 1.5;
	}

	.work {
		padding-top: 5rem;
	}

	.work-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.work-heading h2 {
		margin-top: 0.5rem;
	}

	.work-count {
		color: var(--color-muted-foreground);
		font: 0.72rem var(--font-science-gothic);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	:global(.project-grid > *) {
		height: 100%;
	}

	@media (max-width: 800px) {
		.specialization-grid,
		.project-grid {
			grid-template-columns: 1fr;
		}

		:global(.specialization-card) {
			min-height: auto;
		}
	}
</style>
