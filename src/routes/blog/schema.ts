import { z } from 'zod';

export const postSchema = z.object({
	id: z.string(),
	title: z.string().min(2).max(100),
	date: z.date().max(new Date()),
	description: z.string().min(2).max(100),
	published: z.boolean().default(false),
	slug: z.string().min(2).max(100),
	category: z.string().min(2).max(100),
	content: z.string().min(2).max(10000),
	tags: z.array(z.string().min(2).max(100)).default([])
})

export const postCategoriesEnum = z.enum(['Technology', 'Design', 'Business', 'Health', 'Travel', 'Food', 'Fashion', 'Sports', 'Entertainment', 'Education', 'Culture', 'Art', 'Music', 'Science']);

export const postTagsEnum = z.enum([
	// Technology
	'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Deno', 'Bun',
	'CSS', 'HTML', 'Sass', 'Tailwind', 'Bootstrap',
	'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby',
	'AI', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision',
	'Web Development', 'Mobile', 'iOS', 'Android', 'React Native', 'Flutter',
	'Backend', 'Frontend', 'Full Stack', 'API', 'REST', 'GraphQL',
	'DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
	'Cloud', 'Serverless', 'Microservices',
	'Database', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'Redis',
	'Security', 'Cybersecurity', 'Authentication', 'Encryption',
	'Testing', 'Unit Testing', 'E2E Testing', 'TDD',
	'Performance', 'Optimization', 'SEO',

	// Design
	'UX', 'UI', 'UI/UX', 'Graphic Design', 'Web Design', 'Product Design',
	'Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'Wireframing',
	'Typography', 'Color Theory', 'Branding', 'Logo Design',

	// Business
	'Entrepreneurship', 'Startup', 'Marketing', 'Digital Marketing', 'SEO Marketing',
	'Sales', 'Strategy', 'Leadership', 'Management', 'Productivity',
	'Finance', 'Investment', 'E-commerce', 'SaaS', 'B2B', 'B2C',

	// Health
	'Fitness', 'Nutrition', 'Wellness', 'Mental Health', 'Yoga', 'Meditation',
	'Diet', 'Exercise', 'Weight Loss', 'Healthy Living',

	// Travel
	'Adventure', 'Backpacking', 'Solo Travel', 'Travel Tips', 'Destinations',
	'Budget Travel', 'Luxury Travel', 'Travel Photography',

	// Food
	'Recipes', 'Cooking', 'Baking', 'Vegan', 'Vegetarian', 'Healthy Eating',
	'Restaurant Reviews', 'Food Photography', 'Meal Prep',

	// Fashion
	'Style', 'Trends', 'Streetwear', 'Sustainable Fashion', 'Accessories',
	'Beauty', 'Makeup', 'Skincare',

	// Sports
	'Football', 'Basketball', 'Soccer', 'Tennis', 'Running', 'Cycling',
	'Training', 'Athletes', 'Sports News',

	// Entertainment
	'Movies', 'TV Shows', 'Music', 'Gaming', 'Video Games', 'Streaming',
	'Pop Culture', 'Reviews', 'Celebrities',

	// Education
	'Learning', 'Online Courses', 'Tutorials', 'Study Tips', 'Career Development',
	'Teaching', 'E-learning', 'Skills',

	// Culture
	'Society', 'Diversity', 'History', 'Philosophy', 'Lifestyle',
	'Books', 'Literature', 'Writing',

	// Art
	'Painting', 'Drawing', 'Illustration', 'Digital Art', 'Photography',
	'Sculpture', 'Contemporary Art', 'Art History',

	// Music
	'Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Electronic',
	'Music Production', 'Instruments', 'Concerts',

	// Science
	'Physics', 'Chemistry', 'Biology', 'Astronomy', 'Research',
	'Innovation', 'Technology News', 'Space', 'Environment', 'Climate Change'
]);

export const postCategories = postCategoriesEnum.options;

export const postTags = postTagsEnum.options;

export const createPostSchema = postSchema.omit({ id: true }).refine((data) => {
	return postCategoriesEnum.safeParse(data.category).success;
}, { message: 'Invalid category' });
export const updatePostSchema = postSchema.omit({ id: true }).partial();

// Types
export type Post = z.infer<typeof postSchema>;
export type CreatePost = z.infer<typeof createPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type PostTag = z.infer<typeof postTagsEnum>;
export type PostCategory = z.infer<typeof postCategoriesEnum>;
