import { z } from 'zod';

export const projectSchema = z.object({
	image: z.url().optional(),
	name: z.string().min(2).max(100),
	description: z.string().min(10).max(500),
	documentation: z.url().min(10).max(500),
	deployment: z.url().optional(),
	skills: z.array(z.string().min(2).max(100)).optional()
});

export type Project = z.infer<typeof projectSchema>;
