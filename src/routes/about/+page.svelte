<script lang="ts">
	import ResumeButton from "$components/resume-button.svelte";
	import Badge from "$components/ui/badge/badge.svelte";
	import * as Tabs from "$components/ui/tabs/index";
	import Image from "$components/ui/image.svelte";

	const skills = [
		{
			label: "Languages",
			value: "languages",
			list: [
				"JavaScript",
				"TypeScript",
				"Python",
				"Rust",
				"Go",
				"C#",
				"SQL",
			],
		},
		{
			label: "Frontend",
			value: "frontend",
			list: [
				"HTML",
				"CSS/SCSS",
				"React",
				"Next.js",
				"Solid.js",
				"Angular",
				"Astro",
				"Yew",
			],
		},
		{
			label: "Backend",
			value: "backend",
			list: [
				"Node.js",
				"Django",
				"Flask",
				"Sanic",
				"Axum",
				"Actix",
				"Fiber",
				".NET",
				"PostgreSQL",
				"Redis",
				"SQLite",
				"MySQL",
				"MongoDB",
			],
		},
		{
			label: "Tools",
			value: "tools",
			list: [
				"Docker",
				"AWS",
				"Azure",
				"Linux",
				"Git",
				"Jira",
				"Figma",
				"Wireshark",
				"Wordpress",
			],
		},
	] as const;
</script>

<div class="flex h-full flex-col">
	<h1 class="mb-2 self-start text-2xl font-medium xl:text-3xl">About Me</h1>
	<h3 class="mb-8 self-start text-xl font-normal capitalize xl:text-2xl">
		Your friendly neighborhood developer
	</h3>

	<div class="mb-4 flex flex-col items-center xl:flex-row xl:flex-wrap">
		<div
			class="relative aspect-square mb-4 lg:order-2 xl:flex-[1_1_30%] rounded-sm border border-border"
		>
			<Image
				src={"https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/ceokoroji_headshot.png"}
				alt="My headshot"
				priority
				fill
				class="absolute object-cover w-full h-full"
			/>
		</div>

		<article
			class="py-4 indent-12 xl:h-auto xl:flex-[1_1_70%] 2xl:order-1 2xl:px-20"
		>
			<p class="font-base my-4 text-base lg:text-lg 2xl:text-xl">
				I recently graduated from the University of South Florida with a
				B.S. in Information Science. I am currently working as a
				Financial Systems Developer at Jabil, where I support the
				financial systems used by the company&apos;s global finance
				team. I am also a freelance web developer, where I work with
				clients to build websites and web applications. I am passionate
				about using technology to solve problems and make a positive
				impact on the lives of others.
			</p>

			<p class="font-base my-4 text-base lg:text-lg 2xl:text-xl">
				Inspiration for my career path came from my natural curiosity
				and desire to learn. I was always interested in how technology
				worked and how I could use it to solve problems. I fell in love
				with the idea of being able to create something from nothing.
			</p>

			<p class="font-base my-4 text-base lg:text-lg 2xl:text-xl">
				Blending a vibrant personality and an unwavering work ethic, I
				craft efficient digital solutions. As a full-stack developer, I
				strive each day to deliver cutting-edge, user-friendly
				applications that enhance the experiences of users and empower
				businesses to achieve their goals. I&apos;m driven to work on
				projects that aim to make a real impact on the lives of their
				users.
			</p>
		</article>
	</div>

	<div class="flex w-full pt-10">
		<ResumeButton />
	</div>

	<div class="flex flex-col items-center pt-10">
		<h2 class="mb-5 text-xl font-bold">My Skills</h2>
		<Tabs.Root value={skills[0]?.value} class="w-full lg:px-12 2xl:px-32">
			<Tabs.List class="inline-flex w-full">
				{#each skills as skill, index (index)}
					<Tabs.Trigger value={skill.value} class="flex-1">
						{skill.label}
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
			{#each skills as category, index (index)}
				<Tabs.Content value={category.value}>
					<div
						class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
					>
						{#each category.list as skill, index (index)}
							<Badge
								variant="secondary"
								class="justify-center py-2 rounded-md w-full"
							>
								{skill}
							</Badge>
						{/each}
					</div>
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	</div>
</div>
