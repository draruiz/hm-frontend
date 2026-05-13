import { apiClient } from "../../../../shared/lib/axios";
import type { ContactSubmission } from "../model/contactSubmission";
import {
  contactSubmissionSchema,
  contactSubmissionsListSchema,
} from "../model/contactSubmission";

export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  const res = await apiClient.get("/forms/contact/submissions");
  return contactSubmissionsListSchema.parse(res.data);
}

export async function fetchContactSubmissionDetail(
  id: string,
): Promise<ContactSubmission> {
  const res = await apiClient.get(`/forms/contact/submissions/${id}`);
  return contactSubmissionSchema.parse(res.data);
}
