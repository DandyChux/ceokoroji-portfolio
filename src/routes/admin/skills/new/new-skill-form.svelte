<script lang="ts">
	import {
		createSkillSchema,
		skillCategories,
		skillLevels,
		type CreateSkill,
		type Skill,
	} from "$routes/projects/schema";
	import * as Form from "$components/ui/form";
	import Input from "$components/ui/input/input.svelte";
	import Textarea from "$components/ui/textarea/textarea.svelte";
	import * as Select from "$components/ui/select";
	import {
		type SuperValidated,
		type Infer,
		superForm,
		defaults,
	} from "sveltekit-superforms";
	import { zod4, zod4Client } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import { tick } from "svelte";
	import { createMutation } from "@tanstack/svelte-query";
	import { useId } from "bits-ui";
	import apiClient from "$lib/api";

	let {
		data,
	}: { data: { form: SuperValidated<Infer<typeof createSkillSchema>> } } =
		$props();

	const API_URL = import.meta.env.VITE_API_URL;

	const createSkillMutation = createMutation(() => ({
		mutationKey: ["skills"],
		mutationFn: async () => {
			return await apiClient.post<Skill, CreateSkill>(
				"/projects/skill",
				$formData,
			);
		},
		onSuccess: () => {
			toast.success("Skill created successfully");
			createSkillMutation.reset();
			form.reset;
		},
		onError: (error) => {
			toast.error(error.message);
		},
		onSettled: () => {
			createSkillMutation.reset();
		},
	}));

	const form = superForm(data.form, {
		validators: zod4Client(createSkillSchema),
		SPA: true,
		onSubmit: async ({ formData, cancel }) => {
			cancel();
			createSkillMutation.mutate();
		},
	});

	const { form: formData, enhance } = form;

	const triggerContent = $derived(
		skillCategories.find((category) => category === $formData.category) ??
			"Select a category",
	);

	const levelTriggerContent = $derived(
		skillLevels.find((level) => level === $formData.level) ??
			"Select a level",
	);

	function closeAndFocusTrigger(triggerId: string) {
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	const triggerId = useId();
</script>

<form method="POST" use:enhance class="space-y-6">
	<!-- Name -->
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Description -->
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Description</Form.Label>
				<Textarea
					{...props}
					bind:value={$formData.description}
					rows={10}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Category -->
	<Form.Field {form} name="category">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Category</Form.Label>
				<Select.Root
					type="single"
					name="category"
					bind:value={$formData.category}
				>
					<Select.Trigger class="w-[180px]">
						{triggerContent}
					</Select.Trigger>
					<Select.Content>
						{#each skillCategories as category, index (index)}
							<Select.Item value={category} label={category}>
								{category}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.Description>Category of the post</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Level -->
	<Form.Field {form} name="level">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Level</Form.Label>
				<Select.Root
					type="single"
					name="level"
					bind:value={$formData.level}
				>
					<Select.Trigger class="w-[180px]">
						{levelTriggerContent}
					</Select.Trigger>
					<Select.Content>
						{#each skillLevels as level, index (index)}
							<Select.Item value={level} label={level}>
								{level}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.Description>Level of the skill</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Icon URL -->
	<Form.Field {form} name="icon_url">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Icon URL</Form.Label>
				<Input
					{...props}
					type="url"
					name="iconUrl"
					bind:value={$formData.icon_url}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description>URL of the skill icon</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mt-4 cursor-pointer">Submit</Form.Button>
</form>
