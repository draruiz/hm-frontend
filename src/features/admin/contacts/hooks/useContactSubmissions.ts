import { useQuery } from "@tanstack/react-query";
import {
  fetchContactSubmissionDetail,
  fetchContactSubmissions,
} from "../api/submissions";

export function useContactSubmissions() {
  return useQuery({
    queryKey: ["admin-contact-submissions"],
    queryFn: fetchContactSubmissions,
    staleTime: 1000 * 60 * 2,
  });
}

export function useContactSubmissionDetail(id?: string) {
  return useQuery({
    queryKey: ["admin-contact-submission-detail", id],
    queryFn: () => (id ? fetchContactSubmissionDetail(id) : Promise.reject()),
    enabled: !!id,
  });
}
