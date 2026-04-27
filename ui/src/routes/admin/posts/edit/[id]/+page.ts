import type { PageLoad } from "./$types";
import type { Post } from "$routes/blog/schema";
import { updatePostSchema } from "$routes/blog/schema";
import { error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import apiClient from "$lib/api";

export const load: PageLoad = async ({ params, fetch }) => {
	const post = await apiClient.get<Post>(`/posts/${params.id}`);

	const form = await superValidate(post, zod4(updatePostSchema), {
		defaults: {
			title: post.title,
			content: post.content,
			description: post.description,
			category: post.category,
			date: post.date,
			published: post.published,
			slug: post.slug,
			tags: post.tags,
		},
	});

	return { post, form };
};
