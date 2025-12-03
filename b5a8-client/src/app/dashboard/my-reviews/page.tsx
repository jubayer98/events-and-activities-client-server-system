"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import RouteGuard from "@/components/RouteGuard";
import MyReviewsHeader from "./components/MyReviewsHeader";
import MyReviewsList from "./components/MyReviewsList";
import MyReviewsLoadingSkeleton from "./components/MyReviewsLoadingSkeleton";
import { useMyReviews } from "./hooks/useMyReviews";

export default function MyReviewsPage() {
  const { reviews, isLoading, refetch } = useMyReviews();

  if (isLoading) {
    return (
      <RouteGuard allowedRoles={["user"]}>
        <DashboardLayout>
          <MyReviewsLoadingSkeleton />
        </DashboardLayout>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard allowedRoles={["user"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <MyReviewsHeader />
          <MyReviewsList reviews={reviews} onReviewUpdated={refetch} />
        </div>
      </DashboardLayout>
    </RouteGuard>
  );
}
