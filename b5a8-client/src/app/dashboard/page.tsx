"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "./components/AdminDashboard";
import HostDashboard from "./components/HostDashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect regular users to browse-events page
    if (user && user.role !== "admin" && user.role !== "host") {
      router.push("/dashboard/browse-events");
    }
  }, [user, router]);

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "host":
        return <HostDashboard />;
      default:
        return null; // Regular users are redirected
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {renderDashboard()}
      </div>
    </DashboardLayout>
  );
}
