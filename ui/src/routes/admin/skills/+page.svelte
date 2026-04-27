<script lang="ts">
	import { createMutation, createQuery } from "@tanstack/svelte-query";
	import type { Skill } from "$routes/projects/schema";
	import * as Table from "$components/ui/table";
	import apiClient from "$lib/api";

	let { data } = $props();

	const createSkillMutation = createMutation<Skill, Error, Skill>(() => ({
		mutationFn: async (skill) => {
			return await apiClient.post<Skill>("/projects/skill", skill);
		},
		// onSuccess: () => {
		// 	skillsQuery.refetch();
		// },
	}));
</script>

<svelte:head>
	<title>Manage Skills | Admin</title>
</svelte:head>

<div class="flex flex-col min-h-screen p-6 lg:p-12">
	<div class="w-full max-w-6xl mx-auto">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<h1 class="text-4xl lg:text-6xl font-bold">Manage Skills</h1>
			<a
				href="/admin/skills/new"
				class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
			>
				+ New Skills
			</a>
		</div>

		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Name</Table.Head>
					<Table.Head>Category</Table.Head>
					<Table.Head>Level</Table.Head>
					<Table.Head>Icon URL</Table.Head>
					<Table.Head>Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.skills as skill}
					<Table.Row>
						<Table.Cell>{skill.name}</Table.Cell>
						<Table.Cell>{skill.category}</Table.Cell>
						<Table.Cell>{skill.level}</Table.Cell>
						<Table.Cell>{skill.icon_url}</Table.Cell>
						<Table.Cell>
							<a
								href={`/admin/projects/${skill.id}/edit`}
								class="text-primary hover:underline">Edit</a
							>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>

		<div class="mt-8">
			<a href="/admin" class="text-accent hover:underline"
				>← Back to Admin</a
			>
		</div>
	</div>
</div>
