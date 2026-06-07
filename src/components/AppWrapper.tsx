"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const publicRoutes = ["/login", "/register"];

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { checkAuth, isAuthenticated, isLoading, user } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [hasChecked, setHasChecked] = useState(false);
  const initializationRef = useRef(false);

  // Initial Auth Check
  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    const initAuth = async () => {
      const token = localStorage.getItem('aureus_token');
      if (token && !isAuthenticated) {
        try {
          await checkAuth();
        } catch (error) {
          console.error("Auth initialization failed:", error);
        }
      }
      setHasChecked(true);
    };
    initAuth();
  }, [checkAuth, isAuthenticated]);

  // Routing Logic
  useEffect(() => {
    if (!hasChecked) return;

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isAuthenticated) {
      if (!isPublicRoute) {
        // Prevent loop if we're already trying to go to login
        router.replace("/login");
      }
    } else if (user) {
      if (isPublicRoute) {
        // Logged in user shouldn't see login/register
        router.replace(user.role === "ADMIN" ? "/admin" : "/");
      } else {
        // Role-based access control
        if (user.role === "ADMIN") {
          const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/") || pathname === "/settings";
          if (!isAdminRoute) {
            router.replace("/admin");
          }
        } else {
          const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
          if (isAdminRoute) {
            router.replace("/");
          }
        }
      }
    }
  }, [hasChecked, isAuthenticated, pathname, router, user]);

  // To prevent hydration flicker and loop, we render a static loader ONLY on protected routes
  // while we are still doing the initial check. Public routes render immediately.
  const isPublicRoute = publicRoutes.includes(pathname);
  if (!hasChecked && !isPublicRoute) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-bg-page">
        <Loader2 className="animate-spin text-amber-500" size={48} />
      </div>
    );
  }

  return <>{children}</>;
}
