import type { PageLoad } from './$types';
import type { Post } from '$routes/blog/schema';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
	const API_URL = import.meta.env.VITE_API_URL;

	if (!API_URL) {
		error(500, 'API URL is not configured');
	}

	try {
		const response = await fetch(`${API_URL}/posts/${params.slug}`);

		if (response.status === 404) {
			error(404, 'Post not found');
		}

		if (!response.ok) {
			error(500, 'Failed to load post');
		}

		const post: Post = await response.json();
		return { post };
	} catch (err) {
		console.error('Error loading post:', err);
		error(500, 'Failed to load post');
	}
};
