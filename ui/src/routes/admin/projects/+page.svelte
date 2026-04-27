<script lang="ts">
	import { createMutation } from "@tanstack/svelte-query";
	import type { Project } from "$routes/projects/schema";
	import * as Table from "$components/ui/table";
	import ProjectOrder from "$components/project-order.svelte";
	import apiClient from "$lib/api.js";
	import { page } from "$app/state";

	let { data } = $props();

	const createProjectMutation = createMutation<Project, Error, Project>(
		() => ({
			mutationFn: async (project) => {
				return await apiClient.post<Project>("/projects", project);
			},
			onSuccess: () => {
				// projectsQuery.refetch();
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

		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Title</Table.Head>
					<Table.Head>Live URL</Table.Head>
					<Table.Head>Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.projects as project}
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

		<div class="mt-8">
			<ProjectOrder />
		</div>
	</div>
</div>
