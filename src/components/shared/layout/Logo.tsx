"use client";
import { useRouter } from "next/navigation";
import { Briefcase } from "iconsax-react";

export default function Logo({
  variant = "primary",
}: {
  variant?: "primary" | "secondary";
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="flex items-center gap-2 cursor-pointer"
      aria-label="Go to home"
    >
      <Briefcase
        size={28}
        color={variant === "primary" ? "var(--primary)" : "var(--secondary-foreground)"}
        variant="Bold"
      />
      <span className="font-bold text-lg whitespace-nowrap">Boilerplate</span>
    </button>
  );
}
