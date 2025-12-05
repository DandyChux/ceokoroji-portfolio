<script lang="ts">
	import { createMutation, createQuery } from "@tanstack/svelte-query";
	import type { Skill } from "$routes/projects/schema";
	import type { PageData } from "./$types";
	import * as Table from "$components/ui/table";

	let { data }: { data: PageData } = $props();

	const skillsQuery = createQuery<Skill[]>(() => ({
		queryKey: ["admin", "skills"],
		queryFn: async () => {
			const response = await fetch(`${data.apiUrl}/projects/skills`, {
				credentials: "include",
			});

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

	const createSkillMutation = createMutation<Skill, Error, Skill>(() => ({
		mutationFn: async (skill) => {
			const response = await fetch(`${data.apiUrl}/projects/skill`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(skill),
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
			skillsQuery.refetch();
		},
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

		{#if skillsQuery.data}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Name</Table.Head>
						<Table.Head>Category</Table.Head>
						<Table.Head>Level</Table.Head>
						<Table.Head>Order</Table.Head>
						<Table.Head>Icon URL</Table.Head>
						<Table.Head>Color</Table.Head>
						<Table.Head>Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each skillsQuery.data as skill}
						<Table.Row>
							<Table.Cell>{skill.name}</Table.Cell>
							<Table.Cell>{skill.category}</Table.Cell>
							<Table.Cell>{skill.level}</Table.Cell>
							<Table.Cell>{skill.order}</Table.Cell>
							<Table.Cell>{skill.icon_url}</Table.Cell>
							<Table.Cell>{skill.color}</Table.Cell>
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
		{:else if skillsQuery.error}
			<div class="p-4 rounded-lg bg-destructive/10 text-destructive">
				Error: {skillsQuery.error?.message}
			</div>
		{:else}
			<div class="p-4 rounded-lg bg-primary/10 text-primary">
				Loading skills...
			</div>
		{/if}

		<div class="mt-8">
			<a href="/admin" class="text-accent hover:underline"
				>← Back to Admin</a
			>
		</div>
	</div>
</div>
