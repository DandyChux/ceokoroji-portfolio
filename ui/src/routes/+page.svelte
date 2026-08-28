<script lang="ts">
	import ProjectCard from "$components/project-card.svelte";
	import ResumeButton from "$components/resume-button.svelte";
	import { buttonVariants } from "$components/ui/button";
	import { createQuery } from "@tanstack/svelte-query";
	import type { ProjectResponse } from "./projects/schema";
	import apiClient from "$lib/api";
	import Picture from "$components/picture.svelte";
	import { generateSrcSet } from "$lib/utils";
	import { ArrowRight, Github, Linkedin, Sparkles } from "@lucide/svelte";

	const featuredProjectsQuery = createQuery(() => ({
		queryKey: ["featured-projects"],
		queryFn: async () =>
			await apiClient.get<ProjectResponse[]>("/projects?featured=true"),
	}));
</script>

<svelte:head>
	<title>Chukwuma Okoroji</title>
	<meta
		name="description"
		content="Software engineer and researcher working across clinical informatics, predictive modeling, and secure systems."
	/>
</svelte:head>

<section class="page-shell home-page">
	<div class="hero-shell">
		<div class="hero-copy">
			<p class="eyebrow">
				<Sparkles class="size-4" />
				Engineering at the edge of care
			</p>

			<h1>
				Systems that make
				<br />
				<span>complexity useful.</span>
			</h1>

			<p class="hero-intro">
				Software engineer and researcher documenting work across
				clinical informatics, predictive modeling, and secure systems.
			</p>

			<div class="hero-actions">
				<ResumeButton />

				<a
					href="/projects"
					class={buttonVariants({
						variant: "outline",
						size: "lg",
						class: "border-primary/40",
					})}
				>
					Explore projects
					<ArrowRight class="size-4" />
				</a>
			</div>

			<div class="socials">
				<span>Find me in the field</span>

				<a
					href="https://linkedin.com/in/chukwuma-okoroji/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					class="social-link"
				>
					<Linkedin class="size-4" />
				</a>

				<a
					href="https://github.com/dandychux/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					class="social-link"
				>
					<Github class="size-4" />
				</a>
			</div>
		</div>

		<div class="hero-visual">
			<div class="visual-label">Research / build / repeat</div>

			<Picture
				src="https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/Cube.svg"
				loading="eager"
				srcset={generateSrcSet(
					"https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/Cube.svg",
					[200, 400],
					"webp",
					85,
				)}
				sizes="(max-width: 768px) 200px, 468px"
				alt="Abstract geometric cube"
				class="cube"
			/>

			<div class="visual-note">
				<strong>01</strong>
				<span>
					Turning reliable data
					<br />
					into better decisions.
				</span>
			</div>
		</div>
	</div>

	<section class="projects-preview">
		<div class="section-heading">
			<div>
				<p class="eyebrow">Selected work</p>
				<h2>Featured projects</h2>
			</div>

			<a href="/projects" class="section-link">
				View all
				<ArrowRight class="size-4" />
			</a>
		</div>

		<div class="project-grid">
			{#each featuredProjectsQuery.data ?? [] as project (project.id)}
				<ProjectCard {...project} class="rounded-none" />
			{/each}
		</div>
	</section>
</section>

<style>
	.home-page {
		padding-block: 0 5rem;
	}

	.hero-shell {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
		gap: clamp(2rem, 8vw, 9rem);
		align-items: center;
		min-height: clamp(520px, 78vh, 780px);
	}

	.hero-copy {
		max-width: 680px;
	}

	h1 {
		margin-top: 1.5rem;
		font-size: clamp(3rem, 7vw, 6.8rem);
		line-height: 0.94;
		letter-spacing: -0.06em;
	}

	h1 span {
		color: var(--color-accent);
	}

	.hero-intro {
		max-width: 34rem;
		margin-top: 2rem;
		font-size: clamp(1rem, 1.5vw, 1.3rem);
		line-height: 1.7;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2.5rem;
	}

	.hero-actions :global(a) {
		width: auto;
	}

	.socials {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 2.25rem;
		padding-top: 1.25rem;
		border-top: 1px solid
			color-mix(in oklab, var(--color-primary) 28%, transparent);
		color: var(--color-muted-foreground);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.socials span {
		margin-right: 0.5rem;
	}

	.hero-visual {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 420px;
		border: 1px solid
			color-mix(in oklab, var(--color-primary) 45%, transparent);
		background: radial-gradient(
			circle at center,
			color-mix(in oklab, var(--color-primary) 20%, transparent),
			transparent 63%
		);
		overflow: hidden;
	}

	.hero-visual::before,
	.hero-visual::after {
		content: "";
		position: absolute;
		inset: 1.5rem;
		border: 1px solid
			color-mix(in oklab, var(--color-accent) 55%, transparent);
		border-radius: 50%;
		transform: rotate(35deg) scaleX(0.62);
	}

	.hero-visual::after {
		transform: rotate(-35deg) scaleX(0.62);
	}

	.cube {
		position: relative;
		z-index: 1;
		width: min(68%, 360px);
		animation: float 7s ease-in-out infinite;
	}

	.visual-label {
		position: absolute;
		top: 1rem;
		left: 1rem;
		z-index: 2;
		color: var(--color-muted-foreground);
		font: 0.68rem var(--font-science-gothic);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.visual-note {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		z-index: 2;
		display: flex;
		gap: 0.7rem;
		align-items: flex-start;
		font-size: 0.75rem;
		line-height: 1.4;
	}

	.visual-note strong {
		color: var(--color-accent);
		font: 1.5rem var(--font-science-gothic);
	}

	.projects-preview {
		padding-top: 5rem;
		border-top: 1px solid
			color-mix(in oklab, var(--color-primary) 35%, transparent);
	}

	.section-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-accent);
		font-family: var(--font-science-gothic);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	:global(.project-grid > *) {
		height: 100%;
	}

	@keyframes float {
		50% {
			transform: translateY(-10px) rotate(2deg);
		}
	}

	@media (max-width: 800px) {
		.hero-shell {
			grid-template-columns: 1fr;
			min-height: auto;
			padding-block: 3rem 4rem;
		}

		.hero-visual {
			min-height: 320px;
		}

		.project-grid {
			grid-template-columns: 1fr;
		}

		.section-heading {
			align-items: start;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cube {
			animation: none;
		}
	}
</style>
