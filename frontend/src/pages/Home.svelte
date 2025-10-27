<script lang="ts">
</script>

<div class="flex flex-col h-full p-12">
	<section class="flex flex-col lg:flex-row w-full items-start py-12">
		<div class="space-y-6 flex-1">
			<h1 class="text-4xl lg:text-6xl mb-2 font-semibold">
				Hello!
			</h1>
			<h2 class="text-xl lg:text-3xl mb-2 font-medium">
				Your Friendly Neighborhood Software Developer
			</h2>
			<p class="lg:w-[60%] mb-4 text-lg lg:text-xl">
				Got an idea? Let's bring it to life together! I've got the full-stack expertise to transform your concept into a highly functional digital solution.
			</p>

			<div class="flex flex-col gap-4 w-max pt-16">
				<a 
					href="/resume.pdf" 
					class="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90"
				>
					View Resume
				</a>

				<span class="inline-flex space-x-4">
					<a href="https://linkedin.com/in/chukwuma-okoroji/" target="_blank" class="text-accent hover:opacity-80">
						LinkedIn
					</a>
					<a href="https://github.com/dandychux/" target="_blank" class="text-accent hover:opacity-80">
						GitHub
					</a>
					<a href="https://instagram.com/the_ceokoroji/" target="_blank" class="text-accent hover:opacity-80">
						Instagram
					</a>
				</span>
			</div>
		</div>
	</section>

	<section class="my-4 flex flex-col w-full py-12">
		<h1 class="text-3xl mb-2 text-center font-normal">
			Featured Projects
		</h1>
		<p class="text-center mt-4 text-muted">
			This portfolio has been refactored to use Svelte + Bun for the frontend and Rust for the backend.
		</p>
		<div class="flex justify-center mt-8">
			<a href="/projects" class="text-accent hover:underline">See All Projects →</a>
		</div>
	</section>
</div>
