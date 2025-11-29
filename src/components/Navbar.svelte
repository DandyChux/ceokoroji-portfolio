<script lang="ts" module>
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import type { Component } from "svelte";
	import logoSrc from "$lib/assets/ceokoroji-logo.webp";
	import {
		House,
		Mail,
		User,
		Pencil,
		Linkedin,
		BrainCog,
		Github,
		Instagram,
		Menu,
		X,
	} from "@lucide/svelte";
	import * as Sheet from "$components/ui/sheet";
	import Button, { buttonVariants } from "./ui/button/button.svelte";
	import Logo from "./logo.svelte";

	type MenuLink = {
		label: string;
		href: string;
		icon?: Component;
	};

	export const navLinks: MenuLink[] = [
		{ href: "/", label: "Home", icon: House },
		{ href: "/about", label: "About Me", icon: User },
		{ href: "/projects", label: "Projects", icon: BrainCog },
		{ href: "/blog", label: "Blog", icon: Pencil },
		{ href: "/contact", label: "Contact", icon: Mail },
	];

	export const socialLinks: MenuLink[] = [
		{
			label: "LinkedIn",
			href: "https://linkedin.com/in/chukwuma-okoroji/",
			icon: Linkedin,
		},
		{
			label: "@DandyChux",
			href: "https://github.com/dandychux/",
			icon: Github,
		},
		{
			label: "@the_ceokoroji",
			href: "https://instagram.com/the_ceokoroji/",
			icon: Instagram,
		},
	];

	function isActive(href: string): boolean {
		if (href === "/") {
			return page.url.pathname === "/";
		}
		return page.url.pathname.startsWith(href);
	}
</script>

<div
	class="sticky top-0 flex flex-wrap w-full items-center justify-between p-4 bg-transparent text-secondary-foreground z-10 xl:hidden"
	role="navigation"
>
	<Sheet.Root>
		<Sheet.Trigger
			class={buttonVariants({ variant: "outline", size: "icon" })}
		>
			<Menu class="size-8" />
		</Sheet.Trigger>
		<Sheet.Content>
			<Sheet.Header>
				<Sheet.Title class="capitalize">
					{page.url.pathname === "/"
						? "Home"
						: page.url.pathname.split("/").pop()}
				</Sheet.Title>
			</Sheet.Header>
			<nav class="flex flex-col items-center justify-center">
				{#each navLinks as link, index (index)}
					<a
						href={link.href}
						class="hover:text-accent transition-colors w-full border-b border-border/20 py-2 px-4 {isActive(
							link.href,
						)
							? 'text-accent font-semibold'
							: 'text-foreground'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<!-- <enhanced:img
		src={logoSrc}
		alt="Logo"
		width="100"
		height="100"
		class="mx-auto"
	/> -->
	<Button
		variant="link"
		href="/admin/login"
		class={buttonVariants({
			variant: "ghost",
			class: "relative size-auto mx-auto",
		})}
	>
		<enhanced:img src={logoSrc} alt="Logo" width="100" height="100" />
	</Button>
</div>
