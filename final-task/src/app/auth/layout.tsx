import type React from "react";
import Providers from "@/components/Providers";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Providers>{children}</Providers>
    </div>
  );
}
