import { apiClient } from "../../../../shared/lib/axios";
import { sanitizeInput } from "../../../../shared/lib/sanitize";
import {
  articleSchema,
  articlesListSchema,
  type Article,
  type ArticleFormData,
  type ArticleStatus,
} from "../model/article";

interface ArticlePayload {
  title: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  status: ArticleStatus;
}

function sanitizeOptionalText(value?: string): string | null {
  const sanitized = sanitizeInput(value ?? "");
  return sanitized.length > 0 ? sanitized : null;
}

function toArticlePayload(data: ArticleFormData): ArticlePayload {
  return {
    title: sanitizeInput(data.title),
    excerpt: sanitizeOptionalText(data.excerpt),
    content: sanitizeInput(data.content),
    coverImageUrl: sanitizeOptionalText(data.coverImageUrl),
    status: data.status,
  };
}

export async function fetchBlogArticles(): Promise<Article[]> {
  const response = await apiClient.get("/blog/admin/articles");
  return articlesListSchema.parse(response.data);
}

export async function fetchBlogArticleById(id: string): Promise<Article> {
  const response = await apiClient.get(`/blog/admin/articles/${id}`);
  return articleSchema.parse(response.data);
}

export async function createBlogArticle(
  data: ArticleFormData,
): Promise<Article> {
  const payload = toArticlePayload(data);
  const response = await apiClient.post("/blog/admin/articles", payload);
  return articleSchema.parse(response.data);
}

export async function updateBlogArticle(
  id: string,
  data: ArticleFormData,
): Promise<Article> {
  const payload = toArticlePayload(data);
  const response = await apiClient.patch(`/blog/admin/articles/${id}`, payload);
  return articleSchema.parse(response.data);
}

export async function deleteBlogArticle(id: string): Promise<void> {
  await apiClient.delete(`/blog/admin/articles/${id}`);
}
