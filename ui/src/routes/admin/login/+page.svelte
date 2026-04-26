<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import Button from "$components/ui/button/button.svelte";
	import * as Card from "$components/ui/card";
	import { authStore } from "$lib/stores/auth.svelte";
	import Input from "$components/ui/input/input.svelte";
	import Label from "$components/ui/label/label.svelte";

	let password = $state("");
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	async function handleLogin(e: Event) {
		e.preventDefault();
		isLoading = true;
		error = null;

		try {
			await authStore.login(password);

			const redirect = page.url.searchParams.get("redirect") || "/admin";
			goto(redirect);
		} catch (err) {
			error = err instanceof Error ? err.message : "Login failed";
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login | Chukwuma Okoroji</title>
</svelte:head>

<Card.Root class="max-w-md w-full mx-4">
	<Card.Header>
		<Card.Title class="font-science-gothic">Admin Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleLogin} class="space-y-4">
			<div class="space-y-2">
				<Label for="password">Password</Label>
				<Input
					id="password"
					type="password"
					bind:value={password}
					required
					placeholder="Enter admin password"
					disabled={isLoading}
				/>
			</div>

			{#if error}
				<div class="text-sm text-destructive">
					{error}
				</div>
			{/if}

			<Button type="submit" disabled={isLoading} class="w-full">
				{isLoading ? "Logging in..." : "Login"}
			</Button>
		</form>
	</Card.Content>
</Card.Root>
