import z from "zod";

export const contactSchema = z.object({
	name: z.string().nonempty("Name is required"),
	email: z.email("Invalid email address"),
	subject: z.string().nonempty("Subject is required"),
	message: z.string().nonempty("Message is required"),
})
export type Contact = z.infer<typeof contactSchema>
