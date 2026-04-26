<script lang="ts">
	import { createMutation, createQuery } from "@tanstack/svelte-query";
	import type { Post } from "$routes/blog/schema";
	import type { PageData } from "./$types";
	import apiClient from "$lib/api";

	let { data }: { data: PageData } = $props();

	const postsQuery = createQuery<Post[]>(() => ({
		queryKey: ["admin", "posts"],
		queryFn: async () => {
			return await apiClient.get("/posts/admin");
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
		refetchOnWindowFocus: true, // Refetch when user returns to tab
	}));

	const deletePost = createMutation(() => ({
		mutationKey: ["admin", "posts"],
		mutationFn: async (id: string) => {
			const response = await fetch(`${data.apiUrl}/posts/${id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				return id;
			} else {
				throw new Error("Failed to delete post");
			}
		},
		onSuccess: () => {
			postsQuery.refetch();
		},
		onError: (error) => {
			alert("Failed to delete post");
		},
	}));

	const togglePublish = createMutation(() => ({
		mutationKey: ["admin", "posts"],
		mutationFn: async (post: Post) => {
			const response = await fetch(`${data.apiUrl}/posts/${post.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					published: !post.published,
				}),
			});

			if (response.ok) {
				return post.id;
			} else {
				throw new Error("Failed to update post");
			}
		},
		onSuccess: () => {
			postsQuery.refetch();
		},
		onError: (error) => {
			alert("Failed to update post");
		},
	}));

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}
</script>

<svelte:head>
	<title>Manage Posts | Admin</title>
</svelte:head>

<div class="flex flex-col min-h-screen p-6 lg:p-12">
	<div class="w-full max-w-6xl mx-auto">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<h1 class="text-4xl lg:text-6xl font-bold">Manage Posts</h1>
			<a
				href="/admin/posts/new"
				class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
			>
				+ New Post
			</a>
		</div>

		{#if postsQuery.isLoading}
			<p class="text-muted-foreground">Loading posts...</p>
		{:else if postsQuery.isError}
			<div class="p-4 rounded-lg bg-destructive/10 text-destructive">
				Error: {postsQuery.error?.message}
			</div>
		{:else if postsQuery.data?.length === 0}
			<div class="text-center py-12">
				<p class="text-muted-foreground mb-4">No posts yet.</p>
				<a href="/admin/posts/new" class="text-accent hover:underline">
					Create your first post →
				</a>
			</div>
		{:else}
			<!-- Posts table -->
			<div class="border border-border rounded-lg overflow-hidden">
				<table class="w-full">
					<thead class="bg-muted/30">
						<tr>
							<th class="text-left p-4 font-semibold">Title</th>
							<th class="text-left p-4 font-semibold">Category</th
							>
							<th class="text-left p-4 font-semibold">Date</th>
							<th class="text-left p-4 font-semibold">Status</th>
							<th class="text-right p-4 font-semibold">Actions</th
							>
						</tr>
					</thead>
					<tbody>
						{#each postsQuery.data as post (post.id)}
							<tr
								class="border-t border-border hover:bg-muted/10"
							>
								<td class="p-4">
									<div>
										<a
											href="/blog/{post.slug}"
											class="font-semibold hover:text-accent"
										>
											{post.title}
										</a>
										<p
											class="text-sm text-muted-foreground line-clamp-1"
										>
											{post.description}
										</p>
									</div>
								</td>
								<td class="p-4">
									<span
										class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
									>
										{post.category}
									</span>
								</td>
								<td class="p-4 text-sm text-muted-foreground">
									{formatDate(post.date.toString())}
								</td>
								<td class="p-4">
									<button
										onclick={() =>
											togglePublish.mutate(post)}
										class="px-3 py-1 rounded-full text-sm font-medium {post.published
											? 'bg-success/10 text-success'
											: 'bg-muted/30 text-muted-foreground'}"
									>
										{post.published ? "Published" : "Draft"}
									</button>
								</td>
								<td class="p-4">
									<div
										class="flex items-center justify-end gap-2"
									>
										<a
											href="/blog/{post.slug}"
											target="_blank"
											class="px-3 py-1 text-sm text-accent hover:underline"
										>
											View
										</a>
										<a
											href="/admin/posts/edit/{post.slug}"
											class="px-3 py-1 text-sm text-primary hover:underline"
										>
											Edit
										</a>
										<button
											onclick={() =>
												deletePost.mutate(
													post.id.toString(),
												)}
											class="px-3 py-1 text-sm text-destructive hover:underline"
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}

		<div class="mt-8">
			<a href="/admin" class="text-accent hover:underline"
				>← Back to Admin</a
			>
		</div>
	</div>
</div>

<style>
	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
