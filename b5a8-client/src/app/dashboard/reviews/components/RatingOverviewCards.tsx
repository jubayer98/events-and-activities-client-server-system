import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { StarRating } from "./StarRating";

interface RatingOverviewCardsProps {
  averageRating: number;
  totalReviews: number;
  recentReviewsCount: number;
}

export default function RatingOverviewCards({
  averageRating,
  totalReviews,
  recentReviewsCount,
}: RatingOverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardDescription>Average Rating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
            <div className="flex flex-col">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-sm text-gray-500 mt-1">out of 5</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Total Reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">{totalReviews}</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Recent Reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">{recentReviewsCount}</span>
        </CardContent>
      </Card>
    </div>
  );
}
