<script lang="ts">
	import NewProjectForm from "$routes/admin/projects/new/new-project-form.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>New Project | Admin</title>
</svelte:head>

<div class="flex flex-col min-h-screen p-6 lg:p-12">
	<div class="w-full max-w-6xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<a
				href="/admin/projects"
				class="text-accent hover:underline mb-4 inline-block"
			>
				← Back to Projects
			</a>
			<h1 class="text-4xl lg:text-6xl font-bold">Create New Project</h1>
		</div>

		{#if data.form.message}
			<p class="text-destructive">{data.form.message}</p>
		{/if}

		<NewProjectForm {data} />
	</div>
</div>
