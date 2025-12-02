"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import MyReviewsHeader from "./components/MyReviewsHeader";
import MyReviewsList from "./components/MyReviewsList";
import MyReviewsLoadingSkeleton from "./components/MyReviewsLoadingSkeleton";
import { useMyReviews } from "./hooks/useMyReviews";

export default function MyReviewsPage() {
  const { reviews, isLoading } = useMyReviews();

  if (isLoading) {
    return (
      <DashboardLayout>
        <MyReviewsLoadingSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <MyReviewsHeader />
        <MyReviewsList reviews={reviews} />
      </div>
    </DashboardLayout>
  );
}
