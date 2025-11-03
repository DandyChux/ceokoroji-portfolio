<script lang="ts">
	import { onMount } from "svelte";
	import { Button } from "$components/ui/button";
	import { ArrowDown } from "@lucide/svelte";

	let pathname = "/";
	onMount(() => {
		if (typeof window !== "undefined") {
			pathname = window.location.pathname;
		}
	});

	$: btnText = pathname === "/" ? "Download CV" : "View My Resume";

	function handleClick() {
		// Call Plausible if available (plausible.js exposes a global function)
		try {
			if (typeof (window as any).plausible === "function") {
				(window as any).plausible("Resume Downloaded", {
					props: {
						btnLocation: pathname,
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
	href="/Chukwuma_Okoroji.pdf"
	rel="noopener noreferrer"
	target="_blank"
	download
	on:click={handleClick}
	aria-label={btnText}
>
	{btnText}
	<ArrowDown className="ml-2 size-4" />
</Button>

<style></style>
