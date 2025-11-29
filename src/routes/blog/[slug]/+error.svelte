<script lang="ts">
	import { page } from "$app/state";
</script>

<div class="text-center py-12">
	<h1 class="text-4xl font-bold mb-4">
		Post Not Found: {page.error?.message}
	</h1>
	<p class="text-muted-foreground mb-8">
		The blog post you're looking for doesn't exist or has been removed.
	</p>
	<a
		href="/blog"
		class="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
	>
		← Back to Blog
	</a>
</div>
