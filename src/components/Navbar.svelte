<script lang="ts" module>
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import * as Sidebar from "$components/ui/sidebar";
	import type { Component } from "svelte";
	import {
		House,
		Mail,
		User,
		Pencil,
		Linkedin,
		BrainCog,
		Github,
		Instagram,
	} from "@lucide/svelte";

	type MenuLink = {
		label: string;
		href: string;
		icon?: Component;
	};

	export const navLinks: MenuLink[] = [
		{ href: "/", label: "Home", icon: House },
		{ href: "/about", label: "About", icon: User },
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

<nav class="bg-card border-b border-border px-6 py-4 xl:hidden">
	<div class="max-w-7xl mx-auto flex items-center justify-between">
		<a href="/" class="text-2xl font-bold text-accent"> CO </a>

		<ul class="flex space-x-6">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="hover:text-accent transition-colors {isActive(
							link.href,
						)
							? 'text-accent font-semibold'
							: 'text-foreground'}"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
