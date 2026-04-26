<script lang="ts">
	import NewSkillForm from "$routes/admin/skills/new/new-skill-form.svelte";
	import type { Infer, SuperValidated } from "sveltekit-superforms";
	import type { PageData } from "./$types";
	import type { CreateSkill } from "$routes/projects/schema";

	// let data : { data: PageData } = $props();
	let { data }: { data: { form: SuperValidated<Infer<CreateSkill>> } } =
		$props();
</script>

<svelte:head>
	<title>New Skill | Admin</title>
</svelte:head>

<div class="flex flex-col min-h-screen p-6 lg:p-12">
	<div class="w-full max-w-6xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<a
				href="/admin/skills"
				class="text-accent hover:underline mb-4 inline-block"
			>
				← Back to Skills
			</a>
			<h1 class="text-4xl lg:text-6xl font-bold">Create New Skill</h1>
		</div>

		{#if data.form.message}
			<p class="text-destructive">{data.form.message}</p>
		{/if}

		<NewSkillForm {data} />
	</div>
</div>
