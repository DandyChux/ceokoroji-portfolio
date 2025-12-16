<script lang="ts">
	import { cn } from "$lib/utils";
	import { Button, buttonVariants } from "./ui/button";
	import { page } from "$app/state";
	import { Share2 } from "@lucide/svelte";
	import type { ComponentProps } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface ShareLinksProps extends HTMLAttributes<HTMLDivElement> {
		title: string;
		description?: string;
	}

	let { title, description = "", ...restProps }: ShareLinksProps = $props();

	const pathname = page.url.pathname;

	const encodedUrl = encodeURIComponent(page.url.href);
	const encodedTitle = encodeURIComponent(title);
	const encodedDescription = encodeURIComponent(description);

	const shareOnTwitter = () => {
		const url = `https://twitter.com/intent/tweet?text=${encodedTitle}${page.url.href}`;
		window.open(url, "_blank");
	};

	const shareOnFacebook = () => {
		const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
		window.open(url, "_blank");
	};

	const shareOnLinkedIn = () => {
		const url = `https://www.linkedin.com/feed/?shareActive=true&shareUrl=${encodedUrl}`;
		window.open(url, "_blank");
	};

	const shareOnInstagram = () => {
		const url = `https://www.instagram.com/share?url=${encodedUrl}`;
		window.open(url, "_blank");
	};
</script>

<div
	{...restProps}
	class={cn(
		"flex items-center gap-2 my-6 font-science-gothic",
		restProps.class,
	)}
>
	<span class="text-sm flex items-center gap-1 text-primary tracking-wider">
		<Share2 size={16} class="mr-1" /> Share:
	</span>
	<Button
		variant="link"
		href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}"
		target="_blank"
		rel="noopener noreferrer"
		size="sm"
		class={buttonVariants({
			variant: "outline",
			class: "rounded-full cursor-pointer",
		})}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M4 4l11.733 16h4.267l-11.733 -16z"
			/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg
		>
		<span class="sr-only">Share on X(Twitter)</span>
	</Button>
	<Button
		variant="link"
		href=""
		target="_blank"
		rel="noopener noreferrer"
		size="sm"
		class={buttonVariants({
			variant: "outline",
			class: "rounded-full cursor-pointer",
		})}
		onclick={shareOnFacebook}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
			/></svg
		>
		<span class="sr-only">Share on Facebook</span>
	</Button>
	<Button
		variant="link"
		href="https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}&source=${page
			.url.host}"
		target="_blank"
		rel="noopener noreferrer"
		size="sm"
		class={buttonVariants({
			variant: "outline",
			class: "rounded-full cursor-pointer",
		})}
		onclick={shareOnLinkedIn}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M8 11v5"
			/><path d="M8 8v.01" /><path d="M12 16v-5" /><path
				d="M16 16v-3a2 2 0 1 0 -4 0"
			/><path
				d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"
			/></svg
		>
		<span class="sr-only">Share on LinkedIn</span>
	</Button>
	<Button
		variant="link"
		href=""
		target="_blank"
		rel="noopener noreferrer"
		size="sm"
		class={buttonVariants({
			variant: "outline",
			class: "rounded-full cursor-pointer",
		})}
		onclick={shareOnInstagram}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"
			/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path
				d="M16.5 7.5v.01"
			/></svg
		>
		<span class="sr-only">Share on Instagram</span>
	</Button>
</div>
