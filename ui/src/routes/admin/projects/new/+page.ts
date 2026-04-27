import type { PageLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { fail, error } from "@sveltejs/kit";
import {
	createProjectSchema,
	skillSchema,
	type Skill,
} from "$routes/projects/schema";
import apiClient from "$lib/api";

export const load: PageLoad = async ({ fetch }) => {
	const data = await apiClient.get<Skill[]>("/projects/skills");

	const skills = skillSchema.array().parse(data);

	return {
		form: await superValidate(zod4(createProjectSchema)),
		skills,
	};
};
