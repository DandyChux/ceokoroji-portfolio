import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { authStore } from '$lib/stores/auth.svelte';

export const load: LayoutLoad = async ({ url }) => {
	// Skip auth check for login page
	if (url.pathname === '/admin/login') {
		return {
			apiUrl: import.meta.env.VITE_API_URL
		};
	}

	// Check authentication
	await authStore.checkAuth();

	// Redirect to login if not authenticated
	if (!authStore.isAuthenticated) {
		throw redirect(302, `/admin/login?redirect=${encodeURIComponent(url.pathname)}`);
	}

	return {
		apiUrl: import.meta.env.VITE_API_URL
	};
};
