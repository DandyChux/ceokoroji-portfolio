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
						"Failed to submit contact form. Please try again.",
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
		mutationFn: async () => {
			return await apiClient.post("/contact", $formData);
		},
		onSuccess: () => {
			// Remove URL search params
			window.history.replaceState(
				{},
				document.title,
				window.location.pathname,
			);
			reset();
			toast.success("Thank you for your message!");
		},
	}));

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(amount);
	};

	// Use an effect to pre-fill the message on load if the URL has params
	$effect(() => {
		const addonsParam = page.url.searchParams.get("addons");
		const planParam = page.url.searchParams.get("plan");

		// Only pre-fill if the user hasn't typed anything yet
		if (!$formData.message) {
			if (addonsParam) {
				const selectedIds = addonsParam.split(",");
				const selectedAddonObjects = addOns.filter((a) =>
					selectedIds.includes(a.id),
				);

				const oneTimeCost =
					basePlan.price +
					selectedAddonObjects
						.filter((a) => a.type === "one-time")
						.reduce((sum, a) => sum + a.price, 0);

				const recurringCost = selectedAddonObjects
					.filter((a) => a.type === "recurring")
					.reduce((sum, a) => sum + a.price, 0);

				let costText = `Estimated Build Cost: ${formatCurrency(oneTimeCost)}`;
				if (recurringCost > 0) {
					costText += `\nEstimated Maintenance: ${formatCurrency(recurringCost)} / mo`;
				}

				const selectedNames = selectedAddonObjects.map((a) => a.name);

				$formData.message = `Hi Chukwuma,\n\nI'm interested in starting a project using the Base Development package, along with the following add-ons:\n\n- ${selectedNames.join("\n- ")}\n\n${costText}\n\nPlease let me know the next steps for the discovery phase!`;
			} else if (planParam === "base") {
				$formData.message = `Hi Chukwuma,\n\nI'm interested in starting a project using your Core Foundation package (${basePlan.displayPrice}).\n\nPlease let me know the next steps for the discovery phase!`;
			}
		}
	});
</script>

<svelte:head>
	<title>Contact | Chukwuma Okoroji</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen p-12">
	<div class="w-full max-w-2xl">
		<h1 class="text-4xl lg:text-6xl mb-8 font-semibold text-center">
			Get In Touch
		</h1>
		<p class="text-lg lg:text-xl mb-8 text-center text-muted">
			Have a project in mind? Let's work together!
		</p>

		<form method="POST" use:enhance class="space-y-4">
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Full Name</Form.Label>
						<Input
							{...props}
							type="text"
							bind:value={$formData.name}
							placeholder="Full Name"
							class="w-full px-4 py-3 rounded-lg"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email Address</Form.Label>
						<Input
							{...props}
							type="email"
							bind:value={$formData.email}
							placeholder="Email Address"
							class="w-full px-4 py-3 rounded-lg"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="message">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Message</Form.Label>
						<Textarea
							{...props}
							bind:value={$formData.message}
							placeholder="Message"
							rows={10}
							maxlength={1500}
							class="w-full px-4 py-3 rounded-lg resize-none"
						></Textarea>
						<p class="text-sm text-muted mt-1">
							{($formData.message ?? "").length}/1500
						</p>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			{#if contactMutation.isSuccess}
				<div class="p-4 rounded-lg bg-green-100 text-green-800">
					Message sent successfully!
				</div>
			{:else if contactMutation.isError}
				<div class="p-4 rounded-lg bg-red-100 text-red-800">
					Failed to send message. Please try again later.
				</div>
			{/if}

			<Button
				type="submit"
				disabled={$submitting ||
					contactMutation.isPending ||
					($formData.message ?? "").length > 500}
				variant="secondary"
				class="px-8 py-3 self-center"
			>
				{$submitting || contactMutation.isPending
					? "Sending..."
					: "Submit"}
			</Button>
		</form>
	</div>
</div>
