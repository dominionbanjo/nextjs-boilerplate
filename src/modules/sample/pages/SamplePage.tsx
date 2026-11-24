"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import SampleForm from "../components/SampleForm";
import { useGetSampleDataQuery } from "../lib/sampleApi";
import {
  Category,
  Profile,
  Logout,
  Login,
  Briefcase,
  Setting2,
  Notification,
  InfoCircle,
  Refresh,
} from "iconsax-react";

export default function SamplePage() {
  const { data: session, status } = useSession();
  const { data: sampleData, isLoading: isDataLoading, error: dataError } = useGetSampleDataQuery();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border flex items-center gap-2">
          <Briefcase size="24" color="var(--primary)" variant="Bold" />
          <span className="font-bold text-lg tracking-tight">App Boilerplate</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-muted text-primary text-sm font-medium transition-all"
          >
            <Category size="18" color="var(--primary)" variant="Bold" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground text-sm font-medium transition-all"
          >
            <Profile size="18" color="var(--muted-foreground)" variant="Outline" />
            User Profile
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground text-sm font-medium transition-all"
          >
            <Setting2 size="18" color="var(--muted-foreground)" variant="Outline" />
            Settings
          </a>
        </nav>
        <div className="p-4 border-t border-border">
          {session ? (
            <button
              onClick={() => signOut()}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md hover:bg-destructive/10 text-destructive text-sm font-medium transition-all"
            >
              <Logout size="18" color="var(--destructive)" variant="Outline" />
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md hover:bg-primary/10 text-primary text-sm font-medium transition-all"
            >
              <Login size="18" color="var(--primary)" variant="Outline" />
              Sign In
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header bar */}
        <header className="h-16 border-b border-border bg-card/85 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
          <h1 className="font-semibold text-md text-foreground flex items-center gap-2">
            Overview
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 relative">
              <Notification size="20" color="var(--muted-foreground)" variant="Outline" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-1 flex items-center justify-center font-bold text-xs text-primary border border-primary/20">
              {session?.user?.first_name?.[0] || "U"}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-10 space-y-8 max-w-5xl">
          {/* Top Banner / Welcome */}
          <div className="p-6 bg-gradient-to-r from-secondary-12 to-brand-dark rounded-xl text-white-global relative overflow-hidden shadow-sm">
            <div className="relative z-10 max-w-xl space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Welcome back, {session?.user?.first_name || "Guest User"}!
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                A Next.js boilerplate with NextAuth authentication, Redux state management, Tailwind CSS, and shadcn/ui components.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
              <Briefcase size="180" color="var(--white-global)" variant="Bold" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left side: Information and components */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 bg-card border border-border rounded-lg space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <InfoCircle size="20" color="var(--primary)" variant="Bold" />
                  Boilerplate Feature Matrix
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-border rounded-md bg-muted/30">
                    <p className="font-semibold mb-1">Tailwind CSS v4</p>
                    <p className="text-xs text-muted-foreground">Preloaded custom variables, modern tokens, animations, and clean utilities.</p>
                  </div>
                  <div className="p-3 border border-border rounded-md bg-muted/30">
                    <p className="font-semibold mb-1">NextAuth Setup</p>
                    <p className="text-xs text-muted-foreground">Catch-all api handlers, type augmentation, credentials provider, and hook sync.</p>
                  </div>
                  <div className="p-3 border border-border rounded-md bg-muted/30">
                    <p className="font-semibold mb-1">Redux State Manager</p>
                    <p className="text-xs text-muted-foreground">Redux Toolkit configuration with persistent client storage and base queries.</p>
                  </div>
                  <div className="p-3 border border-border rounded-md bg-muted/30">
                    <p className="font-semibold mb-1">UI Component Library</p>
                    <p className="text-xs text-muted-foreground">Shadcn components folder ready for imports: Dialog, Form, Input, Button, Dropdown.</p>
                  </div>
                </div>
              </div>

              {/* Status and active session */}
              <div className="p-6 bg-card border border-border rounded-lg space-y-3">
                <h3 className="text-lg font-semibold">Active Session Dump</h3>
                <pre className="p-4 bg-muted text-xs font-mono rounded-md overflow-x-auto border border-border">
                  {JSON.stringify({ status, session }, null, 2)}
                </pre>
              </div>

              {/* RTK Query Showcase */}
              <div className="p-6 bg-card border border-border rounded-lg space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Refresh size="20" color="var(--primary)" variant="Bold" />
                  RTK Query Data Call
                </h3>
                {isDataLoading ? (
                  <p className="text-sm text-muted-foreground">Fetching data from API endpoint...</p>
                ) : dataError ? (
                  <div className="p-4 bg-destructive/10 text-destructive text-xs font-mono rounded-md border border-destructive/20">
                    <p className="font-semibold">Error status: {(dataError as { status?: string | number }).status}</p>
                    <p className="mt-1">{(dataError as { error?: string }).error || "Failed to load sample data. RTK Query is working but the mock backend is offline."}</p>
                  </div>
                ) : (
                  <pre className="p-4 bg-muted text-xs font-mono rounded-md overflow-x-auto border border-border">
                    {JSON.stringify(sampleData, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            {/* Right side: Form Showcase */}
            <div className="lg:col-span-1 flex justify-center">
              <SampleForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
