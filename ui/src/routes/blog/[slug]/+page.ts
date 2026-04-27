import type { PageLoad } from "./$types";
import type { Post } from "$routes/blog/schema";
import { error } from "@sveltejs/kit";
import apiClient from "$lib/api";

export const load: PageLoad = async ({ params }) => {
	const post = await apiClient.get<Post>(`/posts/${params.slug}`);

	return { post };
};
