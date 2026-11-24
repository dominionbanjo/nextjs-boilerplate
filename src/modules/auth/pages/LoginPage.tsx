"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn, getSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/shared/form/FormInput";
import { Sms, Lock, Refresh, InfoCircle } from "iconsax-react";
import { getDashboardRoute } from "../lib/getDashboardRoute";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        setErrorMessage(res.error);
        setLoading(false);
        return;
      }

      const session = await getSession();
      const redirect = searchParams.get("redirect");

      if (redirect) {
        window.location.assign(redirect.startsWith("http") ? redirect : window.location.origin + redirect);
      } else {
        const dashboardRoute = getDashboardRoute({
          user: session?.user || null,
        });
        window.location.assign(window.location.origin + dashboardRoute);
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-xl shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your account.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md flex items-center gap-2">
            <InfoCircle size="16" color="var(--destructive)" variant="Bold" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="developer@example.com"
              icon={<Sms size="18" color="var(--muted-foreground)" variant="Outline" />}
            />

            <FormInput
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              icon={<Lock size="18" color="var(--muted-foreground)" variant="Outline" />}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Refresh className="animate-spin" size="16" color="#ffffff" variant="Outline" />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          {"Don't have an account?"}{" "}
          <a href="/signup" className="text-primary hover:underline font-medium">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
