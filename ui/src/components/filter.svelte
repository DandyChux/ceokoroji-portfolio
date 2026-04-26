<script lang="ts">
	import { Funnel } from "@lucide/svelte";
	import type { Post } from "../routes/blog/schema";
	import { cn } from "$lib/utils";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuLabel,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from "./ui/dropdown-menu";

	interface Props {
		posts: Post[];
		categories: string[];
		onFilter: (filteredPosts: Post[]) => void;
		class?: string;
	}

	let { posts, categories, onFilter, class: className }: Props = $props();

	let selectedCategory = $state("All");

	function handleFilterChange(value: string) {
		selectedCategory = value;

		if (value === "All") {
			onFilter(posts);
		} else {
			const filteredPosts = posts.filter(
				(post) => post.category === value,
			);
			onFilter(filteredPosts);
		}
	}
</script>

<DropdownMenu>
	<DropdownMenuTrigger class={cn("hover:cursor-pointer", className)}>
		<Funnel class="size-5 mr-2 hover:cursor-pointer" />
	</DropdownMenuTrigger>
	<DropdownMenuContent align="end">
		<DropdownMenuLabel>Categories</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuRadioGroup
			bind:value={selectedCategory}
			onValueChange={handleFilterChange}
		>
			<DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
			{#each categories as category, index (index)}
				<DropdownMenuRadioItem value={category}>
					{category}
				</DropdownMenuRadioItem>
			{/each}
		</DropdownMenuRadioGroup>
	</DropdownMenuContent>
</DropdownMenu>
