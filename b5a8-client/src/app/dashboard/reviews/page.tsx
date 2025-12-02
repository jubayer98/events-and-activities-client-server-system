"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import RouteGuard from "@/components/RouteGuard";
import ReviewsHeader from "./components/ReviewsHeader";
import RatingOverviewCards from "./components/RatingOverviewCards";
import RatingDistributionCard from "./components/RatingDistributionCard";
import ReviewsList from "./components/ReviewsList";
import ReviewsLoadingSkeleton from "./components/ReviewsLoadingSkeleton";
import { useReviews } from "./hooks/useReviews";

export default function ReviewsPage() {
  const { reviews, rating, isLoading } = useReviews();

  if (isLoading) {
    return (
      <RouteGuard allowedRoles={["host"]}>
        <DashboardLayout>
          <ReviewsLoadingSkeleton />
        </DashboardLayout>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard allowedRoles={["host"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <ReviewsHeader />

          <RatingOverviewCards
            averageRating={rating?.averageRating || 0}
            totalReviews={rating?.totalReviews || 0}
          />

          {rating && rating.totalReviews > 0 && (
            <RatingDistributionCard
              distribution={rating.ratingDistribution}
              totalReviews={rating.totalReviews}
            />
          )}
        </div>
      </DashboardLayout>
    </RouteGuard>
  );
}
