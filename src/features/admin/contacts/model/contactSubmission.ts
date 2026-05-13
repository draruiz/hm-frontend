import { z } from "zod";

export const contactSubmissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().max(100),
  email: z.string().email().max(100),
  phone: z.string().trim().max(30).nullable(),
  preferredDate: z.string().trim().max(30).nullable(),
  time: z.string().trim().max(30).nullable(),
  comment: z.string().trim().max(1000).nullable(),
  hipaaConsent: z.boolean(),
  consentedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const contactSubmissionsListSchema = z.array(contactSubmissionSchema);

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
