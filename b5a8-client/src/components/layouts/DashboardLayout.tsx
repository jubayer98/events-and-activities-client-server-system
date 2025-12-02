"use client";

import { ReactNode, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DashboardLayoutSkeleton from "./DashboardLayoutSkeleton";
import DashboardSidebar from "../DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (isLoading) {
    return <DashboardLayoutSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Dashboard Header */}
          <header className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <DashboardSidebar onClose={() => setIsMobileSidebarOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Title */}
            <div className="hidden lg:block">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Dashboard
              </h1>
            </div>

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center space-x-2">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SyncSpace
              </span>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* User Name */}
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.firstName} {user?.lastName}
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
