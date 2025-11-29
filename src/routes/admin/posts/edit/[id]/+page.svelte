<script lang="ts">
	import EditPostForm from "./edit-post-form.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Edit Post | Admin</title>
</svelte:head>

<div class="flex flex-col min-h-screen p-6 lg:p-12">
	<div class="w-full max-w-4xl mx-auto">
		<div class="mb-8">
			<h1 class="text-4xl lg:text-6xl font-bold mb-2">Edit Post</h1>
			<p class="text-muted-foreground">
				Editing: {data.post?.title}
			</p>
		</div>

		<EditPostForm {data} />
	</div>
</div>
