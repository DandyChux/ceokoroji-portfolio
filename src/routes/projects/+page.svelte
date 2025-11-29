<script lang="ts">
	import ProjectCard from "$components/project-card.svelte";
	import * as Card from "$components/ui/card";
	import { Separator } from "$components/ui/separator";
	import type { Project } from "./schema";
	import { AppWindow, Server, SquareStack } from "@lucide/svelte";
	import { useSidebar } from "$components/ui/sidebar";
	import { cn } from "$lib/utils";

	const sidebarState = $derived(useSidebar());

	const portfolioProjects: Project[] = [
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
				"TypeScript",
				"AWS S3",
				"PostgreSQL",
				"CSS",
			],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/logos/blackstack.svg",
		},
		{
			name: "Silvi",
			description:
				"Silvi is an open-source web-app with the purpose of enabling tree stewards to easily track and report on their reforestation projects as well as sharing that progress with a broader community.",
			documentation: "https://github.com/SilviProtocol/silvi-open",
			deployment: "https://www.silvi.earth/about-us",
			skills: ["Next.js", "TypeScript", "Django", "Python", "CSS/SCSS"],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/logos/silvi.svg",
		},
		{
			name: "Sporta Go",
			description:
				"Sporta Go is a platform built for athletes to connect with trainers and coaches. They are a client of BlackStack Software Solutions. MVP currently in development.",
			documentation: "https://github.com/SportaGo/sporta-go-web",
			deployment: "https://thesportago.com",
			skills: ["Next.js", "Typescript", "PostgreSQL", "AWS S3", "CSS"],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/logos/sporta-go.svg",
		},
		{
			name: "Portfolio",
			description:
				"This website! It has gone through a few iterations but I am happy with the current design. Built with Next.js + TailwindCSS. I wanted to build a website that showcased my skills and projects in a clean and organized way.",
			documentation: "https://github.com/DandyChux/ceokoroji-portfolio",
			skills: ["Next.js", "TypeScript", "PostgreSQL", "CSS"],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/logos/ceokoroji-logo.png",
		},
		{
			name: "Rusty Melody",
			description:
				"A web app that leverages machine learning and neural networks to generate music recommendations based on user input. It is a WASM application built with Rust + Yew on the frontend and Axum + PostgreSQL on the backend. I built this project to experiment with machine learning in Rust and to learn more about neural networks.",
			documentation: "https://github.com/DandyChux/rusty_melody",
			deployment:
				"https://rusty-melody-client-blackstack-software-solutions.koyeb.app/",
			skills: [
				"Rust",
				"Yew",
				"Axum",
				"PostgreSQL",
				"WASM",
				"Docker",
				"CSS",
			],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/rust-icon.svg",
		},
		{
			name: "Feedback App",
			description:
				"A simple feedback app built with Yew + Rust on the frontend and Actix + PostgreSQL on the backend. I built this project to deepen my understanding of Rust and to learn more about its web development capabilities. I also wanted to experiment with WASM in a production environment.",
			documentation:
				"https://github.com/DandyChux/rust-fullstack-feedback",
			deployment: "https://rust-feedback-app.onrender.com",
			skills: [
				"Rust",
				"Yew",
				"Actix",
				"PostgreSQL",
				"WASM",
				"Docker",
				"CSS",
			],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/rust-icon.svg",
		},
		{
			name: "CLI Calculator",
			description:
				"A simple calculator built with Rust. This was my first Rust project and I wanted to build something that would allow me to learn the basics of the language. I also wanted to experiment with building a CLI app.",
			documentation: "https://github.com/DandyChux/cli_calculator",
			// deployment: ''
			skills: ["Rust"],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/rust-icon.svg",
		},
		{
			name: "Number Guessing Game",
			description:
				"A simple number guessing game built with Rust. I wanted to build a project with Rust where I could experiment with some of the language's features.",
			documentation: "https://github.com/DandyChux/guessing_game",
			// deployment: '',
			skills: ["Rust"],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/rust-icon.svg",
		},
		{
			name: "Fancy Carpet Calculator",
			description:
				"An early favorite of mine when I was initially learning DOM manipulation in JavaScript. This project is a simple calculator that calculates the area of the carpet based on user input.",
			documentation:
				"https://github.com/DandyChux/Fancy-carpet-calculator",
			deployment: "https://fancy-carpet-calculator.netlify.app/",
			skills: ["HTML", "CSS", "JS"],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/javascript.svg",
		},
		{
			name: "Madlib Madness",
			description:
				"An HTML form using user input to generate a funny story!",
			documentation: "https://github.com/DandyChux/Mad-Lib-Madness",
			deployment: "https://mad-lib-madness.netlify.app/",
			skills: ["HTML", "CSS", "JS"],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/javascript.svg",
		},
		{
			name: "Magic 8 Ball",
			description:
				"A simple Magic 8 Ball app. The user asks a question and the app generates a random answer. At the time it was a huge step in my learning journey with JavaScript and the DOM.",
			documentation: "https://github.com/DandyChux/Magic-8-Ball",
			deployment: "https://dandychux-magic8ball.netlify.app/",
			skills: ["HTML", "CSS", "JS"],
			image: "https://ceokoroji-portfolio.nyc3.cdn.digitaloceanspaces.com/graphics/javascript.svg",
		},
	];
</script>

<svelte:head>
	<title>Projects | Chukwuma Okoroji</title>
</svelte:head>

<h1 class="text-4xl lg:text-6xl mb-8 font-semibold text-center">Projects</h1>

<span class="text-lg w-full text-center leading-normal font-medium mt-4">
	Specializations
</span>
<div
	class="grid grid-cols-auto md:inline-flex items-center justify-center w-full 2xl:w-1/2 mx-auto py-4 gap-4"
>
	<Card.Root class="flex-1 rounded-none py-4">
		<Card.Header class="px-0">
			<Separator class="!w-2/5" />
		</Card.Header>
		<Card.Content class="flex flex-col items-center gap-2">
			<AppWindow class="size-12" />
			<Card.Title>Web Development</Card.Title>
		</Card.Content>
	</Card.Root>

	<Card.Root class="flex-1 rounded-none py-4">
		<Card.Header class="px-0">
			<Separator class="!w-2/5" />
		</Card.Header>
		<Card.Content class="flex flex-col items-center gap-2">
			<Server class="size-12" />
			<Card.Title>API Development</Card.Title>
		</Card.Content>
	</Card.Root>

	<Card.Root class="flex-1 rounded-none py-4">
		<Card.Header class="px-0">
			<Separator class="!w-2/5" />
		</Card.Header>
		<Card.Content class="flex flex-col items-center gap-2">
			<SquareStack class="size-12" />
			<Card.Title>Mobile Development</Card.Title>
		</Card.Content>
	</Card.Root>
</div>

<div class="grid gap-3 pt-3 mt-3 md:grid-cols-2 2xl:grid-cols-3">
	{#each portfolioProjects as project, index (index)}
		<ProjectCard {...project} />
	{/each}
</div>

<!-- Circle vectors -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<div
	class={cn(
		"fixed left-0 -translate-x-14 2xl:translate-x-[calc(var(--sidebar-width)-50px)] bottom-24 w-24 h-24 bg-transparent rounded-full border-2 border-accent/80 duration-300 ease-in-out",
		{
			"2xl:translate-x-0": !sidebarState.open,
		},
	)}
/>
<!-- svelte-ignore element_invalid_self_closing_tag -->
<div
	class="fixed right-0 translate-x-14 2xl:translate-x-12 top-24 2xl:top-52 w-24 h-24 bg-transparent rounded-full border-2 border-accent/80"
/>
