<script lang="ts">
	import { page } from "$app/state";
	import { generateSrcSet } from "$lib/utils";
	import Picture from "./picture.svelte";
	import Button, { buttonVariants } from "./ui/button/button.svelte";

	let pathname = page.url.pathname;
</script>

<div class="hidden xl:flex md:flex-col absolute top-4 right-4 items-center">
	<Button
		variant="link"
		href="/admin"
		class="cursor-default"
		data-sveltekit-preload-data="tap"
	>
		<Picture
			src={"https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/logos/ceokoroji-logo.webp"}
			alt="Logo"
			width="100"
			height="100"
			sizes="175px"
			srcset={generateSrcSet(
				"https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/logos/ceokoroji-logo.webp",
				[175],
				"webp",
				85,
			)}
		/>
	</Button>
</div>
