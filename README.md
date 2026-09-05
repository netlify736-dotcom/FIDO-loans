# Fido Uganda Loan Application

A polished, responsive loan application experience for applicants in Uganda. The form collects personal details, an MTN Mobile Money number, requested loan terms, monthly net income, and employment status, then submits the application through Netlify Forms.

## Security

The application intentionally does **not** collect a Mobile Money PIN, password, one-time password, or security code. Applicants are reminded throughout the experience that these credentials must remain private.

Because submissions contain personally identifiable and financial information, deploy this project only when authorized to collect and process applicant data. Restrict form-submission access to the appropriate Netlify team members and establish a clear data-retention policy before production use.

## Technology

- TanStack Start and React 19
- TypeScript and Vite
- Tailwind CSS with a custom responsive design system
- Netlify Forms for persistent form submissions and spam protection
- Lucide React for interface icons

## Run Locally

```bash
pnpm install
pnpm dev
```

The local app runs through Vite. Netlify Forms detection and production submission handling are completed during deployment to Netlify.

## Form Setup

The interactive form lives in `src/components/LoanApplicationForm.tsx`. The matching static declaration in `public/loan-application.html` is required for Netlify form detection. Keep the form name and every submitted field synchronized between these two files.
