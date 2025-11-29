<script lang="ts">
	import * as Sidebar from "$components/ui/sidebar";
	import { navLinks } from "$components/navbar.svelte";
	import * as Avatar from "$components/ui/avatar";
	import { page } from "$app/state";
	import { cn } from "$lib/utils";
	import Button from "./ui/button/button.svelte";
	import { LogIn } from "@lucide/svelte";

	const isActive = (href: string) => page.url.pathname === href;
</script>

<Sidebar.Root collapsible="icon" class="hidden xl:relative xl:block">
	<Sidebar.Header class="items-center group-data-[collapsible=icon]:hidden">
		<Avatar.Root class="h-48 w-48">
			<Avatar.Image
				src="https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/images/ceokoroji_headshot.jpg"
				alt="Chukwuma Okoroji"
				class="scale-[2.5] origin-[50%_60%]"
			/>
			<Avatar.Fallback>CO</Avatar.Fallback>
		</Avatar.Root>

		<span class="font-semibold text-xl xl:text-3xl">
			Chukwuma Okoroji
		</span>

		<span class="tracking-wider px-10 text-center">
			Javascript | Python | Rust | Go
		</span>
	</Sidebar.Header>
	<Sidebar.Content class="justify-center">
		<Sidebar.Group>
			<!-- <Sidebar.GroupLabel>Application</Sidebar.GroupLabel> -->
			<Sidebar.GroupContent>
				<Sidebar.Menu class="items-center">
					{#each navLinks as link (link.label)}
						<Sidebar.MenuItem class="text-xl w-full">
							<Sidebar.MenuButton
								class={cn(
									"border border-transparent flex-col items-center h-auto",
									{
										"border-border/30 rounded-md before:content-['•'] before:absolute before:text-accent hover:before:text-white before:text-lg before:-top-2 pt-4 before:font-bold":
											isActive(link.href),
									},
								)}
							>
								{#snippet child({ props })}
									<a href={link.href} {...props}>
										<link.icon />
										<span
											class="group-data-[collapsible=icon]:hidden"
											>{link.label}</span
										>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Trigger variant="ghost" class="self-center text-primary" />
		<!-- <Button
			variant="ghost"
			href="/admin/login"
			class="self-center text-primary size-auto"
		>
			<LogIn />
			<span class="group-data-[collapsible=icon]:hidden">Login</span>
		</Button> -->
	</Sidebar.Footer>
</Sidebar.Root>
