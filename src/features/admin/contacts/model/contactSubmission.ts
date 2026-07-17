import { z } from "zod";

/**
 * Shape of what the API returns for an already-stored submission.
 *
 * Deliberately free of length limits: those are input rules and belong to the
 * public contact form. Here the server is the source of truth for what it
 * accepted, so a cap can only reject a record we are supposed to display.
 */
export const contactSubmissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim(),
  email: z.string().trim(),
  phone: z.string().trim().nullable(),
  preferredDate: z.string().trim().nullable(),
  time: z.string().trim().nullable(),
  comment: z.string().trim().nullable(),
  hipaaConsent: z.boolean(),
  consentedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const contactSubmissionsListSchema = z.array(contactSubmissionSchema);
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
