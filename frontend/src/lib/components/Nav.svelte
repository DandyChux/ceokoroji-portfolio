<script lang="ts">
	import { page } from '$app/stores';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' },
	];

	function isActive(href: string): boolean {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	}
</script>

<nav class="bg-card border-b border-border px-6 py-4">
	<div class="max-w-7xl mx-auto flex items-center justify-between">
		<a href="/" class="text-2xl font-bold text-accent">
			CO
		</a>

		<ul class="flex space-x-6">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="hover:text-accent transition-colors {isActive(item.href)
							? 'text-accent font-semibold'
							: 'text-foreground'}"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
