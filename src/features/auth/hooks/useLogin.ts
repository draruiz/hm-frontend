import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAppStore } from "../../../shared/lib";
import { loginRequest } from "../api/login";
import { loginSchema, type LoginFormData } from "../model/schemas";

export function useLogin() {
  const navigate = useNavigate();
  const setToken = useAppStore((s) => s.setToken);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setServerError(null);
    try {
      const { accessToken } = await loginRequest(data);
      setToken(accessToken);
      navigate("/admin/dashboard", { replace: true });
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Invalid credentials. Please try again.";
      setServerError(message);
    }
  });

  return {
    form,
    onSubmit,
    serverError,
    isSubmitting: form.formState.isSubmitting,
  };
}
