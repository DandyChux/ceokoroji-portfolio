import type { PageLoad } from './$types';
import type { Post } from '$routes/blog/schema';
import { createQuery } from '@tanstack/svelte-query';
import { error } from '@sveltejs/kit';

// Minimal load function - just pass config/initial data if needed
export const load: PageLoad = async () => {
	return {
		apiUrl: import.meta.env.VITE_API_URL
	};
};
