"use client";

import type React from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/lib/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
