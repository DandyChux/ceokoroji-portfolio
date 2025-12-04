<script lang="ts">
	import { page } from "$app/state";
	import { cn } from "$lib/utils";
	import logoSrc from "$lib/assets/ceokoroji-logo.webp";
	import Button, { buttonVariants } from "./ui/button/button.svelte";

	$: pathname = page.url.pathname;
</script>

<div class="hidden xl:flex md:flex-col absolute top-4 right-4 items-center">
	<Button variant="link" href="/admin" class="cursor-default">
		<enhanced:img src={logoSrc} alt="Logo" width="100" height="100" />
	</Button>
</div>
