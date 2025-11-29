<script lang="ts">
	import type { Post } from "$routes/blog/schema";
	import { format, parseISO } from "date-fns";
	import readingTime from "$lib/utils/reading-time";
	import Badge from "./ui/badge/badge.svelte";
	import * as Card from "$components/ui/card";
	import { Clock } from "@lucide/svelte";

	let { title, date, tags, slug, description, content }: Post = $props();

	const parsedDate = $derived(
		typeof date === "string" ? parseISO(date) : date,
	);
</script>

<Card.Root
	class="relative mx-auto my-4 p-4 border-b-2 shadow-md max-w-[750px] 2xl:max-w-[unset] motion-safe:hover:scale-105 motion-safe:hover:bg-secondary duration-500"
>
	<Card.Header class="group mb-4">
		<Card.Title
			class="mt-3 text-lg font-semibold leading-6 group-hover:text-accent"
		>
			<a href={`/blog/${slug}`}>
				<span class="absolute inset-0" />
				{title}
			</a>
		</Card.Title>
		<Card.Description
			class="mt-5 line-clamp-3 text-sm leading-6 text-muted"
		>
			{description}
		</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col items-center gap-x-4 text-xs md:text-sm">
		<time dateTime={parsedDate.toISOString()} class="font-medium mb-2">
			{format(parsedDate, "LLLL d, yyyy")}
		</time>
		<div class="flex flex-wrap gap-2">
			{#if tags}
				{#each tags as tag}
					<Badge>
						{tag}
					</Badge>
				{/each}
			{/if}
		</div>
	</Card.Content>
	<Card.Footer class="relative mt-8 flex items-center gap-x-4">
		<div class="text-sm leading-6">
			<span class="inline-flex items-center font-semibold">
				<Clock class="size-4 mr-2" />
				{readingTime(content)}
			</span>
		</div>
	</Card.Footer>
</Card.Root>
