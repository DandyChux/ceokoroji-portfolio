import apiClient from "$lib/api";
import type { Project } from "$routes/projects/schema";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const projects = await apiClient.get<Project[]>("/projects");
	return { projects };
};
