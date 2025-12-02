import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MyReviewCard from "./MyReviewCard";

export interface MyReview {
  _id: string;
  user: string;
  host: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string | null;
    fullName: string;
    id: string;
  };
  event: {
    _id: string;
    name: string;
    date: string;
    id: string;
  };
  booking: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface MyReviewsListProps {
  reviews: MyReview[];
}

export default function MyReviewsList({ reviews }: MyReviewsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All My Reviews</CardTitle>
        <CardDescription>
          {reviews.length === 0
            ? "No reviews yet"
            : `You have written ${reviews.length} review${reviews.length !== 1 ? "s" : ""}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <EmptyReviewsState />
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <MyReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyReviewsState() {
  return (
    <div className="text-center py-12">
      <svg
        className="w-16 h-16 mx-auto text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
      <p className="text-gray-600 dark:text-gray-400">
        Your reviews for attended events will appear here
      </p>
    </div>
  );
}
