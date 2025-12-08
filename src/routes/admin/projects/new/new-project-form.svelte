<script lang="ts">
	import {
		createProjectSchema,
		type CreateProject,
		type Skill,
	} from "$routes/projects/schema";
	import * as Form from "$components/ui/form";
	import Input from "$components/ui/input/input.svelte";
	import Textarea from "$components/ui/textarea/textarea.svelte";
	import * as Command from "$components/ui/command";
	import * as Popover from "$components/ui/popover";
	import {
		type SuperValidated,
		type Infer,
		superForm,
		defaults,
	} from "sveltekit-superforms";
	import { zod4, zod4Client } from "sveltekit-superforms/adapters";
	import { CheckIcon, ChevronsUpDownIcon } from "@lucide/svelte";
	import { buttonVariants } from "$components/ui/button";
	import { cn } from "$lib/utils";
	import { toast } from "svelte-sonner";
	import { tick } from "svelte";
	import { createMutation } from "@tanstack/svelte-query";
	import { useId } from "bits-ui";
	import { Label } from "$components/ui/label";

	let {
		data,
	}: {
		data: { form: SuperValidated<Infer<CreateProject>>; skills: Skill[] };
	} = $props();

	const API_URL = import.meta.env.VITE_API_URL;

	const createProjectMutation = createMutation(() => ({
		mutationKey: ["projects"],
		mutationFn: async () => {
			const response = await fetch(`${API_URL}/projects`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify($formData),
			});
			if (!response.ok) {
				throw new Error("Failed to create project");
			}
			return response.json();
		},
		onSuccess: () => {
			toast.success("Project created successfully");
		},
		onError: () => {
			toast.error("Failed to create project");
		},
	}));

	const form = superForm(defaults(zod4(createProjectSchema)), {
		validators: zod4Client(createProjectSchema),
		SPA: true,
		onSubmit: async ({ formData, cancel }) => {
			cancel();

			createProjectMutation.mutate();
		},
	});

	const {
		form: formData,
		enhance,
		validate,
		submit,
		submitting,
		message,
		errors,
	} = form;

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

	<!-- Featured -->
	<Form.Field {form} name="featured">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Featured</Form.Label>
				<Input
					{...props}
					bind:value={$formData.featured}
					type="checkbox"
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Image URL -->
	<Form.Field {form} name="image_url">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Image URL</Form.Label>
				<Input {...props} bind:value={$formData.image_url} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
		<!-- Image Preview -->
		<div>
			<Label>Image Preview</Label>
			{#if $formData.image_url}
				<img
					src={$formData.image_url}
					alt="Project Image"
					class="w-full h-auto"
				/>
			{:else}
				<p>No image selected</p>
			{/if}
		</div>
	</Form.Field>

	<!-- Github URL -->
	<Form.Field {form} name="github_url">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Github URL</Form.Label>
				<Input {...props} bind:value={$formData.github_url} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Live URL -->
	<Form.Field {form} name="live_url">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Live URL</Form.Label>
				<Input {...props} bind:value={$formData.live_url} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Skills -->
	<Form.Field {form} name="skill_ids">
		<Form.Control id={triggerId}>
			{#snippet children({ props })}
				<Form.Label>Skills</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						class={cn(
							buttonVariants({ variant: "outline" }),
							"w-[200px] justify-between",
							!$formData.skill_ids && "text-white",
						)}
						role="combobox"
						{...props}
					>
						<!-- {postTags.find((tag) => $formData.skill_ids.includes(tag)) ??
							"No tags selected"} -->
						{$formData.skill_ids.length === 1
							? data.skills?.find(
									(skill) =>
										skill.id === $formData.skill_ids[0],
								)?.name
							: $formData.skill_ids.length > 1
								? $formData.skill_ids.length + " skills"
								: "No skills selected"}
						<ChevronsUpDownIcon class="opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0 ">
						<Command.Root>
							<Command.Input
								autofocus
								placeholder="Search skills..."
								class="h-10"
							/>
							<Command.Empty>No skills found.</Command.Empty>
							<Command.Group value="skills">
								{#each data.skills as skill, index (index)}
									<Command.Item
										value={skill.id.toString()}
										onSelect={() => {
											if (
												$formData.skill_ids.includes(
													skill.id,
												)
											) {
												$formData.skill_ids =
													$formData.skill_ids.filter(
														(t) => t !== skill.id,
													);
											} else {
												$formData.skill_ids.push(
													skill.id,
												);
											}
											closeAndFocusTrigger(triggerId);
										}}
									>
										{skill.name}
										<CheckIcon
											class={cn(
												"ms-auto text-primary",
												$formData.skill_ids.includes(
													skill.id,
												)
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
				<Form.Description>
					The tags are used to categorize your post and make it easier
					to find.
				</Form.Description>
				<Form.FieldErrors />
				<input hidden value={$formData.skill_ids} name={props.name} />
			{/snippet}
		</Form.Control>
	</Form.Field>

	<Form.Button class="cursor-pointer mt-4">Create Project</Form.Button>
</form>
