# Copilot Instructions — HealthyMind Frontend

> **This project handles Protected Health Information (PHI). All generated code MUST comply with HIPAA technical safeguards and US accessibility standards.**

## Architecture: Feature-Sliced Design (FSD)

Organize code following FSD layers. Each new feature must live in its own folder with this structure:

```
src/
  features/
    <feature-name>/
      ui/          # Presentation components
      model/       # Types, stores (zustand), schemas (zod)
      api/         # Services and queries (react-query)
      hooks/       # Feature-specific custom hooks
      index.ts     # Barrel export (feature's public API)
  shared/
    ui/            # Global reusable components
    hooks/         # Shared hooks
    lib/           # Generic utilities
    config/        # Global configuration
```

- Features must not import directly from other features; use `shared/` for shared code.
- Only export what is necessary from each feature's `index.ts`.

## Forms: React Hook Form + Zod (HIPAA-Compliant)

- All forms must use `react-hook-form` with `@hookform/resolvers/zod`.
- Define the Zod schema in `model/` (or alongside the form if small) and derive the type with `z.infer<typeof schema>`.
- Use `useForm<FormType>({ resolver: zodResolver(schema) })`.
- Prefer `Controller` or `register` depending on the MUI component; avoid local state for form values.

### Input Sanitization & Validation (HIPAA / OWASP)

- **Always sanitize user inputs** before sending them to the API. Strip HTML tags and dangerous characters using a shared utility (e.g., `shared/lib/sanitize.ts`).
- Apply strict Zod schemas with:
  - `.trim()` on all string fields.
  - `.max()` length limits appropriate for each field.
  - `.regex()` patterns for structured data (SSN, phone, email, ZIP, dates).
  - Explicit `.refine()` or `.superRefine()` for cross-field and business-rule validation.
- **Never** display raw user input in the DOM without sanitization — prevent XSS.
- **Never** log, persist in local storage, or expose PHI (Protected Health Information) in the browser console, URL parameters, or client-side storage. Use only secure, encrypted transport (HTTPS) and server-managed sessions.
- Disable browser autocomplete on PHI fields (`autoComplete="off"`) unless there is a justified UX reason to keep it.
- Mark PHI-containing form fields with `aria-*` attributes for accessibility but **never** include PHI in `data-*` attributes or other DOM-queryable metadata.
- Use `inputMode` and `type` attributes correctly to restrict on-screen keyboards and input (e.g., `type="password"` for sensitive fields, `inputMode="numeric"` for numeric-only).

### Session & Data Handling

- Implement automatic session timeout handling on the frontend: warn the user before expiry and redirect to login on timeout.
- Never cache or store PHI in Redux, Zustand, or any client-side store beyond the session lifetime.
- On logout or session expiry, clear all in-memory state that may contain PHI.

## HIPAA & Accessibility Compliance

- All UI must meet **WCAG 2.1 AA** standards: proper contrast ratios, keyboard navigation, focus management, and screen-reader support.
- All form fields must have associated `<label>` elements or `aria-label` / `aria-labelledby` attributes.
- Error messages must be accessible: use `aria-live="polite"` regions or `role="alert"` for form validation errors.
- Use `role="status"` for loading indicators and async feedback.
- Ensure audit-relevant user actions (login, data access, form submissions) are trackable by the backend — emit structured events or call audit endpoints when required.

## Global Component Reuse

- Before creating a new component, check if a reusable one already exists in `src/components/` or `src/shared/ui/`.
- If a component is used in more than one feature, move it to `shared/ui/`.
- Common project components: `Modal`, `Backdrop`, `DropdownMenu`, `Icon`, `ErrorBoundary`, buttons in `button/`.

## Animation Performance

- Prioritize `transform` and `opacity` for CSS animations (properties that do not trigger layout/paint).
- Use `will-change` sparingly and only when there is measurable jank.
- For Motion (framer-motion): prefer `layout` animations and `AnimatePresence` with `mode="wait"`.
- Wrap heavy animated components in `React.memo` or `React.lazy` if they are not visible on initial load.
- Prefer `requestAnimationFrame` over `setTimeout` for frame-synchronization.
- GSAP: use `gsap.context()` for cleanup in `useEffect` and avoid unnecessary re-renders.

## Logic / Markup Separation with Custom Hooks

- Extract business logic, side-effects, and data transformations to custom hooks (`use<Feature>.ts`).
- Components should only contain JSX and prop bindings; all logic lives in the hook.
- Recommended pattern:

```tsx
// hooks/useFeature.ts
export function useFeature() {
  // state, queries, handlers
  return { data, handlers, state };
}

// ui/FeatureView.tsx
export function FeatureView() {
  const { data, handlers, state } = useFeature();
  return <>{/* markup only */}</>;
}
```
