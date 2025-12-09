<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import type { Post } from "$routes/blog/schema";
	import type { PageData } from "./$types";
	import { FileText, SquarePen, ChartColumn } from "@lucide/svelte";
	import * as Card from "$components/ui/card";
	import type { Stats } from "./+page.svelte";

	let { stats }: { stats: Stats } = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
	<!-- Total Posts -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between pb-2">
			<Card.Title class="text-sm font-medium">Total Posts</Card.Title>
			<FileText class="size-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-3xl font-bold">
				{stats.total}
			</div>
			<p class="text-xs text-muted-foreground mt-1">All blog posts</p>
		</Card.Content>
	</Card.Root>

	<!-- Published -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between pb-2">
			<Card.Title class="text-sm font-medium">Published</Card.Title>
			<ChartColumn class="size-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-3xl font-bold">
				{stats.published}
			</div>
			<p class="text-xs text-muted-foreground mt-1">Live on your blog</p>
		</Card.Content>
	</Card.Root>

	<!-- Drafts -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between pb-2">
			<Card.Title class="text-sm font-medium">Drafts</Card.Title>
			<SquarePen class="size-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-3xl font-bold">
				{stats.drafts}
			</div>
			<p class="text-xs text-muted-foreground mt-1">Work in progress</p>
		</Card.Content>
	</Card.Root>

	<!-- Projects -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between pb-2">
			<Card.Title class="text-sm font-medium">Projects</Card.Title>
			<SquarePen class="size-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-3xl font-bold">
				{stats.projects}
			</div>
			<p class="text-xs text-muted-foreground mt-1">Work in progress</p>
		</Card.Content>
	</Card.Root>

	<!-- Featured Projects -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between pb-2">
			<Card.Title class="text-sm font-medium"
				>Featured Projects</Card.Title
			>
			<SquarePen class="size-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-3xl font-bold">
				{stats.featuredProjects}
			</div>
			<p class="text-xs text-muted-foreground mt-1">Work in progress</p>
		</Card.Content>
	</Card.Root>

	<!-- Skills -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between pb-2">
			<Card.Title class="text-sm font-medium">Skills</Card.Title>
			<SquarePen class="size-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-3xl font-bold">
				{stats.skills}
			</div>
			<p class="text-xs text-muted-foreground mt-1">Work in progress</p>
		</Card.Content>
	</Card.Root>
</div>
