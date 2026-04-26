import type { PageLoad } from './$types';
import { createPostSchema } from '$routes/blog/schema';
import { superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'
import { fail } from '@sveltejs/kit';

export const load: PageLoad = async () => {
	return {
		form: await superValidate(zod4(createPostSchema))
	}
};
