<script lang="ts">
	import { onMount } from "svelte";
	import { Button, buttonVariants } from "$components/ui/button";
	import { ArrowDown } from "@lucide/svelte";
	import { cn } from "$lib/utils";
	import { page } from "$app/state";

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();

	let btnText = page.url.pathname === "/" ? "Download CV" : "View My Resume";

	function handleClick() {
		// Call Plausible if available (plausible.js exposes a global function)
		try {
			if (typeof (window as any).plausible === "function") {
				(window as any).plausible("Resume Downloaded", {
					props: {
						btnLocation: page.url.pathname,
						btnText,
					},
				});
			}
		} catch (e) {
			// ignore errors
			// console.warn('plausible unavailable', e);
		}
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
