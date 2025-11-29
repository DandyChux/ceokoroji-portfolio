import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		apiUrl: import.meta.env.VITE_API_URL
	};
};
