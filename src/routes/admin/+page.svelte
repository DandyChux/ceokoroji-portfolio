<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import type { Post } from "$routes/blog/schema";
	import type { PageData } from "./$types";
	import { FileText, PlusCircle, Edit, BarChart3 } from "@lucide/svelte";
	import * as Card from "$components/ui/card";

	let { data }: { data: PageData } = $props();

	const postsQuery = createQuery<Post[]>(() => ({
		queryKey: ["admin-posts"],
		queryFn: async () => {
			const response = await fetch(`${data.apiUrl}/posts/admin`);

			if (!response.ok) {
				throw new Error(
					`Failed to fetch posts: ${response.status} ${response.statusText}`,
				);
			}

			return response.json();
		},
		staleTime: 1000 * 60 * 5,
	}));

	const stats = $derived(() => {
		if (!postsQuery.data) {
			return {
				total: 0,
				published: 0,
				drafts: 0,
				recent: [],
			};
		}

		const published = postsQuery.data.filter((p) => p.published).length;
		const drafts = postsQuery.data.filter((p) => !p.published).length;
		const recent = [...postsQuery.data]
			.sort(
				(a, b) =>
					new Date(b.date).getTime() - new Date(a.date).getTime(),
			)
			.slice(0, 5);

		return {
			total: postsQuery.data.length,
			published,
			drafts,
			recent,
		};
	});

	function formatDate(dateString: string | Date): string {
		const date =
			typeof dateString === "string" ? new Date(dateString) : dateString;
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}
</script>

<svelte:head>
	<title>Admin Dashboard | Chukwuma Okoroji</title>
</svelte:head>

<div class="flex flex-col min-h-screen p-6 lg:p-12">
	<div class="w-full max-w-6xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl lg:text-6xl font-bold mb-2">Admin Dashboard</h1>
			<p class="text-muted-foreground">
				Manage your blog posts and content
			</p>
		</div>

		{#if postsQuery.isPending}
			<div class="text-muted-foreground">Loading dashboard...</div>
		{:else if postsQuery.isError}
			<div class="p-4 rounded-lg bg-destructive/10 text-destructive">
				Error: {postsQuery.error?.message}
			</div>
		{:else}
			<!-- Stats Grid -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<!-- Total Posts -->
				<Card.Root>
					<Card.Header
						class="flex flex-row items-center justify-between pb-2"
					>
						<Card.Title class="text-sm font-medium"
							>Total Posts</Card.Title
						>
						<FileText class="size-4 text-muted-foreground" />
					</Card.Header>
					<Card.Content>
						<div class="text-3xl font-bold">
							{stats().total}
						</div>
						<p class="text-xs text-muted-foreground mt-1">
							All blog posts
						</p>
					</Card.Content>
				</Card.Root>

				<!-- Published -->
				<Card.Root>
					<Card.Header
						class="flex flex-row items-center justify-between pb-2"
					>
						<Card.Title class="text-sm font-medium"
							>Published</Card.Title
						>
						<BarChart3 class="size-4 text-muted-foreground" />
					</Card.Header>
					<Card.Content>
						<div class="text-3xl font-bold">
							{stats().published}
						</div>
						<p class="text-xs text-muted-foreground mt-1">
							Live on your blog
						</p>
					</Card.Content>
				</Card.Root>

				<!-- Drafts -->
				<Card.Root>
					<Card.Header
						class="flex flex-row items-center justify-between pb-2"
					>
						<Card.Title class="text-sm font-medium"
							>Drafts</Card.Title
						>
						<Edit class="size-4 text-muted-foreground" />
					</Card.Header>
					<Card.Content>
						<div class="text-3xl font-bold">
							{stats().drafts}
						</div>
						<p class="text-xs text-muted-foreground mt-1">
							Work in progress
						</p>
					</Card.Content>
				</Card.Root>
			</div>

			<!-- Quick Actions -->
			<Card.Root class="mb-8">
				<Card.Header>
					<Card.Title>Quick Actions</Card.Title>
					<Card.Description>
						Common tasks and shortcuts
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<a
							href="/admin/posts/new"
							class="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition group"
						>
							<div
								class="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition"
							>
								<PlusCircle class="size-5" />
							</div>
							<div>
								<div class="font-semibold">Create New Post</div>
								<div class="text-sm text-muted-foreground">
									Write a new blog post
								</div>
							</div>
						</a>

						<a
							href="/admin/posts"
							class="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition group"
						>
							<div
								class="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition"
							>
								<FileText class="size-5" />
							</div>
							<div>
								<div class="font-semibold">Manage Posts</div>
								<div class="text-sm text-muted-foreground">
									View and edit all posts
								</div>
							</div>
						</a>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Recent Posts -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Recent Posts</Card.Title>
					<Card.Description>Your latest blog posts</Card.Description>
				</Card.Header>
				<Card.Content>
					{#if stats().recent.length === 0}
						<div class="text-center py-8">
							<p class="text-muted-foreground mb-4">
								No posts yet. Create your first post to get
								started!
							</p>
							<a
								href="/admin/posts/new"
								class="text-accent hover:underline"
							>
								Create Post →
							</a>
						</div>
					{:else}
						<div class="space-y-4">
							{#each stats().recent as post (post.id)}
								<div
									class="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/10 transition"
								>
									<div class="flex-1">
										<a
											href="/blog/{post.slug}"
											class="font-semibold hover:text-accent"
										>
											{post.title}
										</a>
										<div
											class="flex items-center gap-2 mt-1 text-sm text-muted-foreground"
										>
											<span>{formatDate(post.date)}</span>
											<span>•</span>
											<span
												class="px-2 py-0.5 rounded-full text-xs {post.published
													? 'bg-success/10 text-success'
													: 'bg-muted/30'}"
											>
												{post.published
													? "Published"
													: "Draft"}
											</span>
										</div>
									</div>
									<div class="flex gap-2 ml-4">
										<a
											href="/admin/posts/edit/{post.slug}"
											class="px-3 py-1 text-sm text-primary hover:underline"
										>
											Edit
										</a>
									</div>
								</div>
							{/each}
						</div>

						{#if postsQuery.data && postsQuery.data.length > 5}
							<div class="mt-4 text-center">
								<a
									href="/admin/posts"
									class="text-accent hover:underline"
								>
									View all posts →
								</a>
							</div>
						{/if}
					{/if}
				</Card.Content>
			</Card.Root>
		{/if}
	</div>
</div>
