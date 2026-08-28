<script lang="ts">
	import { Button } from "$components/ui/button";
	import Input from "$components/ui/input/input.svelte";
	import { Textarea } from "$components/ui/textarea";
	import * as Form from "$components/ui/form";
	import apiClient from "$lib/api";
	import { superForm } from "sveltekit-superforms";
	import { contactSchema } from "$lib/schema";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { createMutation } from "@tanstack/svelte-query";
	import { page } from "$app/state";
	import { basePlan, addOns } from "$lib/config/pricing";
	import { toast } from "svelte-sonner";
	import { Mail, Sparkles } from "@lucide/svelte";

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(contactSchema),
		SPA: true,
		onUpdate: async ({ cancel, form }) => {
			if (form.valid) {
				try {
					await contactMutation.mutateAsync();
				} catch (err) {
					toast.error(
						"I couldn't send that message. Please try again.",
					);
					console.error(err);
					cancel();
				}
			}
		},
	});

	const { form: formData, enhance, submitting, reset } = form;

	const contactMutation = createMutation(() => ({
		mutationKey: ["contact"],
		mutationFn: async () => await apiClient.post("/contact", $formData),
		onSuccess: () => {
			window.history.replaceState(
				{},
				document.title,
				window.location.pathname,
			);

			reset();
			toast.success("Message sent — thanks for reaching out.");
		},
	}));

	const formatCurrency = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(amount);

	$effect(() => {
		const addonsParam = page.url.searchParams.get("addons");
		const planParam = page.url.searchParams.get("plan");

		if (!$formData.message) {
			if (addonsParam) {
				const selectedIds = addonsParam.split(",");

				const selectedAddonObjects = addOns.filter((addon) =>
					selectedIds.includes(addon.id),
				);

				const oneTimeCost =
					basePlan.price +
					selectedAddonObjects
						.filter((addon) => addon.type === "one-time")
						.reduce((sum, addon) => sum + addon.price, 0);

				const recurringCost = selectedAddonObjects
					.filter((addon) => addon.type === "recurring")
					.reduce((sum, addon) => sum + addon.price, 0);

				let costText = `Estimated Build Cost: ${formatCurrency(oneTimeCost)}`;

				if (recurringCost > 0) {
					costText += `\nEstimated Maintenance: ${formatCurrency(recurringCost)} / mo`;
				}

				const selectedNames = selectedAddonObjects.map(
					(addon) => addon.name,
				);

				$formData.message = `Hi Chukwuma,

				I'm interested in starting a project using the Base Development package, along with the following add-ons:

				- ${selectedNames.join("\n- ")}

				${costText}

				Please let me know the next steps for the discovery phase!`;
			} else if (planParam === "base") {
				$formData.message = `Hi Chukwuma,

				I'm interested in starting a project using your Core Foundation package (${basePlan.displayPrice}).

				Please let me know the next steps for the discovery phase!`;
			}
		}
	});
</script>

<svelte:head>
	<title>Contact | Chukwuma Okoroji</title>
	<meta
		name="description"
		content="Send Chukwuma a note about a project, collaboration, or question."
	/>
</svelte:head>

<div class="page-shell contact-page">
	<div class="contact-layout">
		<aside class="contact-intro">
			<p class="eyebrow">
				<Sparkles class="size-4" />
				Start a conversation
			</p>

			<h1>Tell me what you&apos;re working on.</h1>

			<p>
				I&apos;m always interested in thoughtful problems, odd technical
				questions, and projects that could use a second pair of eyes.
			</p>

			<div class="contact-note">
				<Mail class="size-5 text-accent" />

				<span>
					Use the form and I&apos;ll get back to you when I can.
				</span>
			</div>
		</aside>

		<div class="form-panel">
			<form method="POST" use:enhance class="contact-form">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Your name</Form.Label>

							<Input
								{...props}
								type="text"
								bind:value={$formData.name}
								placeholder="What should I call you?"
							/>
						{/snippet}
					</Form.Control>

					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email address</Form.Label>

							<Input
								{...props}
								type="email"
								bind:value={$formData.email}
								placeholder="you@example.com"
							/>
						{/snippet}
					</Form.Control>

					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="message">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>What&apos;s on your mind?</Form.Label>

							<Textarea
								{...props}
								bind:value={$formData.message}
								placeholder="A project, a question, or just saying hello..."
								rows={15}
								maxlength={1500}
								class="resize-none"
							></Textarea>

							<p class="character-count">
								{($formData.message ?? "").length}/1500
							</p>
						{/snippet}
					</Form.Control>

					<Form.FieldErrors />
				</Form.Field>

				{#if contactMutation.isSuccess}
					<div class="form-message success">
						Message sent successfully.
					</div>
				{:else if contactMutation.isError}
					<div class="form-message error">
						Something went wrong while sending this. Please try
						again.
					</div>
				{/if}

				<Button
					type="submit"
					disabled={$submitting ||
						contactMutation.isPending ||
						($formData.message ?? "").length > 500}
					variant="secondary"
					class="submit-button"
				>
					{$submitting || contactMutation.isPending
						? "Sending..."
						: "Send message"}
				</Button>
			</form>
		</div>
	</div>
</div>

<style>
	.contact-page {
		padding-block: 3rem 6rem;
	}

	.contact-layout {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
		gap: clamp(2rem, 9vw, 9rem);
		align-items: start;
		max-width: 1100px;
		margin-inline: auto;
	}

	.contact-intro {
		padding-top: 2rem;
	}

	.contact-intro h1 {
		max-width: 620px;
		margin-top: 1.5rem;
		font-size: clamp(3rem, 6vw, 6rem);
		line-height: 0.96;
		letter-spacing: -0.06em;
	}

	.contact-intro > p:not(.eyebrow) {
		max-width: 32rem;
		margin-top: 2rem;
		font-size: 1.15rem;
		line-height: 1.7;
	}

	.contact-note {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
		max-width: 25rem;
		margin-top: 3rem;
		padding-top: 1.25rem;
		border-top: 1px solid
			color-mix(in oklab, var(--color-primary) 35%, transparent);
		color: var(--color-muted-foreground);
		font-size: 0.85rem;
		line-height: 1.5;
	}

	.form-panel {
		padding: clamp(1.25rem, 4vw, 2.5rem);
		border: 1px solid
			color-mix(in oklab, var(--color-primary) 35%, transparent);
		background: color-mix(in oklab, var(--color-card) 65%, transparent);
	}

	.contact-form {
		display: grid;
		gap: 1.25rem;
	}

	.contact-form :global(input),
	.contact-form :global(textarea) {
		width: 100%;
		border-radius: 0;
		border-color: color-mix(in oklab, var(--color-border) 70%, transparent);
		background: color-mix(
			in oklab,
			var(--color-background) 55%,
			transparent
		);
	}

	.contact-form :global(input:focus),
	.contact-form :global(textarea:focus) {
		border-color: var(--color-accent);
	}

	.character-count {
		margin-top: 0.35rem;
		color: var(--color-muted-foreground);
		font-size: 0.7rem;
		text-align: right;
	}

	.form-message {
		padding: 0.8rem 1rem;
		font-size: 0.85rem;
	}

	.success {
		background: color-mix(in oklab, var(--color-success) 20%, transparent);
		color: var(--color-success);
	}

	.error {
		background: color-mix(
			in oklab,
			var(--color-destructive) 20%,
			transparent
		);
		color: var(--color-destructive);
	}

	.submit-button {
		justify-self: start;
		padding-inline: 1.5rem;
	}

	@media (max-width: 800px) {
		.contact-layout {
			grid-template-columns: 1fr;
		}

		.contact-page {
			padding-top: 1rem;
		}

		.form-panel {
			margin-top: 1rem;
		}
	}
</style>
