import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { Review } from "./ReviewsList";
import { formatDate } from "../utils/dateFormatter";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
            {review.user.firstName[0]}
            {review.user.lastName[0]}
          </div>
          <div>
            <h4 className="font-semibold">
              {review.user.firstName} {review.user.lastName}
            </h4>
            <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <Badge variant="secondary">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {review.rating}/5
          </span>
        </Badge>
      </div>

      {/* Event Info */}
      <div className="mb-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Event:{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {review.event.name}
          </span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Date: {formatDate(review.event.date)}
        </p>
      </div>

      {/* Rating Stars */}
      <div className="mb-2">
        <StarRating rating={review.rating} />
      </div>

      {/* Comment */}
      {review.comment && (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {review.comment}
        </p>
      )}
    </div>
  );
}
