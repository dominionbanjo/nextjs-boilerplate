"use client";

import { useState, useRef, useEffect } from "react";
import {
  SearchNormal1,
  Message,
  Notification,
  ArrowDown2,
  Logout,
  HambergerMenu,
  ShieldTick,
  ProfileCircle,
} from "iconsax-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { type RootState, useAppDispatch } from "@/redux";
import { logout } from "@/redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  onMessagesClick?: () => void;
  onToggleSidebar?: () => void;
  onMenuOpen?: () => void;
  isSidebarCollapsed?: boolean;
  showSearch?: boolean;
}

export default function Header({
  onMessagesClick,
  onToggleSidebar,
  isSidebarCollapsed = false,
  showSearch = true,
}: HeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useSelector(
    (state: RootState) => state.auth,
  );

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ─────────── Close on outside click ─────────── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    router.push("/login");
  };

  const handleProfileNavigation = () => {
    setOpen(false);
    router.push("/profile");
  };

  const fullName =
    user?.first_name || user?.last_name
      ? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()
      : "Developer";

  const fallbackText =
    (user?.first_name?.charAt(0) ?? "") + (user?.last_name?.charAt(0) ?? "") ||
    "D";

  const displayRole = user?.type || "Developer";

  return (
    <header className="w-full bg-white border-b flex items-center justify-between px-4 md:px-8 h-20">
      {/* LEFT */}
      <div className="flex items-center gap-2 md:gap-4">
        {onToggleSidebar && (
          <div className={cn("flex items-center", !isSidebarCollapsed && "md:hidden")}>
            <button
              onClick={onToggleSidebar}
              className="p-2.5 hover:bg-slate-50 rounded-lg transition-all text-slate-500 hover:text-slate-900 flex items-center justify-center"
            >
              <HambergerMenu
                size={22}
                color="#64748B"
                variant="Outline"
                className={cn(
                  "transition-all duration-300 hidden md:block",
                  isSidebarCollapsed && "rotate-180",
                )}
              />
              <HambergerMenu
                size={22}
                color="#64748B"
                variant="Outline"
                className="md:hidden"
              />
            </button>
            <div className="h-6 w-px bg-slate-200 ml-2 mr-4 hidden md:block" />
          </div>
        )}

        {showSearch && (
          <div className="hidden sm:flex items-center bg-slate-50/50 rounded-xl border border-slate-100 px-4 py-2 transition-all focus-within:bg-white focus-within:border-blue-200 focus-within:ring-4 focus-within:ring-blue-50 w-64 md:w-90">
            <SearchNormal1 size={18} color="#94A3B8" variant="Outline" className="mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none bg-transparent text-gray-600 placeholder-gray-400 text-[14px]"
            />
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-4">
        <Message
          size={24}
          color="#777777"
          variant="Outline"
          className="cursor-pointer"
          onClick={onMessagesClick}
        />

        <div
          className="relative cursor-pointer"
          onClick={() => router.push("/notifications")}
        >
          <Notification size={24} color="#777777" variant="Outline" />
        </div>

        {/* PROFILE DROPDOWN */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 md:gap-3 p-1 rounded-full hover:bg-slate-50 transition-colors"
          >
            <Avatar className="h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 border shadow-sm">
              <AvatarImage src={user?.profile_picture_url} alt="User avatar" />
              <AvatarFallback className="bg-blue-600 text-white text-xs md:text-sm font-bold">
                {fallbackText}
              </AvatarFallback>
            </Avatar>

            <div className="hidden md:flex flex-col text-left leading-tight pr-1">
              <span className="font-bold text-[13px] lg:text-[14px] text-slate-800">
                {fullName}
              </span>
              <span className="text-blue-600 text-[10px] lg:text-[11px] uppercase tracking-tighter font-bold">
                {displayRole}
              </span>
            </div>

            <ArrowDown2
              size={14}
              color="#64748B"
              variant="Outline"
              className={cn(
                "transition-transform duration-200 hidden sm:block",
                open && "rotate-180",
              )}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="px-5 py-5 border-b bg-slate-50/80">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                    <AvatarImage src={user?.profile_picture_url} />
                    <AvatarFallback className="bg-blue-600 text-white font-bold">
                      {fallbackText}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col overflow-hidden">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-extrabold text-slate-900 truncate">
                        {fullName}
                      </p>
                      {user?.type === "ADMIN" && (
                        <ShieldTick size={14} color="#0A60E1" variant="Bold" />
                      )}
                    </div>
                    <p className="text-[12px] text-slate-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold uppercase">
                    {user?.type || "USER"} Account
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={handleProfileNavigation}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                >
                  <ProfileCircle size={18} color="#64748B" variant="Outline" />
                  My Profile
                </button>

                <div className="h-px bg-slate-100 my-1 mx-2" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold"
                >
                  <Logout size={18} color="#EF4444" variant="Outline" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
