import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { reviewApi } from "@/lib/api";
import { toast } from "sonner";
import { Review } from "../components/ReviewsList";

export interface Rating {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export function useReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<Rating | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviewsAndRating = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const [reviewsData, ratingData] = await Promise.all([
          reviewApi.getHostReviews(user.id),
          reviewApi.getHostRating(user.id),
        ]);

        // Handle the response data properly
        const reviewsArray = Array.isArray(reviewsData.data) ? reviewsData.data : [];
        setReviews(reviewsArray as Review[]);
        setRating(ratingData.data as Rating);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        toast.error("Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewsAndRating();
  }, [user?.id]);

  return {
    reviews,
    rating,
    isLoading,
  };
}
