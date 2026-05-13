import { apiClient } from "../../../shared/lib";
import { sanitizeInput } from "../../../shared/lib/sanitize";
import type { LoginFormData } from "../model/schemas";

interface LoginResponse {
  accessToken: string;
}

export async function loginRequest(
  data: LoginFormData,
): Promise<LoginResponse> {
  const payload = {
    email: sanitizeInput(data.email),
    password: data.password.trim(),
  };

  const response = await apiClient.post<LoginResponse>("/users/login", payload);
  return response.data;
}
