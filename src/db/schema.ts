import {
  boolean, integer, pgEnum, pgTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from "zod";

export const categories = pgEnum("categories", [
  "General",
  "Tech",
  "Life",
  "Sports",
  "Music",
  "Games",
  "Movies",
  "Books",
  "Food",
  "Travel",
]);

export const posts = pgTable("posts", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  description: text("description").notNull(),
  published: boolean("published").default(false).notNull(),
  tags: text("tags").array(),
  category: categories("category").default("General").notNull(),
  content: text("content").notNull(),
  slug: text("slug").unique().notNull(),
});

export const insertPostSchema = createInsertSchema(posts)
export const selectPostSchema = createSelectSchema(posts)
export type NewPost = z.infer<typeof insertPostSchema>
export type Post = z.infer<typeof selectPostSchema>