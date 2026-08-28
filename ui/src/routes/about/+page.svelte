<script lang="ts">
	import ResumeButton from "$components/resume-button.svelte";
	import * as Card from "$components/ui/card/index";
	import { createQuery } from "@tanstack/svelte-query";
	import apiClient from "$lib/api";
	import type { GroupedSkillsResponse } from "$routes/projects/schema";
	import Picture from "$components/picture.svelte";
	import { generateSrcSet } from "$lib/utils";
	import {
		ArrowRight,
		BriefcaseBusiness,
		GraduationCap,
		Sparkles,
	} from "@lucide/svelte";

	const skillsQuery = createQuery(() => ({
		queryKey: ["skills"],
		queryFn: async () =>
			await apiClient.get<GroupedSkillsResponse>(
				"/projects/skill-categories",
			),
		select: (data) => data.categories,
	}));
</script>

<svelte:head>
	<title>About | Chukwuma Okoroji</title>
	<meta
		name="description"
		content="Learn more about Chukwuma Okoroji's engineering practice, research, and technical experience."
	/>
</svelte:head>

<div class="about-page page-shell">
	<header class="page-intro">
		<p class="eyebrow">
			<Sparkles class="size-4" />
			The person behind the systems
		</p>

		<h1>
			Building with
			<br />
			<span>care and rigor.</span>
		</h1>

		<p class="intro">
			A software engineer working where enterprise systems, clinical
			research, and human outcomes overlap.
		</p>
	</header>

	<section class="profile-grid">
		<div class="portrait-wrap">
			<Picture
				src="https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/images/ceokoroji_full-shot.webp"
				alt="Full body image of Chukwuma Okoroji"
				class="portrait"
				srcset={generateSrcSet(
					"https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/images/ceokoroji_full-shot.webp",
					[250, 400],
					"webp",
					85,
				)}
				sizes="(max-width: 768px) 250px, 400px"
			/>

			<div class="profile-stamp">
				<strong>5+</strong>
				<span>
					years of experience
					<br />
					and counting
				</span>
			</div>
		</div>

		<article class="bio">
			<p class="lead">
				I am a Software Engineer with a background in enterprise
				systems. By day, I build secure financial data pipelines at
				Jabil. By night, I explore how similar data architectures can be
				applied to healthcare.
			</p>

			<p>
				Currently, I am pursuing my Master's at USF, where my research
				focuses on clinical informatics and data integrity. Through my
				graduate research, I am developing tools for predictive clinical
				care and exploring how to build secure, FHIR-compatible
				applications.
			</p>

			<ResumeButton class="w-auto" />
		</article>
	</section>

	<section class="principles" aria-label="Working principles">
		<div class="principle">
			<BriefcaseBusiness class="size-5 text-accent" />
			<span>Practice</span>
			<strong>Production-minded engineering</strong>
		</div>

		<div class="principle">
			<GraduationCap class="size-5 text-accent" />
			<span>Research</span>
			<strong>Evidence over assumption</strong>
		</div>

		<div class="principle">
			<ArrowRight class="size-5 text-accent" />
			<span>Direction</span>
			<strong>Better decisions through data</strong>
		</div>
	</section>

	<section class="skills-section">
		<div class="section-heading">
			<div>
				<p class="eyebrow">The working toolkit</p>
				<h2>Skills &amp; expertise</h2>
			</div>

			<p>
				Technologies I use to build efficient, dependable applications.
			</p>
		</div>

		<div class="skills-grid">
			{#each skillsQuery.data ?? [] as category (category.name)}
				<Card.Root class="skill-card">
					<Card.Header>
						<Card.Title>{category.name}</Card.Title>
					</Card.Header>

					<Card.Content>
						{#each category.skills as skill (skill.id)}
							<div class="skill-row">
								{#if skill.icon_url}
									<img
										src={skill.icon_url}
										alt=""
										class="size-5"
									/>
								{:else}
									<span class="skill-dot"></span>
								{/if}

								<span>{skill.name}</span>
								<!-- <small>{skill.level}</small> -->
							</div>
						{/each}
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
</div>

<style>
	.about-page {
		padding-block: 2rem 5rem;
	}

	.page-intro {
		max-width: 760px;
		padding-block: 2rem 5rem;
	}

	.eyebrow {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--color-accent);
		font: 0.72rem var(--font-science-gothic);
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	h1 {
		margin-top: 1.5rem;
		font-size: clamp(3rem, 7vw, 6.2rem);
		line-height: 0.94;
		letter-spacing: -0.06em;
	}

	h1 span {
		color: var(--color-accent);
	}

	.intro {
		max-width: 38rem;
		margin-top: 2rem;
		font-size: 1.25rem;
		line-height: 1.6;
	}

	.profile-grid {
		display: grid;
		grid-template-columns: minmax(280px, 0.8fr) minmax(0, 1.2fr);
		gap: clamp(2rem, 8vw, 8rem);
		align-items: center;
	}

	.portrait-wrap {
		position: relative;
		max-width: 420px;
	}

	.portrait {
		width: 100%;
		border: 1px solid
			color-mix(in oklab, var(--color-primary) 45%, transparent);
		filter: saturate(0.85);
	}

	.profile-stamp {
		position: absolute;
		right: -1.5rem;
		bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 1rem;
		background: var(--color-accent);
		color: var(--color-accent-foreground);
		font-size: 0.72rem;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.profile-stamp strong {
		font: 2rem var(--font-science-gothic);
	}

	.bio {
		display: grid;
		gap: 1.5rem;
		max-width: 600px;
		font-size: 1.05rem;
		line-height: 1.8;
	}

	.bio .lead {
		font-size: 1.35rem;
		line-height: 1.5;
	}

	.bio :global(a) {
		justify-self: start;
	}

	.principles {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		margin-block: 7rem;
		border-block: 1px solid
			color-mix(in oklab, var(--color-primary) 35%, transparent);
	}

	.principle {
		display: grid;
		gap: 0.5rem;
		padding: 1.5rem 1rem;
		border-right: 1px solid
			color-mix(in oklab, var(--color-primary) 35%, transparent);
	}

	.principle:last-child {
		border-right: 0;
	}

	.principle span {
		color: var(--color-muted-foreground);
		font: 0.7rem var(--font-science-gothic);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.principle strong {
		font-size: 0.95rem;
		font-weight: 500;
	}

	.skills-section {
		border-top: 1px solid
			color-mix(in oklab, var(--color-primary) 35%, transparent);
		padding-top: 4rem;
	}

	.section-heading {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.section-heading h2 {
		margin-top: 0.5rem;
	}

	.section-heading > p {
		max-width: 24rem;
		color: var(--color-muted-foreground);
		line-height: 1.5;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.skill-card {
		border-radius: 0;
		background: color-mix(in oklab, var(--color-card) 80%, transparent);
	}

	.skill-row {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding-block: 0.55rem;
		border-top: 1px solid
			color-mix(in oklab, var(--color-border) 45%, transparent);
	}

	.skill-row small {
		margin-left: auto;
		color: var(--color-muted-foreground);
		font-size: 0.65rem;
	}

	.skill-dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		background: var(--color-accent);
	}

	@media (max-width: 800px) {
		.profile-grid,
		.skills-grid {
			grid-template-columns: 1fr;
		}

		.portrait-wrap {
			margin-inline: auto;
		}

		.principles {
			grid-template-columns: 1fr;
		}

		.principle {
			border-right: 0;
			border-bottom: 1px solid
				color-mix(in oklab, var(--color-primary) 35%, transparent);
		}

		.principle:last-child {
			border-bottom: 0;
		}

		.section-heading {
			display: block;
		}

		.section-heading > p {
			margin-top: 1rem;
		}
	}
</style>
