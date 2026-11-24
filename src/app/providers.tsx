"use client";

import { Provider } from "react-redux";
import store, { persistor } from "@/redux";
import AuthProvider from "@/components/auth/AuthProvider";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
