import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'
import { fail, error } from '@sveltejs/kit';
import { createProjectSchema, skillSchema } from '$routes/projects/schema';

export const load: PageLoad = async () => {
	const API_URL = import.meta.env.VITE_API_URL;

	const response = await fetch(`${API_URL}/projects/skills`, {
		credentials: 'include'
	});

	if (!response.ok) {
		error(response.status, 'Failed to fetch skills');
	}

	const data = await response.json();
	const skills = skillSchema.array().parse(data);

	return {
		form: await superValidate(zod4(createProjectSchema)),
		skills
	}
};
