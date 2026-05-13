import { z } from "zod";
import { sanitizeInput } from "../../../../shared/lib/sanitize";

export const articleStatusSchema = z.enum(["draft", "published"]);

export const articleSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().max(255),
  slug: z.string().trim().min(1),
  excerpt: z.string().trim().max(500).nullable(),
  content: z.string().trim().min(1),
  coverImageUrl: z.string().trim().max(500).url().nullable(),
  status: articleStatusSchema,
  publishedAt: z.string().datetime().nullable(),
  createdBy: z.string().uuid(),
  updatedBy: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export const articlesListSchema = z.array(articleSchema);

export const articleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must be 255 characters or less")
    .refine((value) => sanitizeInput(value).length > 0, {
      message: "Title contains invalid characters",
    }),
  excerpt: z
    .string()
    .trim()
    .max(500, "Excerpt must be 500 characters or less")
    .optional()
    .or(z.literal("")),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .refine((value) => sanitizeInput(value).length > 0, {
      message: "Content contains invalid characters",
    }),
  coverImageUrl: z
    .string()
    .trim()
    .max(500, "Cover image URL must be 500 characters or less")
    .url("Cover image URL must be a valid URL")
    .optional()
    .or(z.literal("")),
  status: articleStatusSchema,
});

export type Article = z.infer<typeof articleSchema>;
export type ArticleStatus = z.infer<typeof articleStatusSchema>;
export type ArticleFormData = z.infer<typeof articleFormSchema>;
