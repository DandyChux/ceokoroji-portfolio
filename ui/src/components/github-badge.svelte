<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import { onMount } from "svelte";
	import * as Tooltip from "$components/ui/tooltip";
	import Badge from "$components/ui/badge/badge.svelte";
	import { StarIcon } from "@lucide/svelte";

	export let repo: string;

	type RepoData = {
		stargazers_count?: number;
		forks_count?: number;
		watchers_count?: number;
		html_url?: string;
		[key: string]: any;
	} | null;

	const owner = "DandyChux";

	const API_URL = import.meta.env.VITE_API_URL;

	const { data, isLoading, error } = createQuery<RepoData>(() => ({
		queryKey: [owner, repo],
		queryFn: async () => {
			const response = await fetch(`${API_URL}/repos/${owner}/${repo}`);
			if (!response.ok) {
				throw new Error(
					`GitHub API error: ${response.status} ${response.statusText}`,
				);
			}
			return response.json();
		},
	}));
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		{#if !repo}
			<!-- If no repo prop provided, render nothing (or render a placeholder) -->
			<span class="text-sm text-muted-foreground">No repo</span>
		{:else}
			<Tooltip.Trigger>
				<Badge
					variant="outline"
					class="transition-all duration-300 hover:text-accent hover:border-accent hover:cursor-pointer"
				>
					<StarIcon class="size-4 mr-2" />
					<span class="text-sm font-medium"
						>{data?.stargazers_count ?? 0}</span
					>
				</Badge>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p class="text-sm">Stars: {data?.stargazers_count ?? 0}</p>
				<p class="text-sm">Forks: {data?.forks_count ?? 0}</p>
				<p class="text-sm">Watchers: {data?.watchers_count ?? 0}</p>

				<!-- <a
					href={data?.html_url}
					target="_blank"
					rel="noreferrer noopener"
					class="text-sm hover:text-accent underline"
					>View on Github</a
				> -->
			</Tooltip.Content>
		{/if}
	</Tooltip.Root>
</Tooltip.Provider>
