<script lang="ts">
	import Router from "svelte-spa-router";
	import Nav from "./components/Navbar.svelte";
	import Home from "./pages/Home.svelte";
	import About from "./pages/About.svelte";
	import Projects from "./pages/Projects.svelte";
	import Blog from "./pages/Blog.svelte";
	import Contact from "./pages/Contact.svelte";
	import "./app.css";

	const routes = {
		"/": Home,
		"/about": About,
		"/projects": Projects,
		"/blog": Blog,
		"/contact": Contact,
	};
</script>

<div class="min-h-screen flex flex-col">
	<Nav />
	<main class="flex-1">
		<Router {routes} />
	</main>
</div>
