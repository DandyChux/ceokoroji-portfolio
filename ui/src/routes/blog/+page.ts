import type { PageLoad } from "./$types";
import type { Post } from "$routes/blog/schema";
import { createQuery } from "@tanstack/svelte-query";
import { error } from "@sveltejs/kit";
import apiClient from "$lib/api";

// Minimal load function - just pass config/initial data if needed
export const load: PageLoad = async ({ url }) => {
	const posts = await apiClient.get<Post[]>("/posts");
	return { posts };
};
