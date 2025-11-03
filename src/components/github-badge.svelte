<script lang="ts">
	import { onMount } from "svelte";

	export let repo: string;

	type RepoData = {
		stargazers_count?: number;
		forks_count?: number;
		watchers_count?: number;
		html_url?: string;
		[key: string]: any;
	} | null;

	let data: RepoData = null;
	let loading = false;
	let error: string | null = null;

	const owner = "DandyChux";

	onMount(async () => {
		if (!repo) return;
		loading = true;
		error = null;

		try {
			const res = await fetch(
				`https://api.github.com/repos/${owner}/${repo}`,
			);
			if (!res.ok) {
				throw new Error(
					`GitHub API error: ${res.status} ${res.statusText}`,
				);
			}
			data = await res.json();
		} catch (e: any) {
			error = e?.message ?? String(e);
			data = null;
		} finally {
			loading = false;
		}
	});
</script>

{#if !repo}
	<!-- If no repo prop provided, render nothing (or render a placeholder) -->
	<span class="text-sm text-muted-foreground">No repo</span>
{:else}
	<div class="relative inline-block group" aria-live="polite">
		<!-- Badge / trigger -->
		<button
			class="flex items-center gap-1 border rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 hover:text-accent hover:border-accent"
			aria-describedby="github-badge-tooltip"
			aria-busy={loading}
		>
			<!-- Star icon (outline) -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 h-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path
					d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
				></path>
			</svg>

			{#if loading}
				<span class="font-bold text-sm">…</span>
			{:else}
				<span class="font-bold text-sm"
					>{data?.stargazers_count ?? 0}</span
				>
			{/if}
		</button>

		<!-- Tooltip content: shown on hover/focus -->
		<div
			id="github-badge-tooltip"
			role="tooltip"
			class="tooltip hidden group-hover:block group-focus:block absolute left-1/2 transform -translate-x-1/2 mt-2 w-[14rem] max-w-xs rounded-md bg-slate-800 text-slate-100 p-3 text-sm shadow-lg z-10"
			style="--tooltip-bg: #0f172a;"
		>
			{#if loading}
				<p class="text-sm">Loading...</p>
			{:else if error}
				<p class="text-sm text-red-300">Error: {error}</p>
			{:else}
				<p class="text-sm">Stars: {data?.stargazers_count ?? 0}</p>
				<p class="text-sm">Forks: {data?.forks_count ?? 0}</p>
				<p class="text-sm">Watchers: {data?.watchers_count ?? 0}</p>

				{#if data?.html_url}
					<a
						href={data.html_url}
						target="_blank"
						rel="noreferrer"
						class="block mt-2 text-sm underline hover:text-accent"
					>
						View on GitHub
					</a>
				{/if}
			{/if}
		</div>
	</div>
{/if}

<style>
	/* Small tooltip arrow */
	.tooltip::after {
		content: "";
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -6px;
		border-width: 6px;
		border-style: solid;
		border-color: transparent transparent var(--tooltip-bg, #111827)
			transparent;
	}
</style>
