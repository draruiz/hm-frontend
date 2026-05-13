import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlogArticle,
  deleteBlogArticle,
  fetchBlogArticleById,
  fetchBlogArticles,
  updateBlogArticle,
} from "../api/articles";
import type { ArticleFormData } from "../model/article";

export const BLOG_ARTICLES_QUERY_KEY = ["admin-blog-articles"];

export function useBlogArticles() {
  return useQuery({
    queryKey: BLOG_ARTICLES_QUERY_KEY,
    queryFn: fetchBlogArticles,
    staleTime: 1000 * 60 * 2,
  });
}

export function useBlogArticleDetail(id?: string) {
  return useQuery({
    queryKey: ["admin-blog-article-detail", id],
    queryFn: () => (id ? fetchBlogArticleById(id) : Promise.reject()),
    enabled: !!id,
  });
}

export function useCreateBlogArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArticleFormData) => createBlogArticle(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BLOG_ARTICLES_QUERY_KEY,
      });
    },
  });
}

export function useUpdateBlogArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ArticleFormData }) =>
      updateBlogArticle(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BLOG_ARTICLES_QUERY_KEY,
      });
    },
  });
}

export function useDeleteBlogArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlogArticle(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BLOG_ARTICLES_QUERY_KEY,
      });
    },
  });
}
