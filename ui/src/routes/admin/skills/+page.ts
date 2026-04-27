import apiClient from "$lib/api";
import type { Skill } from "$routes/projects/schema";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const skills = await apiClient.get<Skill[]>("/projects/skills");

	return {
		skills,
	};
};
