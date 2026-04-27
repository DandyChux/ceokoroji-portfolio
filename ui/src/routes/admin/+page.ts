import type { PageLoad } from "./$types";
import apiClient from "$lib/api";
import type { Post } from "$routes/blog/schema";
import type { Project, Skill } from "$routes/projects/schema";

export const load: PageLoad = async () => {
	const [posts, projects, featuredProjects, skills] = await Promise.all([
		apiClient.get<Post[]>("/posts/admin"),
		apiClient.get<Project[]>("/projects"),
		apiClient.get<Project[]>("/projects?featured=true"),
		apiClient.get<Skill[]>("/projects/skills"),
	]);

	// Derive the statistics
	const published = posts?.filter((p) => p.published).length || 0;
	const drafts = posts?.filter((p) => !p.published).length || 0;
	const recent = [...(posts || [])]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);

	const stats = {
		total: posts?.length || 0,
		published,
		drafts,
		recent,
		projects: projects?.length || 0,
		featuredProjects: featuredProjects?.length || 0,
		skills: skills?.length || 0,
	};

	return {
		stats,
	};
};
