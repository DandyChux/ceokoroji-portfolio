<script lang="ts">
	import { onDestroy } from "svelte";
	import Skeleton from "./skeleton/skeleton.svelte";

	// Props
	export let src: string | undefined;
	export let alt = "";
	export let className = "";
	// Optional: pass a Svelte component to be rendered as fallback,
	// or use the named <slot name="fallback"> to provide fallback markup.
	export let fallbackComponent: any = null;

	// internal state
	let status: "loading" | "loaded" | "error" = "loading";
	let imgEl: HTMLImageElement | null = null;
	let _img: HTMLImageElement | null = null;
	let cleanup = () => {};

	function startPreload(currentSrc?: string) {
		cleanup();
		if (!currentSrc) {
			status = "error";
			return;
		}

		status = "loading";

		_img = new Image();

		const handleLoad = () => {
			status = "loaded";
		};

		const handleError = () => {
			status = "error";
		};

		_img.addEventListener("load", handleLoad);
		_img.addEventListener("error", handleError);

		_img.src = currentSrc;

		// If already cached/loaded
		if (_img.complete && _img.naturalWidth > 0) {
			status = "loaded";
		}

		cleanup = () => {
			if (!_img) return;
			_img.removeEventListener("load", handleLoad);
			_img.removeEventListener("error", handleError);
			_img = null;
		};
	}

	// react to src changes
	$: {
		if (src === undefined || src === null || src === "") {
			status = "error";
			cleanup();
		} else {
			startPreload(src);
		}
	}

	onDestroy(() => {
		cleanup();
	});
</script>

<div class="relative {className}">
	{#if status !== "loaded"}
		<div class="absolute inset-0">
			<slot name="fallback">
				{#if fallbackComponent}
					<svelte:component
						this={fallbackComponent}
						class="w-full h-full object-cover aspect-square"
					/>
				{:else}
					<Skeleton
						class="w-full h-full object-cover aspect-square"
					/>
				{/if}
			</slot>
		</div>
	{/if}

	<img
		bind:this={imgEl}
		{src}
		{alt}
		class="{className} {status !== 'loaded' ? 'invisible' : ''}"
		on:load={() => (status = "loaded")}
		on:error={() => (status = "error")}
		{...$$restProps}
	/>
</div>
