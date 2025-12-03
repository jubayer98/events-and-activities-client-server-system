"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { reviewApi } from "@/lib/api";

interface EditReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId: string | null;
  eventName: string | null;
  currentRating: number;
  currentComment?: string;
  onReviewUpdated: () => void;
}

export default function EditReviewDialog({
  open,
  onOpenChange,
  reviewId,
  eventName,
  currentRating,
  currentComment,
  onReviewUpdated,
}: EditReviewDialogProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with current values when dialog opens
  useEffect(() => {
    if (open) {
      setRating(currentRating);
      setComment(currentComment || "");
    }
  }, [open, currentRating, currentComment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewId) {
      toast.error("Review ID is missing");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await reviewApi.updateReview(reviewId, {
        rating,
        comment: comment.trim() || undefined,
      });

      if (result.error) {
        toast.error(result.error || "Failed to update review");
      } else {
        toast.success("Review updated successfully!");
        onReviewUpdated();
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("An error occurred while updating the review");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Select a rating";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Your Review</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{eventName}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <svg
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
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
                  </button>
                ))}
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {getRatingLabel(hoveredRating || rating)}
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review (Optional)</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this event..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              rows={5}
              className="resize-none"
            />
            <p className="text-sm text-gray-500 text-right">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || rating === 0}>
              {isSubmitting ? "Updating..." : "Update Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
