import { useState, useEffect } from "react";
import { reviewApi } from "@/lib/api";
import { toast } from "sonner";
import { MyReview } from "../components/MyReviewsList";

export function useMyReviews() {
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        setIsLoading(true);
        const result = await reviewApi.getMyReviews();

        // Handle the response data properly - reviews are nested in data.reviews
        const reviewsData = (result.data as { reviews?: MyReview[] })?.reviews || result.data;
        const reviewsArray = Array.isArray(reviewsData) ? reviewsData : [];
        setReviews(reviewsArray as MyReview[]);
      } catch (error) {
        console.error("Failed to fetch my reviews:", error);
        toast.error("Failed to load your reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReviews();
  }, []);

  return {
    reviews,
    isLoading,
  };
}
