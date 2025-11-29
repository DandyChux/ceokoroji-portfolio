<script lang="ts">
	import { page } from "$app/state";
	import { authStore } from "$lib/stores/auth.svelte";
	import { LogOut, Home, LayoutDashboard, FileText } from "@lucide/svelte";
	import Button from "$components/ui/button/button.svelte";

	let { children } = $props();

	const isLoginPage = $derived(page.url.pathname === "/admin/login");

	async function handleLogout() {
		await authStore.logout();
	}
</script>

{#if isLoginPage}
	<!-- Login page - no navigation -->
	<div class="flex min-h-screen items-center justify-center bg-background">
		{@render children()}
	</div>
{:else if !authStore.isAuthenticated}
	<!-- Not authenticated - redirect happens in +layout.ts -->
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-muted-foreground">Checking authentication...</div>
	</div>
{:else}
	<!-- Authenticated layout with nav -->
	<div class="flex min-h-screen flex-col">
		<!-- Admin Navigation -->
		<nav class="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-16 items-center justify-between">
					<!-- Left: Logo and nav links -->
					<div class="flex items-center gap-8">
						<a
							href="/admin"
							class="flex items-center gap-2 text-lg font-bold text-foreground hover:text-accent transition-colors"
						>
							<LayoutDashboard class="size-5" />
							Admin Panel
						</a>
						<div class="hidden sm:flex items-center gap-1">
							<a
								href="/admin"
								class="px-3 py-2 text-sm font-medium rounded-md transition-colors {page
									.url.pathname === '/admin'
									? 'bg-accent text-accent-foreground'
									: 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'}"
							>
								Dashboard
							</a>
							<a
								href="/admin/posts"
								class="px-3 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-2 {page.url.pathname.startsWith(
									'/admin/posts',
								)
									? 'bg-accent text-accent-foreground'
									: 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'}"
							>
								<FileText class="size-4" />
								Posts
							</a>
						</div>
					</div>

					<!-- Right: Actions -->
					<div class="flex items-center gap-2">
						<Button
							variant="ghost"
							size="sm"
							href="/"
							class="text-muted-foreground hover:text-foreground"
						>
							<Home class="size-4 sm:mr-2" />
							<span class="hidden sm:inline">View Site</span>
						</Button>
						<Button
							variant="outline"
							size="sm"
							onclick={handleLogout}
						>
							<LogOut class="size-4 sm:mr-2" />
							<span class="hidden sm:inline">Logout</span>
						</Button>
					</div>
				</div>
			</div>
		</nav>

		<!-- Main content -->
		<main class="flex-1">
			{@render children()}
		</main>
	</div>
{/if}
