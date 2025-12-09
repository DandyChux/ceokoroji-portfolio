import { z } from 'zod';

export const skillCategories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Language', 'Tool', 'Framework', 'Other'] as const;
export const skillCategoryEnum = z.enum(skillCategories);

export const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;
export const skillLevelEnum = z.enum(skillLevels);

export const skillSchema = z.object({
	id: z.int32().min(1),
	name: z.string().min(2).max(100),
	description: z.string().min(10).max(500).nullable(),
	category: skillCategoryEnum,
	level: skillLevelEnum,
	icon_url: z.url().nullable(),
});

export const skillCategoryGroupSchema = z.object({
	name: z.string(),
	skills: z.array(skillSchema),
})

export const groupedSkillsResponseSchema = z.object({
	categories: z.array(skillCategoryGroupSchema),
})

export const projectSchema = z.object({
	id: z.int32().min(1),
	name: z.string().min(2).max(100),
	description: z.string().min(10).max(500).nullable(),
	image_url: z.url(),
	github_url: z.url().min(10).max(500),
	live_url: z.url().nullable(),
	created_at: z.date(),
	updated_at: z.date(),
	featured: z.boolean(),
	order: z.int32().min(1),
});


// Schema Definitions
export const createSkillSchema = skillSchema.omit({ id: true });
export const updateSkillSchema = skillSchema.omit({ id: true });
export const createProjectSchema = projectSchema.omit({ id: true, created_at: true, updated_at: true, order: true }).extend({ skill_ids: z.array(z.number().int().min(1)) });
export const updateProjectSchema = projectSchema.omit({ id: true, created_at: true, updated_at: true });
export const projectResponseSchema = projectSchema.extend({ skills: z.array(skillSchema) });

// Type Definitions
export type Skill = z.infer<typeof skillSchema>;
export type SkillCategory = z.infer<typeof skillCategoryEnum>;
export type SkillLevel = z.infer<typeof skillLevelEnum>;
export type CreateSkill = z.infer<typeof createSkillSchema>;
export type UpdateSkill = z.infer<typeof updateSkillSchema>;
export type SkillCategoryGroup = z.infer<typeof skillCategoryGroupSchema>;
export type GroupedSkillsResponse = z.infer<typeof groupedSkillsResponseSchema>;
export type Project = z.infer<typeof projectSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;
