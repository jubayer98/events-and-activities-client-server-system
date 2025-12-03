"use client";

import RouteGuard from "@/components/RouteGuard";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard allowedRoles={["admin", "host", "user"]}>
      {children}
    </RouteGuard>
  );
}
