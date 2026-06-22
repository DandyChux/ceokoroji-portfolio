<script lang="ts">
	import ResumeButton from "$components/resume-button.svelte";
	import * as Card from "$components/ui/card/index";
	import Progress from "$components/ui/progress/progress.svelte";
	import { createQuery } from "@tanstack/svelte-query";
	import apiClient from "$lib/api";
	import {
		type GroupedSkillsResponse,
		type Skill,
	} from "$routes/projects/schema";
	import Picture from "$components/picture.svelte";
	import { generateSrcSet } from "$lib/utils";
	import Network from "$lib/assets/network.svg";
	import Connection from "$lib/assets/connection.svg";

	const skillsQuery = createQuery(() => ({
		queryKey: ["skills"],
		queryFn: async () => {
			return await apiClient.get<GroupedSkillsResponse>(
				"/projects/skill-categories",
			);
		},
		select: (data) => data.categories,
	}));

	const getSkillLevel = (skill: Skill) => {
		switch (skill.level) {
			case "Beginner":
				return 25;
			case "Intermediate":
				return 50;
			case "Advanced":
				return 75;
			case "Expert":
				return 100;
			default:
				return 0;
		}
	};
</script>

<svelte:head>
	<title>About | Chukwuma Okoroji</title>
</svelte:head>

<div class="flex h-full flex-col">
	<h1 class="mb-2 self-start text-2xl font-medium xl:text-3xl">About Me</h1>
	<span
		class="mb-8 self-start text-xl text-primary font-science-gothic font-normal capitalize xl:text-2xl"
	>
		Your friendly neighborhood developer
	</span>

	<div class="mb-4 flex flex-col gap-12 items-center xl:flex-row xl:gap-8">
		<div class="xl:order-2 relative mb-4 w-full xl:w-2/5">
			<Picture
				src={"https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/images/ceokoroji_full-shot.webp"}
				alt="Full body image"
				class="h-auto rounded-lg border"
				srcset={generateSrcSet(
					"https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/images/ceokoroji_full-shot.webp",
					[250, 400],
					"webp",
					85,
				)}
				sizes="(max-width: 768px) 250px, 400px"
			/>
			<div
				class="absolute bottom-[-2.5rem] ml-12 flex p-2 bg-accent text-accent-foreground rounded-lg"
			>
				<div class="flex flex-1 items-center justify-center text-sm">
					<Picture
						src={Network}
						alt="Network"
						placeholder="blur"
						blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcGFyZW50Ij48L3JlY3Q+PHJlY3Qgd2lkdGg9IjYwJSIgaGVpZ2h0PSI2MCUiIHg9IjIwJSIgeT0iMjAlIiBmaWxsPSIjZWVlZWVlIiBvcGFjaXR5PSIwLjQiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC4yOzAuNTswLjIiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9yZWN0Pjwvc3ZnPg=="
					/>
					50+ Connections
				</div>
				<div class="flex flex-1 items-center justify-center text-sm">
					<Picture
						src={Connection}
						alt="Connections"
						placeholder="blur"
						blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcGFyZW50Ij48L3JlY3Q+PHJlY3Qgd2lkdGg9IjYwJSIgaGVpZ2h0PSI2MCUiIHg9IjIwJSIgeT0iMjAlIiBmaWxsPSIjZWVlZWVlIiBvcGFjaXR5PSIwLjQiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC4yOzAuNTswLjIiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9yZWN0Pjwvc3ZnPg=="
					/>
					4+ Years of Experience
				</div>
			</div>
		</div>

		<article
			class="py-4 indent-12 xl:h-auto 2xl:px-20 space-y-4 w-full xl:w-3/5"
		>
			<p class="font-base text-base lg:text-lg 2xl:text-xl">
				I am a Software Engineer with a background in enterprise
				systems. By day, I build swecure financial data pipelines at
				Jabil. By night, I explore how similar data architectures can be
				applied to healthcare.
			</p>

			<p class="font-base text-base lg:text-lg 2xl:text-xl">
				Currently, I am pursuing my Master's at USF, where my research
				focuses on clinical informatics and data integrity. Through my
				graduate research, I am actively developing tools for predictive
				clinical care and exploring how to build secure, FHIR-compatible
				applications.
			</p>

			<ResumeButton class="w-auto indent-0" />
		</article>
	</div>

	<div class="flex flex-col pt-10">
		<div class="mb-4">
			<h2 class="text-xl mb-2 font-bold">Skills &amp; Expertise</h2>
			<span
				class="inline-block text-base lg:text-lg font-science-gothic text-muted max-w-[750px]"
				>Here&apos;s a breakdown of the various technologies and tools I
				use to build efficient, user-friendly applications.
			</span>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each skillsQuery.data as category, index (index)}
				<Card.Root>
					<Card.Header>
						<Card.Title class="text-xl">{category.name}</Card.Title>
					</Card.Header>
					<Card.Content class="flex flex-col space-y-4">
						{#each category.skills as skill}
							<div
								class="inline-flex items-center justify-between"
							>
								{#if skill.icon_url}
									<img
										src={skill.icon_url}
										alt={skill.name}
										class="size-6 mr-2"
									/>
								{:else}
									<div
										class="size-6 mr-2 bg-foreground/40 rounded-full"
									></div>
								{/if}
								<span
									class="text-base lg:text-lg font-science-gothic"
								>
									{skill.name}
								</span>
								<!-- <span
									class="text-base lg:text-lg font-science-gothic text-muted ml-auto"
								>
									{skill.level}
								</span> -->
							</div>
							<!-- <Progress value={getSkillLevel(skill)} /> -->
						{/each}
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>
