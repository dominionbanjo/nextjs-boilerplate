# Next.js 16 & React 19 Project Boilerplate

A production-ready boilerplate built on **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. This repository serves as a starting point for new projects, featuring a modular architecture, centralized global state management, automated authentication redirects, unified form wrappers, and automated CI security checks.

---

## 🌟 Key Features

- **NextAuth Integration**: catch-all session providers, credentials authentication (email and password), and custom type declarations.
- **Redux Toolkit & Persistence**: global client-side store sync with persistent local/session storage.
- **RTK Query Endpoints**: API caching and custom hook generation via endpoint injection (`injectEndpoints`) and automated tag invalidation.
- **Tailwind CSS v4 Design System**: curated HSL color palettes, dark mode tokens, scrollbar utilities, and slide-in animations.
- **Unified Form Component wrappers**: reusable `FormInput` and `FormCheckbox` controls wrapping Zod schema checks and React Hook Form states.
- **Generalized Routing Guards**: client-side `<ProtectedRoute>` components and a server-side `proxy.ts` interceptor to protect pages and API access.
- **Automated Security Checks**: a GitHub Actions workflow that blocks committed env files, hardcoded secrets, `eval()`, and unsanitized `dangerouslySetInnerHTML`.

---

## 📁 Project Directory Structure

```bash
├── .github/
│   └── workflows/
│       └── build-and-scan.yml      # CI/CD compilation and security scan pipeline
├── src/
│   ├── app/                        # App Router directory
│   │   ├── (auth)/                 # Login and signup router entries
│   │   ├── api/auth/               # NextAuth API catch-all endpoints
│   │   ├── globals.css             # Tailwind v4 theme configurations
│   │   ├── layout.tsx              # Root HTML wrapper with providers
│   │   └── providers.tsx           # Session, Redux, and Theme contexts
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx    # NextAuth-to-Redux sync context
│   │   │   └── ProtectedRoute.tsx  # Dynamic USER/ADMIN route wrapper
│   │   ├── shared/                 # Reusable layout and form widgets
│   │   │   └── form/               # FormInput and FormCheckbox validation controls
│   │   └── ui/                     # Shadcn base elements (buttons, inputs, etc.)
│   ├── data/
│   │   └── countryCodes.ts         # List of ISO codes and country flags
│   ├── lib/
│   │   ├── api-auth.ts             # Server-side API route session guard helper
│   │   ├── auth.ts                 # NextAuth options and configurations
│   │   └── utils.ts                # Tailwind merge helper (cn)
│   ├── modules/                    # Feature Modules directory
│   │   ├── auth/                   # Custom auth pages, APIs, and hooks
│   │   └── sample/                 # Sample dashboard, form validation, and query calling
│   ├── redux/
│   │   ├── slices/                 # State slices (authSlice, cartSlice, etc.)
│   │   ├── baseApi.ts              # RTK Query base configuration
│   │   ├── index.ts                # Redux store builder
│   │   └── root-reducer.ts         # Combined slices root reducer
│   ├── types/                      # Common custom typings
│   │   └── next-auth.d.ts          # Augmented NextAuth declarations
│   └── utils/                      # Helper utilities (cookies, url parsing)
├── components.json                 # Shadcn CLI layout configuration
└── tsconfig.json                   # Path alias mappings
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js version `20` or higher
- npm package manager

### 2. Environment Variables
Create a `.env` (or `.env.local`) file in the root folder with the following variables:
```env
NEXT_PUBLIC_BASE_API_URL=https://api.yourdomain.com/v1
NEXTAUTH_SECRET=your_nextauth_jwt_signing_secret_here
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
```
`NEXT_PUBLIC_ROOT_DOMAIN` is optional and only needed if you use subdomain-aware URLs or cookies.

> [!WARNING]
> Do not commit `.env` or configuration secrets to repository branches. The CI build scan will fail if secrets are checked in.

### 3. Installation
Install the project dependencies:
```bash
npm install
```

### 4. Running the Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the sample dashboard.

---

## 🛠️ Usage Guidelines

### 1. Registering RTK Query Endpoints
To keep the boilerplate modular, avoid editing `baseApi.ts` directly. Instead, inject endpoints within your module directories:
```typescript
import BaseAPI from "@/redux/baseApi";

export const featureApi = BaseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureData: builder.query<DataType, void>({
      query: () => "/feature-endpoint",
      providesTags: ["sample"], // Matches base tagTypes
    }),
  }),
});

export const { useGetFeatureDataQuery } = featureApi;
```

### 2. Guarding Frontend Pages
Wrap any protected view inside `<ProtectedRoute>` and specify the allowed user types:
```tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SensitiveDashboard() {
  return (
    <ProtectedRoute allowedTypes={["ADMIN"]}>
      <main>This content is only visible to Admin users.</main>
    </ProtectedRoute>
  );
}
```

### 3. Creating Unified Forms
Utilize the shared `FormInput` and `FormCheckbox` components. They automatically retrieve their react-hook-form context and render labels, prefix icons, and error states:
```tsx
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/shared/form/FormInput";

// Inside component:
const form = useForm({ defaultValues: { email: "" } });

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormInput 
        name="email" 
        label="Email Address" 
        placeholder="user@example.com" 
      />
    </form>
  </Form>
);
```

---

## 🔒 Security Checks

Security is enforced directly by the GitHub Actions workflow on every push and pull request:
- **Dependency Audit**: `npm audit --audit-level=high` reports vulnerable packages.
- **Env Files**: Fails if any `.env*` file is tracked by git.
- **Hardcoded Secrets**: Fails on inline assignments to secret-shaped keys such as `NEXTAUTH_SECRET`, `PRIVATE_KEY`, `API_SECRET`, or `SECRET_KEY`.
- **`eval()`**: Fails on any use of `eval()`.
- **HTML Injection**: `dangerouslySetInnerHTML` is allowed only when the file also sanitizes its input (for example with `DOMPurify` or a `sanitize` helper); otherwise the check fails.
- **Verification**: Type checking, tests, and the production build run in the same workflow.
