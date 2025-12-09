<script lang="ts">
	import {
		createMutation,
		createQuery,
		useQueryClient,
	} from "@tanstack/svelte-query";
	import { toast } from "svelte-sonner";
	import type { Project } from "$routes/projects/schema";
	import { Button } from "$components/ui/button";
	import { GripVertical } from "@lucide/svelte";
	import apiClient from "$lib/api";

	const API_URL = import.meta.env.VITE_API_URL;
	const queryClient = useQueryClient();

	// Fetch projects
	const projectsQuery = createQuery(() => ({
		queryKey: ["projects"],
		queryFn: async () => {
			const response = await fetch(`${API_URL}/projects`);
			if (!response.ok) throw new Error("Failed to fetch projects");
			return response.json() as Promise<Project[]>;
		},
	}));

	let projects = $state<Project[]>([]);
	let draggedItem = $state<Project | null>(null);
	let draggedOverItem = $state<Project | null>(null);
	let hasChanges = $state(false);
	let originalOrder = $state<Project[]>([]);

	// Update local state when query data changes
	$effect(() => {
		if (projectsQuery.data) {
			projects = [...projectsQuery.data];
			originalOrder = [...projectsQuery.data];
			hasChanges = false;
		}
	});

	// Mutation for reordering
	const reorderMutation = createMutation(() => ({
		mutationFn: async (projectIds: number[]) => {
			return await apiClient.put<
				{ message: string },
				{ project_ids: number[] }
			>("/projects/reorder", {
				project_ids: projectIds,
			});
		},
		onSuccess: () => {
			toast.success("Projects reordered successfully");
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			hasChanges = false;
			originalOrder = [...projects];
		},
		onError: () => {
			toast.error("Failed to reorder projects");
		},
	}));

	function handleDragStart(event: DragEvent, project: Project) {
		draggedItem = project;
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = "move";
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = "move";
		}
	}

	function handleDragEnter(project: Project) {
		draggedOverItem = project;
	}

	function handleDragLeave() {
		draggedOverItem = null;
	}

	function handleDrop(event: DragEvent, targetProject: Project) {
		event.preventDefault();

		if (!draggedItem || draggedItem.id === targetProject.id) {
			return;
		}

		const draggedIndex = projects.findIndex(
			(p) => p.id === draggedItem!.id,
		);
		const targetIndex = projects.findIndex(
			(p) => p.id === targetProject.id,
		);

		if (draggedIndex !== -1 && targetIndex !== -1) {
			// Remove dragged item and insert at target position
			const newProjects = [...projects];
			const [removed] = newProjects.splice(draggedIndex, 1);
			newProjects.splice(targetIndex, 0, removed);
			projects = newProjects;

			// Check if order has changed
			hasChanges = !arraysEqual(projects, originalOrder);
		}

		draggedItem = null;
		draggedOverItem = null;
	}

	function handleDragEnd() {
		draggedItem = null;
		draggedOverItem = null;
	}

	function arraysEqual(a: Project[], b: Project[]): boolean {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (a[i].id !== b[i].id) return false;
		}
		return true;
	}

	function saveOrder() {
		const projectIds = projects.map((p) => p.id);
		reorderMutation.mutate(projectIds);
	}

	function resetOrder() {
		projects = [...originalOrder];
		hasChanges = false;
	}
</script>

<div class="space-y-4">
	<div class="flex justify-between items-center mb-4">
		<h2 class="text-2xl font-bold">Reorder Projects</h2>
		{#if hasChanges}
			<div class="space-x-2">
				<Button variant="outline" onclick={resetOrder}>Reset</Button>
				<Button
					onclick={saveOrder}
					disabled={reorderMutation.isPending}
				>
					{reorderMutation.isPending ? "Saving..." : "Save Order"}
				</Button>
			</div>
		{/if}
	</div>

	{#if projectsQuery.isLoading}
		<p>Loading projects...</p>
	{:else if projectsQuery.error}
		<p class="text-red-500">Error loading projects</p>
	{:else if projects.length === 0}
		<p>No projects found</p>
	{:else}
		<div class="space-y-2">
			{#each projects as project (project.id)}
				<div
					role="listitem"
					draggable="true"
					ondragstart={(e) => handleDragStart(e, project)}
					ondragover={handleDragOver}
					ondragenter={() => handleDragEnter(project)}
					ondragleave={handleDragLeave}
					ondrop={(e) => handleDrop(e, project)}
					ondragend={handleDragEnd}
					class="flex items-center p-4 bg-card border rounded-lg cursor-move transition-all
						{draggedItem?.id === project.id ? 'opacity-50' : ''}
						{draggedOverItem?.id === project.id ? 'border-primary bg-accent' : ''}"
				>
					<GripVertical class="mr-3 text-muted-foreground" />
					<div class="flex-1">
						<h3 class="font-semibold">{project.name}</h3>
						{#if project.description}
							<p
								class="text-sm text-muted-foreground line-clamp-1"
							>
								{project.description}
							</p>
						{/if}
					</div>
					<div class="text-sm text-muted-foreground">
						Order: {projects.indexOf(project) + 1}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
