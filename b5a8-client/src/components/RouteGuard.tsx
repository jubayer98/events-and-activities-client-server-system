"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: ("admin" | "host" | "user")[];
}

export default function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not authenticated, redirect to login
        router.push("/login");
      } else if (!allowedRoles.includes(user.role as "admin" | "host" | "user")) {
        // Authenticated but wrong role
        router.push("/unauthorized");
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated or wrong role
  if (!user || !allowedRoles.includes(user.role as "admin" | "host" | "user")) {
    return null;
  }

  return <>{children}</>;
}
