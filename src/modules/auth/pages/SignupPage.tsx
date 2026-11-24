"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignupMutation } from "../lib/authApi";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/shared/form/FormInput";
import { Sms, Lock, User, Refresh, InfoCircle, TickCircle } from "iconsax-react";

const signupSchema = z
  .object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupValues) {
    setErrorMessage(null);

    try {
      const res = await signup({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      }).unwrap();

      if (res) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string }; error?: string })?.data?.message ||
        (err as { data?: { message?: string }; error?: string })?.error ||
        "Registration failed. Please check your inputs.";
      setErrorMessage(errorMsg);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-xl shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
          <p className="text-sm text-muted-foreground">
            Get started by creating your account.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md flex items-center gap-2">
            <InfoCircle size="16" color="var(--destructive)" variant="Bold" />
            <span>{errorMessage}</span>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-600 text-sm rounded-md flex items-center gap-2">
            <TickCircle size="16" color="var(--success-1)" variant="Bold" />
            <span>Registration successful! Redirecting to login...</span>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="fullName"
              label="Full Name"
              placeholder="John Doe"
              icon={<User size="18" color="var(--muted-foreground)" variant="Outline" />}
            />

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

            <FormInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              icon={<Lock size="18" color="var(--muted-foreground)" variant="Outline" />}
            />

            <Button type="submit" className="w-full" disabled={isLoading || success}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Refresh className="animate-spin" size="16" color="#ffffff" variant="Outline" />
                  Creating Account...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
