<script lang="ts">
	import ProjectCard from "$components/project-card.svelte";
	import ResumeButton from "$components/resume-button.svelte";
	import { Button, buttonVariants } from "$components/ui/button";
	import type { Project } from "./projects/schema";

	const featuredProjects: Project[] = [
		{
			name: "BlackStack Software Solutions",
			description:
				"A website for my freelance software development LLC. It was built for potential clients to learn more about the services I offer. For current clients, it serves as a hub for project management and communication with features like a client portal and a blog.",
			documentation:
				"https://github.com/blackstack-software-solutions/blackstack-site",
			deployment: "https://blackstacksolutions.com",
			skills: [
				"Next.js",
				"TRPC",
				"TailwindCSS",
				"TypeScript",
				"AWS S3",
				"PostgreSQL",
			],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/logos/blackstack.svg",
		},
		{
			name: "Silvi",
			description:
				"Silvi is an open-source web-app with the purpose of enabling tree stewards to easily track and report on their reforestation projects as well as sharing that progress with a broader community.",
			documentation: "https://github.com/SilviProtocol/silvi-open",
			deployment: "https://www.silvi.earth/about-us",
			skills: [
				"Next.js",
				"TypeScript",
				"TailwindCSS",
				"Django",
				"Python",
			],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/logos/silvi.svg",
		},
		{
			name: "Sporta Go",
			description:
				"Sporta Go is a platform built for athletes to connect with trainers and coaches. They are a client of BlackStack Software Solutions. MVP currently in development.",
			documentation: "https://github.com/SportaGo/sporta-go-web",
			deployment: "https://thesportago.com",
			skills: [
				"Next.js",
				"Typescript",
				"TailwindCSS",
				"PostgreSQL",
				"AWS S3",
			],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/logos/sporta-go.svg",
		},
	];
</script>

<svelte:head>
	<title>Home | Chukwuma Okoroji</title>
</svelte:head>

<section class="flex flex-col lg:flex-row w-full items-start py-12 2xl:py-32">
	<div class="space-y-6 flex-1">
		<h1
			class="text-4xl lg:text-6xl mb-2 leading-normal font-semibold text-start"
		>
			Hello!
		</h1>
		<h2 class="text-xl lg:text-3xl mb-2 leading-normal font-medium">
			Your Friendly Neighborhood Software Developer
		</h2>
		<p
			class="lg:w-[60%] mb-4 text-lg lg:text-xl 2xl:text-2xl leading-normal font-normal"
		>
			Got an idea? Let&apos;s bring it to life together! I&apos;ve got the
			full-stack expertise to transform your concept into a highly
			functional digital solution.
		</p>

		<div class="flex flex-col gap-4 w-max pt-16 2xl:pt-52">
			<ResumeButton />

			<span class="inline-flex space-x-4">
				<!-- LinkedIn Logo -->
				<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
				<a
					href="https://linkedin.com/in/chukwuma-okoroji/"
					rel="noopener"
					target="_blank"
					class="cursor-pointer group"
					aria-label="LinkedIn"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						class="w-6 h-6 2xl:w-10 2xl:h-10 fill-accent group-hover:fill-accent/80"
					>
						<path
							d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
						/>
					</svg>
				</a>

				<!-- Github Logo -->
				<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
				<a
					href="https://github.com/dandychux/"
					rel="noopener"
					target="_blank"
					class="cursor-pointer group"
					aria-label="Github"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 496 512"
						class="w-6 h-6 2xl:w-10 2xl:h-10 fill-accent group-hover:fill-accent/80"
					>
						<path
							d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
						/>
					</svg>
				</a>

				<!-- Instagram Logo -->
				<a
					href="https://instagram.com/the_ceokoroji/"
					rel="noopener"
					target="_blank"
					class="cursor-pointer group"
					aria-label="Instagram"
				>
					<svg
						fill="currentColor"
						stroke-width="0"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1024 1024"
						height="1em"
						width="1em"
						class="w-6 h-6 2xl:w-10 2xl:h-10 fill-accent group-hover:fill-accent/80"
					>
						<path
							d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"
						/>
					</svg>
				</a>
			</span>
		</div>
	</div>

	<div class="flex-1 relative">
		<enhanced:img
			src={"https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/Cube.svg"}
			alt="Hero Code"
			class="absolute right-10 top-8 2xl:right-32"
		/>
	</div>
</section>

<!-- Featured Projects -->
<section class="my-4 flex flex-col w-full py-12 2xl:py-32">
	<h1 class="text-3xl mb-2 text-center lg:m-0 leading-normal font-normal">
		Featured Projects
	</h1>

	<div class="grid gap-3 pt-3 my-4 md:grid-cls-2 2xl:grid-cols-3">
		{#each featuredProjects as project, index (index)}
			<ProjectCard {...project} class="rounded-3xl" />
		{/each}
	</div>

	<Button
		size={"lg"}
		variant={"link"}
		href="/projects"
		class={buttonVariants({
			class: "self-end hover:text-accent",
			variant: "accent",
		})}
	>
		See All Projects {"->"}
	</Button>
</section>
