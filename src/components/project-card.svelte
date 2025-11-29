<script lang="ts">
	import { ArrowUpRight } from "@lucide/svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";
	import type { Project } from "$routes/projects/schema";
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

	interface Props extends HTMLAttributes<HTMLDivElement>, Project {
		class?: string;
	}

	let {
		image,
		name,
		description,
		documentation,
		deployment,
		skills,
		class: className,
		...restProps
	}: Props = $props();
</script>

<Card
	class={cn(
		"relative flex flex-col group w-full max-w-[50rem] text-center justify-between p-4 duration-500 border-2 border-secondary rounded-lg shadow-xl motion-safe:hover:scale-105",
		className,
	)}
	{...restProps}
>
	{#if deployment}
		<ArrowUpRight
			class="w-4 h-4 self-end group-hover:text-accent transition-all duration-500"
		/>
		<a
			class="text-sm underline decoration-dotted underline-offset-2"
			href={deployment}
			target="_blank"
			rel="noreferrer"
			aria-label="View Deployment"
		>
			<span class="absolute inset-0"></span>
		</a>
	{/if}

	<CardHeader>
		<div class="relative w-full mx-auto mb-4 h-[10rem]">
			{#if image}
				<enhanced:img
					src={image}
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
			href={documentation}
			target="_blank"
			rel="noreferrer"
		>
			<GithubBadge repo={documentation.split("/").pop() ?? ""} />
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
