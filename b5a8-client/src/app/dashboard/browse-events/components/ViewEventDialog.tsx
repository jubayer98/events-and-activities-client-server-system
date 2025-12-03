import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { eventApi, bookingApi, reviewApi } from "@/lib/api";
import { Event } from "../hooks/useBrowseEvents";

interface ViewEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string | null;
}

interface HostRating {
  averageRating: number;
  totalReviews: number;
}

export default function ViewEventDialog({
  open,
  onOpenChange,
  eventId,
}: ViewEventDialogProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [checkingBooking, setCheckingBooking] = useState(false);
  const [hostRating, setHostRating] = useState<HostRating | null>(null);

  useEffect(() => {
    if (open && eventId) {
      fetchEvent();
      checkBookingStatus();
    }
  }, [open, eventId]);

  const fetchEvent = async () => {
    if (!eventId) return;

    setIsLoading(true);
    try {
      const result = await eventApi.getEventById(eventId);
      if (result.error) {
        toast.error(result.error);
        setEvent(null);
      } else {
        setEvent((result.data as any)?.event || null);
      }
    } catch (_error) {
      toast.error("Failed to load event details");
      setEvent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHostRating = async () => {
    if (!event?.host?._id) return;

    try {
      const result = await reviewApi.getHostRating(event.host._id);
      if (!result.error) {
        const ratingData = (result.data as any);
        setHostRating({
          averageRating: ratingData?.averageRating || 0,
          totalReviews: ratingData?.totalReviews || 0,
        });
      }
    } catch (_error) {
      // Silently fail for rating fetch
      setHostRating(null);
    }
  };

  // Fetch host rating when event is loaded
  useEffect(() => {
    if (event?.host?._id) {
      fetchHostRating();
    }
  }, [event?.host?._id]);

  const checkBookingStatus = async () => {
    if (!eventId) return;

    setCheckingBooking(true);
    try {
      const result = await bookingApi.checkBookingStatus(eventId);
      if (!result.error) {
        const bookingData = (result.data as any);
        setIsBooked(bookingData?.isBooked || false);
      }
    } catch (_error) {
      // Silently fail for booking check
      setIsBooked(false);
    } finally {
      setCheckingBooking(false);
    }
  };

  const handleBooking = async () => {
    if (!eventId) return;

    setIsBooking(true);
    try {
      const result = await bookingApi.createBooking(eventId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Event booked successfully!");
        setIsBooked(true);
        // Refresh event data to get updated participant count
        fetchEvent();
      }
    } catch (_error) {
      toast.error("Failed to book event");
    } finally {
      setIsBooking(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Full":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <>
            <DialogHeader>
              <DialogTitle>Loading Event Details</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </>
        ) : event ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{event.name}</DialogTitle>
              <DialogDescription>Event Details</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Image */}
              {event.image && (
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Status Badge */}
              <div>
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </div>

              <Separator />

              {/* Event Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Event Type
                  </h3>
                  <p className="text-base">{event.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Fee Status
                  </h3>
                  <p className="text-base">
                    {event.feeStatus === "free" ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">${event.joiningFee}</span>
                    )}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Date & Time */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Date & Time
                </h3>
                <p className="text-base">
                  {formatDate(event.date)} at {formatTime(event.time)}
                </p>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Location
                </h3>
                <p className="text-base">{event.location}</p>
              </div>

              <Separator />

              {/* Participants */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Participants
                </h3>
                <p className="text-base">
                  {event.currentParticipants} / {event.requiredParticipant.max}{" "}
                  participants
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Minimum required: {event.requiredParticipant.min}
                </p>
              </div>

              <Separator />

              {/* Host Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Host Information
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-medium">
                      {event.host.firstName} {event.host.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{event.host.email}</p>
                  </div>
                  {hostRating && hostRating.totalReviews > 0 && (
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="font-semibold text-lg">
                          {hostRating.averageRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({hostRating.totalReviews} {hostRating.totalReviews === 1 ? 'review' : 'reviews'})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Description
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {event.description}
                    </p>
                  </div>
                </>
              )}

              {/* Booking Button - Only show if status is Open */}
              {event.status === "Open" && (
                <>
                  <Separator />
                  <div className="flex gap-4 pt-2">
                    {isBooked ? (
                      <Button
                        disabled
                        className="flex-1 bg-gray-400 cursor-not-allowed"
                        size="lg"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Already Booked
                      </Button>
                    ) : (
                      <Button
                        onClick={handleBooking}
                        disabled={isBooking || checkingBooking}
                        className="flex-1"
                        size="lg"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {isBooking ? "Booking..." : "Book This Event"}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <DialogTitle>Event not found</DialogTitle>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
