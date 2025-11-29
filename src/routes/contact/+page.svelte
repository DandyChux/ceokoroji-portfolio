<script lang="ts">
	import { Button } from "$components/ui/button";
	import Input from "$components/ui/input/input.svelte";
	import { Textarea } from "$components/ui/textarea";
	import { onMount } from "svelte";

	let name = $state("");
	let email = $state("");
	let message = $state("");
	let isSubmitting = $state(false);
	let submitStatus = $state<"success" | "error" | null>(null);
	let statusMessage = $state("");

	const API_URL = "http://localhost:8080";

	async function handleSubmit(event: Event) {
		event.preventDefault();

		isSubmitting = true;
		submitStatus = null;

		try {
			const response = await fetch(`${API_URL}/api/contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, message }),
			});

			if (response.ok) {
				submitStatus = "success";
				statusMessage = "Message sent successfully!";
				name = "";
				email = "";
				message = "";
			} else {
				submitStatus = "error";
				statusMessage = "Something went wrong. Please try again.";
			}
		} catch (error) {
			submitStatus = "error";
			statusMessage = "Failed to send message. Please try again later.";
		} finally {
			isSubmitting = false;
		}
	}
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

		<form onsubmit={handleSubmit} class="flex flex-col gap-4">
			<div>
				<Input
					type="text"
					bind:value={name}
					placeholder="Full Name"
					required
					class="w-full px-4 py-3 rounded-lg"
				/>
			</div>

			<div>
				<Input
					type="email"
					bind:value={email}
					placeholder="Email Address"
					required
					class="w-full px-4 py-3 rounded-lg"
				/>
			</div>

			<div>
				<Textarea
					bind:value={message}
					placeholder="Message"
					rows={10}
					required
					maxlength={500}
					class="w-full px-4 py-3 rounded-lg resize-none"
				></Textarea>
				<p class="text-sm text-muted mt-1">{message.length}/500</p>
			</div>

			{#if submitStatus}
				<div
					class="p-4 rounded-lg {submitStatus === 'success'
						? 'bg-green-100 text-green-800'
						: 'bg-red-100 text-red-800'}"
				>
					{statusMessage}
				</div>
			{/if}

			<Button
				type="submit"
				disabled={isSubmitting || message.length > 500}
				variant="secondary"
				class="px-8 py-3 self-center"
			>
				{isSubmitting ? "Sending..." : "Submit"}
			</Button>
		</form>
	</div>
</div>
