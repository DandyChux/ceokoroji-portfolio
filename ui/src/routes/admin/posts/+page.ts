import apiClient from "$lib/api";
import type { Post } from "$routes/blog/schema";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const posts = await apiClient.get<Post[]>("/posts/admin");

	return {
		posts,
	};
};
