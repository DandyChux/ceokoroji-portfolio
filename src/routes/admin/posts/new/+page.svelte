<script lang="ts">
	import NewPostForm from "$routes/admin/posts/new/new-post-form.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>New Post | Admin</title>
</svelte:head>

<div class="flex flex-col min-h-screen p-6 lg:p-12">
	<div class="w-full max-w-6xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<a
				href="/admin/posts"
				class="text-accent hover:underline mb-4 inline-block"
			>
				← Back to Posts
			</a>
			<h1 class="text-4xl lg:text-6xl font-bold">Create New Post</h1>
		</div>

		{#if data.form.message}
			<p class="text-red-500">{data.form.message}</p>
		{/if}

		<NewPostForm {data} />
	</div>
</div>
