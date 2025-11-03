import { z } from 'zod';

export const postSchema = z.object({
	id: z.string(),
	title: z.string().min(2).max(100),
	date: z.date().min(new Date()),
	description: z.string().min(2).max(100),
	published: z.boolean().default(false),
	slug: z.string().min(2).max(100),
	category: z.string().min(2).max(100),
})

export type Post = z.infer<typeof postSchema>;
