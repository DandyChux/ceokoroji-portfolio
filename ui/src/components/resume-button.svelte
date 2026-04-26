<script lang="ts">
	import { onMount } from "svelte";
	import { Button, buttonVariants } from "$components/ui/button";
	import { ArrowDown } from "@lucide/svelte";
	import { cn } from "$lib/utils";
	import { page } from "$app/state";
	import { trackEvent } from "$lib/analytics.svelte";

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();

	let btnText = page.url.pathname === "/" ? "Download CV" : "View My Resume";

	function handleClick() {
		trackEvent("Resume Downloaded", {
			props: {
				btnLocation: page.url.pathname,
				btnText,
			},
		});
	}
</script>

<Button
	variant="link"
	href="https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/files/CEOkoroji_Resume.pdf"
	rel="noopener noreferrer"
	target="_blank"
	download
	on:click={handleClick}
	aria-label={btnText}
	class={buttonVariants({
		variant: "accent",
		class: cn("w-full", className),
	})}
>
	{btnText}
	<ArrowDown className="ml-2 size-4" />
</Button>

<style></style>
