<script lang="ts">
	import { createMutation, createQuery } from "@tanstack/svelte-query";
	import type { Project } from "$routes/projects/schema";
	import type { PageData } from "./$types";
	import * as Table from "$components/ui/table";
	import ProjectOrder from "$components/project-order.svelte";

	let { data }: { data: PageData } = $props();

	const projectsQuery = createQuery<Project[]>(() => ({
		queryKey: ["admin", "projects"],
		queryFn: async () => {
			const response = await fetch(`${data.apiUrl}/projects`);

			if (!response.ok) {
				throw new Error(
					`Failed to fetch projects: ${response.status} ${response.statusText}`,
				);
			}

			const result = await response.json();
			return result;
		},
		staleTime: Infinity,
		refetchOnWindowFocus: true,
	}));

	const createProjectMutation = createMutation<Project, Error, Project>(
		() => ({
			mutationFn: async (project) => {
				const response = await fetch(`${data.apiUrl}/projects`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(project),
				});

				if (!response.ok) {
					throw new Error(
						`Failed to create project: ${response.status} ${response.statusText}`,
					);
				}

				const result = await response.json();
				return result;
			},
			onSuccess: () => {
				projectsQuery.refetch();
			},
		}),
	);
</script>

<svelte:head>
	<title>Manage Projects | Admin</title>
</svelte:head>

<div class="flex flex-col min-h-screen p-6 lg:p-12">
	<div class="w-full max-w-6xl mx-auto">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<h1 class="text-4xl lg:text-6xl font-bold">Manage Projects</h1>
			<a
				href="/admin/projects/new"
				class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
			>
				+ New Project
			</a>
		</div>

		{#if projectsQuery.data}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Title</Table.Head>
						<Table.Head>Live URL</Table.Head>
						<Table.Head>Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each projectsQuery.data as project}
						<Table.Row>
							<Table.Cell>{project.name}</Table.Cell>
							<Table.Cell>{project.live_url}</Table.Cell>
							<Table.Cell>
								<a
									href={`/admin/projects/${project.id}/edit`}
									class="text-primary hover:underline">Edit</a
								>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else if projectsQuery.error}
			<div class="p-4 rounded-lg bg-destructive/10 text-destructive">
				Error: {projectsQuery.error?.message}
			</div>
		{:else}
			<div class="p-4 rounded-lg bg-primary/10 text-primary">
				Loading projects...
			</div>
		{/if}

		<div class="mt-8">
			<ProjectOrder />
		</div>

		<div class="mt-8">
			<a href="/admin" class="text-accent hover:underline"
				>← Back to Admin</a
			>
		</div>
	</div>
</div>
