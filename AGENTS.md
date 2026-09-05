# Fido Uganda Loan Application

## Project Overview

This project is a mobile-friendly loan application form for applicants in Uganda. It uses Netlify Forms to receive submissions without a custom API or external database.

## Architecture

- `src/routes/__root.tsx` defines the HTML shell and page metadata.
- `src/routes/index.tsx` renders the application at the root route.
- `src/components/LoanApplicationForm.tsx` contains form fields, client-side submission states, validation, and security guidance.
- `src/styles.css` contains the full visual system and responsive layout.
- `public/loan-application.html` mirrors every submitted field so Netlify can register the form during deployment.
- `netlify.toml` configures the TanStack Start build and publish directory.

## Technology

- TanStack Start with React and TypeScript
- TanStack Router file-based routing
- Vite and Tailwind CSS
- Netlify Forms with a honeypot field
- Lucide React icons

## Coding Conventions

- Use PascalCase for React components and camelCase for functions and state.
- Keep form field names synchronized between `LoanApplicationForm.tsx` and `public/loan-application.html`.
- Submit forms to the static skeleton path, not `/`, so Netlify Forms receives the request before SSR routing.
- Keep shared colors, typography, spacing, and responsive behavior in `src/styles.css`.
- Preserve semantic labels, fieldsets, legends, focus states, and status messages for accessibility.

## Security Decisions

- Never add a Mobile Money PIN, password, one-time password, or security-code field.
- The form collects an MTN Mobile Money phone number instead of a PIN and warns applicants not to disclose credentials.
- Treat submissions as personally identifiable financial information and limit access through Netlify account permissions.
- Do not log form data in browser or server output.

## Local Development

Install dependencies with `pnpm install` and run `pnpm dev`. Netlify Forms processing is available on deployed previews; the static form declaration must remain in `public/loan-application.html`.
