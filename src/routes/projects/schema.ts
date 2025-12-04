import { z } from 'zod';

export const skillCategoryEnum = z.enum(['Frontend', 'Backend', 'Database', 'DevOps', 'Language', 'Tool', 'Framework', 'Other']);

export const skillLevelEnum = z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']);

export const skillSchema = z.object({
	id: z.string(),
	name: z.string().min(2).max(100),
	description: z.string().min(10).max(500),
	category: skillCategoryEnum,
	level: skillLevelEnum,
	order: z.number().min(1),
	color: z.string().optional(),
	icon_url: z.url().optional(),
	icon_color: z.string().optional(),
});

export const projectSchema = z.object({
	id: z.string(),
	name: z.string().min(2).max(100),
	description: z.string().min(10).max(500),
	image_url: z.url(),
	github_url: z.url().min(10).max(500),
	live_url: z.url().optional(),
	skills: z.array(skillSchema),
	created_at: z.date(),
	updated_at: z.date(),
});


// Schema Definitions
export const createSkillSchema = skillSchema.omit({ id: true });
export const updateSkillSchema = skillSchema.omit({ id: true });
export const createProjectSchema = projectSchema.omit({ id: true, created_at: true, updated_at: true });
export const updateProjectSchema = projectSchema.omit({ id: true, created_at: true, updated_at: true });

// Type Definitions
export type Skill = z.infer<typeof skillSchema>;
export type SkillCategory = z.infer<typeof skillCategoryEnum>;
export type SkillLevel = z.infer<typeof skillLevelEnum>;
export type CreateSkill = z.infer<typeof createSkillSchema>;
export type UpdateSkill = z.infer<typeof updateSkillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
