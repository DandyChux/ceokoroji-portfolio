<script lang="ts">
	import {
		createPostSchema,
		postCategories,
		postTags,
		type CreatePost,
	} from "$routes/blog/schema";
	import * as Form from "$components/ui/form";
	import Input from "$components/ui/input/input.svelte";
	import Textarea from "$components/ui/textarea/textarea.svelte";
	import * as Command from "$components/ui/command";
	import * as Popover from "$components/ui/popover";
	import * as Select from "$components/ui/select";
	import Checkbox from "$components/ui/checkbox/checkbox.svelte";
	import Calendar from "$components/ui/calendar/calendar.svelte";
	import {
		type SuperValidated,
		type Infer,
		superForm,
		defaults,
	} from "sveltekit-superforms";
	import { zod4, zod4Client } from "sveltekit-superforms/adapters";
	import { generateSlug } from "$lib/utils/markdown";
	import MarkdownEditor from "$components/markdown-editor.svelte";
	import {
		CalendarIcon,
		CheckIcon,
		ChevronsUpDownIcon,
		Tags,
	} from "@lucide/svelte";
	import { Button, buttonVariants } from "$components/ui/button";
	import { cn } from "$lib/utils";
	import { toast } from "svelte-sonner";
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today,
	} from "@internationalized/date";
	import { tick } from "svelte";
	import { createMutation } from "@tanstack/svelte-query";
	import { useId } from "bits-ui";
	import { debounce } from "$lib/utils/debounce.svelte";
	import { Label } from "$components/ui/label";

	let { data }: { data: { form: SuperValidated<Infer<CreatePost>> } } =
		$props();

	const API_URL = import.meta.env.VITE_API_URL;

	const createPostMutation = createMutation(() => ({
		mutationKey: ["posts"],
		mutationFn: async () => {
			const response = await fetch(`${API_URL}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify($formData),
			});
			if (!response.ok) {
				throw new Error("Failed to create post");
			}
			return response.json();
		},
		onSuccess: () => {
			toast.success("Post created successfully!");
		},
		onError: () => {
			toast.error("Failed to create post");
		},
	}));

	const form = superForm(defaults(zod4(createPostSchema)), {
		validators: zod4Client(createPostSchema),
		SPA: true,
		onUpdate: async ({ form }) => {
			if (form.valid) {
				toast.success("Post created successfully!");
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
		onSubmit: async ({ formData, cancel }) => {
			cancel();

			createPostMutation.mutate();
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

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	const dtf = new DateFormatter("en-US", {
		dateStyle: "long",
		timeStyle: "short",
	});

	let placeholder = $state<DateValue>(today(getLocalTimeZone()));
	let timeValue = $state("12:00");

	const triggerContent = $derived(
		postCategories.find((category) => category === $formData.category) ??
			"Select a category",
	);

	const updateSlug = debounce((title: string) => {
		$formData.slug = generateSlug(title);
	}, 300);

	$effect(() => {
		if ($formData.title) {
			updateSlug($formData.title);
		}
	});

	function closeAndFocusTrigger(triggerId: string) {
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	const triggerId = useId();
</script>

<form method="POST" use:enhance class="space-y-6">
	<div class="inline-flex items-center w-full justify-between space-x-8">
		<!-- Title -->
		<Form.Field {form} name="title" class="flex-1">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Title</Form.Label>
					<Input {...props} bind:value={$formData.title} />
				{/snippet}
			</Form.Control>
			<Form.Description>Title of the post</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Slug -->
		<Form.Field {form} name="slug" class="flex-1">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Slug</Form.Label>
					<Input {...props} readonly bind:value={$formData.slug} />
				{/snippet}
			</Form.Control>
			<Form.Description>Slug of the post</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- Description -->
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Description</Form.Label>
				<Textarea
					{...props}
					bind:value={$formData.description}
					rows={10}
					class="w-1/2"
				/>
			{/snippet}
		</Form.Control>
		<Form.Description>Description of the post</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Date/Time -->
	<Form.Field {form} name="date">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Date & Time</Form.Label>
				<div class="flex gap-4">
					<div class="flex flex-col gap-2">
						<Label class="text-xs text-muted-foreground">Date</Label
						>
						<Popover.Root>
							<Popover.Trigger
								{...props}
								class={cn(
									buttonVariants({ variant: "outline" }),
									"w-[200px] justify-start ps-4 text-start font-normal",
									!$formData.date && "text-muted-foreground",
								)}
							>
								{$formData.date
									? df.format($formData.date)
									: "Select a date"}
								<CalendarIcon class="ms-auto size-4" />
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="top">
								<Calendar
									type="single"
									value={$formData.date
										? parseDate(
												$formData.date
													.toISOString()
													.split("T")[0],
											)
										: undefined}
									bind:placeholder
									captionLayout="dropdown"
									minValue={new CalendarDate(2020, 1, 1)}
									maxValue={today(getLocalTimeZone())}
									calendarLabel="Publication date"
									onValueChange={(v) => {
										if (v) {
											const date =
												v.toDate(getLocalTimeZone());
											const [hours, minutes] =
												timeValue.split(":");
											date.setHours(
												parseInt(hours),
												parseInt(minutes),
											);
											$formData.date = date;
										} else {
											$formData.date = new Date();
										}
									}}
								/>
							</Popover.Content>
						</Popover.Root>
					</div>
					<div class="flex flex-col gap-2">
						<Label
							for="time-input"
							class="text-xs text-muted-foreground">Time</Label
						>
						<Input
							id="time-input"
							type="time"
							bind:value={timeValue}
							onchange={() => {
								if ($formData.date) {
									const [hours, minutes] =
										timeValue.split(":");
									const newDate = new Date($formData.date);
									newDate.setHours(
										parseInt(hours),
										parseInt(minutes),
									);
									$formData.date = newDate;
								}
							}}
							class="w-[140px] bg-background"
						/>
					</div>
				</div>
				<Form.Description>
					{$formData.date
						? dtf.format($formData.date)
						: "Publication date and time of the post"}
				</Form.Description>
				<Form.FieldErrors />
				<input hidden value={$formData.date} name={props.name} />
			{/snippet}
		</Form.Control>
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
						{#each postCategories as category, index (index)}
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

	<!-- Tags -->
	<Form.Field {form} name="tags">
		<Form.Control id={triggerId}>
			{#snippet children({ props })}
				<Form.Label>Tags</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						class={cn(
							buttonVariants({ variant: "outline" }),
							"w-[200px] justify-between",
							!$formData.tags && "text-white",
						)}
						role="combobox"
						{...props}
					>
						<!-- {postTags.find((tag) => $formData.tags.includes(tag)) ??
							"No tags selected"} -->
						{$formData.tags.length === 1
							? $formData.tags[0]
							: $formData.tags.length > 1
								? $formData.tags.length + " tags"
								: "No tags selected"}
						<ChevronsUpDownIcon class="opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0 ">
						<Command.Root>
							<Command.Input
								autofocus
								placeholder="Search tags..."
								class="h-10"
							/>
							<Command.Empty>No tags found.</Command.Empty>
							<Command.Group value="tags">
								{#each postTags as tag, index (index)}
									<Command.Item
										value={tag}
										onSelect={() => {
											if ($formData.tags.includes(tag)) {
												$formData.tags =
													$formData.tags.filter(
														(t) => t !== tag,
													);
											} else {
												$formData.tags.push(tag);
											}
											closeAndFocusTrigger(triggerId);
										}}
									>
										{tag}
										<CheckIcon
											class={cn(
												"ms-auto text-primary",
												$formData.tags.includes(tag)
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
				<input hidden value={$formData.tags} name={props.name} />
			{/snippet}
		</Form.Control>
	</Form.Field>

	<!-- Published -->
	<Form.Field {form} name="published">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Published</Form.Label>
				<Checkbox {...props} bind:checked={$formData.published} />
			{/snippet}
		</Form.Control>
		<Form.Description>Whether the post is published</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Content -->
	<Form.Field {form} name="content">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Content</Form.Label>
				<MarkdownEditor {...props} bind:value={$formData.content} />
			{/snippet}
		</Form.Control>
		<Form.Description>Content of the post</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="cursor-pointer mt-4">Submit</Form.Button>
</form>
