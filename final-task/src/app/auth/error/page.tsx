"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Authentication Error
            </h2>
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              An error occurred during authentication. Please try again or
              contact support if the problem persists.
            </AlertDescription>
          </Alert>

          <div className="mt-6 space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Try Signing In Again</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
