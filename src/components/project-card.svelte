<script lang="ts">
	import { ArrowUpRight } from "@lucide/svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";
	import type { Project, ProjectResponse } from "$routes/projects/schema";
	import GithubBadge from "./github-badge.svelte";
	import Badge from "./ui/badge/badge.svelte";
	import Skeleton from "./ui/skeleton/skeleton.svelte";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "./ui/card";
	import { trackEvent } from "$lib/analytics.svelte";

	interface Props extends Omit<ProjectResponse, "id"> {
		class?: string;
	}

	let {
		image_url,
		name,
		description,
		github_url,
		live_url,
		skills,
		class: className,
		...restProps
	}: Props = $props();
</script>

<Card
	{...restProps}
	class={cn(
		"relative flex flex-col group w-full max-w-[50rem] text-center justify-between p-4 duration-500 border-2 border-secondary rounded-lg shadow-xl motion-safe:hover:scale-105",
		className,
	)}
>
	{#if live_url}
		<ArrowUpRight
			class="w-4 h-4 self-end group-hover:text-accent transition-all duration-500"
		/>
		<a
			class="text-sm underline decoration-dotted underline-offset-2"
			href={live_url}
			onclick={() =>
				trackEvent("Project View", {
					props: {
						projectName: name,
						projectUrl: live_url,
					},
				})}
			target="_blank"
			rel="noreferrer"
			aria-label="View live_url"
		>
			<span class="absolute inset-0"></span>
		</a>
	{/if}

	<CardHeader>
		<div class="relative w-full mx-auto mb-4 h-[10rem]">
			{#if image_url}
				<enhanced:img
					src={image_url}
					alt={name}
					class="w-auto h-full mx-auto"
				/>
			{:else}
				<Skeleton class="w-full h-full" />
			{/if}
		</div>

		<CardTitle class="font-normal text-lg 2xl:text-xl">{name}</CardTitle>
		<CardDescription class="font-light text-sm text-muted">
			{description}
		</CardDescription>
	</CardHeader>

	<CardContent>
		<a
			class="relative text-sm underline decoration-dotted underline-offset-2"
			href={github_url}
			target="_blank"
			rel="noreferrer"
		>
			<GithubBadge repo={github_url.split("/").pop() ?? ""} />
		</a>

		<menu class="flex flex-wrap justify-center gap-2 pt-4">
			{#each skills ?? [] as skill, index (index)}
				<Badge class="rounded-md">
					{skill}
				</Badge>
			{/each}
		</menu>
	</CardContent>
</Card>
