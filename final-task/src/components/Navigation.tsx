"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

export function Navigation() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg sm:text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Job Opportunities
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {status === "loading" ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700 font-medium">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <div className="sm:hidden flex items-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-50 text-xs sm:text-sm"
                >
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-gray-50 text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Sign In</span>
                    <span className="sm:hidden">Login</span>
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    size="sm"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Sign Up</span>
                    <span className="sm:hidden">Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
