<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Chukwuma Okoroji | Software Developer</title>
	<meta name="description" content="Software developer based in Tampa, FL" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Nav />
	<main class="flex-1">
		{@render children?.()}
	</main>
</div>
