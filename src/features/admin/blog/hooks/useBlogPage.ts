import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import {
  articleFormSchema,
  type Article,
  type ArticleFormData,
} from "../model/article";
import {
  useBlogArticles,
  useCreateBlogArticle,
  useDeleteBlogArticle,
  useUpdateBlogArticle,
} from "./useBlogArticles";

type ServerErrorShape = {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
};

function getApiErrorMessage(error: unknown, fallback: string): string {
  const message = (error as ServerErrorShape)?.response?.data?.message;

  if (Array.isArray(message)) {
    return message.join(" ");
  }

  if (typeof message === "string" && message.trim().length > 0) {
    return message;
  }

  return fallback;
}

export function useBlogPage() {
  const { data, isLoading, isError, refetch } = useBlogArticles();
  const createMutation = useCreateBlogArticle();
  const updateMutation = useUpdateBlogArticle();
  const deleteMutation = useDeleteBlogArticle();

  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [localCoverPreview, setLocalCoverPreview] = useState<string | null>(
    null,
  );

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      coverImageUrl: "",
      status: "draft",
    },
  });

  const articles = useMemo(
    () =>
      [...(data ?? [])].sort(
        (left, right) =>
          new Date(right.updatedAt).getTime() -
          new Date(left.updatedAt).getTime(),
      ),
    [data],
  );

  const coverImageUrlFromForm = form.watch("coverImageUrl");
  const coverPreviewUrl =
    coverImageUrlFromForm?.trim() || localCoverPreview || undefined;

  function resetEditor() {
    setEditingArticleId(null);
    setLocalCoverPreview(null);
    form.reset({
      title: "",
      excerpt: "",
      content: "",
      coverImageUrl: "",
      status: "draft",
    });
  }

  function handleStartEdit(article: Article) {
    setServerError(null);
    setLocalCoverPreview(null);
    setEditingArticleId(article.id);
    form.reset({
      title: article.title,
      excerpt: article.excerpt ?? "",
      content: article.content,
      coverImageUrl: article.coverImageUrl ?? "",
      status: article.status,
    });
  }

  function handleCancelEdit() {
    setServerError(null);
    resetEditor();
  }

  function handleSelectCoverFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setServerError(null);

    if (!file.type.startsWith("image/")) {
      setServerError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setServerError("Image size must be 5 MB or less.");
      return;
    }

    const nextPreview = URL.createObjectURL(file);
    setLocalCoverPreview((previousPreview) => {
      if (previousPreview) {
        URL.revokeObjectURL(previousPreview);
      }
      return nextPreview;
    });
  }

  useEffect(() => {
    return () => {
      if (localCoverPreview) {
        URL.revokeObjectURL(localCoverPreview);
      }
    };
  }, [localCoverPreview]);

  const onSubmit = form.handleSubmit(async (formData) => {
    setServerError(null);

    try {
      if (editingArticleId) {
        await updateMutation.mutateAsync({
          id: editingArticleId,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }

      resetEditor();
    } catch (error: unknown) {
      setServerError(
        getApiErrorMessage(error, "Unable to save article. Please try again."),
      );
    }
  });

  async function handleDeleteArticle(article: Article) {
    const confirmed = window.confirm(
      `Delete article \"${article.title}\"? This action performs a soft delete.`,
    );

    if (!confirmed) {
      return;
    }

    setServerError(null);

    try {
      await deleteMutation.mutateAsync(article.id);

      if (editingArticleId === article.id) {
        resetEditor();
      }
    } catch (error: unknown) {
      setServerError(
        getApiErrorMessage(
          error,
          "Unable to delete article. Please try again.",
        ),
      );
    }
  }

  function disposeLocalCoverPreview() {
    setLocalCoverPreview((preview) => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      return null;
    });
  }

  return {
    articles,
    isLoading,
    isError,
    refetch,
    form,
    onSubmit,
    editingArticleId,
    handleStartEdit,
    handleCancelEdit,
    handleDeleteArticle,
    serverError,
    isSubmitting:
      form.formState.isSubmitting ||
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    coverPreviewUrl,
    handleSelectCoverFile,
    disposeLocalCoverPreview,
  };
}
