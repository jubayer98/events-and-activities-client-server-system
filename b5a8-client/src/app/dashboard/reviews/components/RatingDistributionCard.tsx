import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

interface RatingDistributionCardProps {
  distribution: RatingDistribution;
  totalReviews: number;
}

export default function RatingDistributionCard({
  distribution,
  totalReviews,
}: RatingDistributionCardProps) {
  if (totalReviews === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = distribution[star as keyof RatingDistribution] || 0;
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-4">
              <span className="text-sm font-medium w-8">{star} ⭐</span>
              <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                {count} ({percentage.toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
