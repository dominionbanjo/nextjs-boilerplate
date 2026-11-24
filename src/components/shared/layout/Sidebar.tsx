"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Category,
  Setting2,
  Profile,
  Briefcase,
} from "iconsax-react";
import { cn } from "@/lib/utils";

export default function Sidebar({
  isCollapsed = false,
  isMobileOpen = false,
  onMobileClose,
  isHidden = false,
}: {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  isHidden?: boolean;
}) {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      label: "Dashboard",
      href: "/",
      icon: Category,
    },
    {
      label: "User Profile",
      href: "/profile",
      icon: Profile,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Setting2,
    },
  ];

  const isActivePath = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed md:sticky md:top-0 h-screen bg-white border-r flex flex-col shrink-0 transition-all duration-300 z-30",
          isHidden
            ? "-translate-x-full md:-translate-x-full w-0 border-r-0 overflow-hidden"
            : isCollapsed
              ? "w-20"
              : "w-64",
          isMobileOpen
            ? "translate-x-0 w-64!"
            : isHidden
              ? "-translate-x-full"
              : "-translate-x-full md:translate-x-0",
        )}
      >
        <div
          className={cn(
            "px-6 h-20 py-6 flex items-center transition-all",
            isCollapsed && "px-4 justify-center",
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <Briefcase size="28" color="var(--primary)" variant="Bold" />
            {!isCollapsed && <span className="font-bold text-lg">Boilerplate</span>}
          </Link>
        </div>
        <div className="border-b border-border" />

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {sidebarLinks.map((item, i) => {
            const isActive = isActivePath(item.href);

            return (
              <Link
                key={i}
                href={item.href}
                title={isCollapsed ? item.label : ""}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  isActive
                    ? "bg-blue-50 text-blue-600 font-bold border-l-4 border-blue-600 rounded-l-none"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium",
                  isCollapsed && "justify-center px-0",
                )}
              >
                <item.icon
                  size={22}
                  variant={isActive ? "Bold" : "Outline"}
                  color={isActive ? "#1E6BFF" : "#94A3B8"}
                />
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
