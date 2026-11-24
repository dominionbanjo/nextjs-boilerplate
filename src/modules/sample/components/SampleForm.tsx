"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/shared/form/FormInput";
import FormCheckbox from "@/components/shared/form/FormCheckbox";
import { Sms, User } from "iconsax-react";

// Form Schema validation using Zod
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SampleForm() {
  // Initialize form using react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      terms: false,
    },
  });

  // Submit Handler
  function onSubmit(values: FormValues) {
    alert(JSON.stringify(values, null, 2));
    form.reset();
  }

  return (
    <div className="w-full max-w-md p-6 bg-card border border-border rounded-lg shadow-sm">
      <div className="flex flex-col space-y-2 mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <User size="24" color="var(--primary)" variant="Bold" />
          Create Account
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to test Zod validation and React Hook Form.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <FormInput
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            icon={<User size="18" color="var(--muted-foreground)" variant="Outline" />}
          />

          {/* Email Address */}
          <FormInput
            name="email"
            type="email"
            label="Email Address"
            placeholder="johndoe@example.com"
            icon={<Sms size="18" color="var(--muted-foreground)" variant="Outline" />}
          />

          {/* Accept Terms Checkbox */}
          <div className="rounded-md border border-border p-4 bg-muted/50">
            <FormCheckbox
              name="terms"
              label="Accept Terms & Conditions"
              description="I agree to the terms of service."
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-2">
            Submit Registration
          </Button>
        </form>
      </Form>
    </div>
  );
}
