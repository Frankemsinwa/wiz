"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const publicRoutes = ["/login", "/register"];

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { checkAuth, isAuthenticated, isLoading, user } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      // Only check auth if we don't have it yet
      if (!isAuthenticated && localStorage.getItem('wiz_token')) {
        await checkAuth();
      }
      setHasChecked(true);
    };
    initAuth();
  }, [checkAuth, isAuthenticated]);

  useEffect(() => {
    if (!hasChecked) return;

    if (!isAuthenticated) {
      if (!publicRoutes.includes(pathname)) {
        router.push("/login");
      }
    } else if (user) {
      // Handle role-based redirection
      if (user.role === "ADMIN") {
        // Admin should not be on non-admin routes except settings
        if (pathname !== "/admin" && pathname !== "/settings" && !pathname.startsWith("/admin/")) {
           router.push("/admin");
        }
      } else {
        // Regular users should not be on admin routes
        if (pathname === "/admin" || pathname.startsWith("/admin/")) {
          router.push("/");
        }
      }
      
      // If user is already on login/register while authenticated, redirect them
      if (publicRoutes.includes(pathname)) {
        router.push(user.role === "ADMIN" ? "/admin" : "/");
      }
    }
  }, [hasChecked, isAuthenticated, pathname, router, user]);

  if (isLoading || (!hasChecked && !publicRoutes.includes(pathname))) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-bg-page">
        <Loader2 className="animate-spin text-wise-green" size={48} />
      </div>
    );
  }

  return <>{children}</>;
}
