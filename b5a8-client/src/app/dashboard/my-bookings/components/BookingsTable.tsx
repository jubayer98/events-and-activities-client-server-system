import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { bookingApi } from "@/lib/api";
import { Booking } from "../hooks/useMyBookings";
import ReviewEventDialog from "./ReviewEventDialog";
import PaymentDialog from "./PaymentDialog";

interface BookingsTableProps {
  bookings: Booking[];
  showCancelButton?: boolean;
  showReviewButton?: boolean;
  onBookingUpdated: () => void;
}

export default function BookingsTable({
  bookings,
  showCancelButton = false,
  showReviewButton = false,
  onBookingUpdated,
}: BookingsTableProps) {
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [isCanceling, setIsCanceling] = useState(false);
  const [reviewEvent, setReviewEvent] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [paymentBooking, setPaymentBooking] = useState<{
    id: string;
    name: string;
    amount: number;
  } | null>(null);

  const handleCancel = async () => {
    if (!cancelBookingId) return;

    setIsCanceling(true);
    try {
      const result = await bookingApi.cancelBooking(cancelBookingId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Booking cancelled successfully");
        setCancelBookingId(null);
        onBookingUpdated();
      }
    } catch (_error) {
      toast.error("Failed to cancel booking");
    } finally {
      setIsCanceling(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getEventStatusColor = (status: string) => {
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Event Status</TableHead>
                <TableHead>Payment Status</TableHead>
                {(showCancelButton || showReviewButton) && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={showCancelButton || showReviewButton ? 8 : 7}
                    className="text-center py-8 text-gray-500"
                  >
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {booking.event.name}
                        {showCancelButton && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <svg
                                className="w-4 h-4 text-blue-500 cursor-help"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <div className="space-y-2">
                                <p className="font-semibold text-sm">Booking Expiry:</p>
                                <p className="text-sm">{formatDateTime(booking.bookingExpiry)}</p>
                                <p className="text-xs text-gray-500">
                                  This booking will be automatically deleted if payment is not completed by this time.
                                </p>
                                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                                  ⚠️ Once cancelled, you cannot rebook until the booking expires automatically.
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{booking.event.type}</TableCell>
                    <TableCell>{formatDate(booking.event.date)}</TableCell>
                    <TableCell>{booking.event.location}</TableCell>
                    <TableCell>
                      {booking.event.feeStatus === "free" ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        <span className="font-medium">
                          ${booking.event.joiningFee}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getEventStatusColor(booking.event.status)}>
                        {booking.event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {booking.event.feeStatus === "free" ? (
                        <span className="text-gray-500 text-sm">N/A</span>
                      ) : (
                        <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus.charAt(0).toUpperCase() +
                            booking.paymentStatus.slice(1)}
                        </Badge>
                      )}
                    </TableCell>
                    {showCancelButton && (
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          {/* Make Payment Button - only for paid events */}
                          {booking.event.feeStatus === "paid" && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() =>
                                setPaymentBooking({
                                  id: booking._id,
                                  name: booking.event.name,
                                  amount: booking.event.joiningFee,
                                })
                              }
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                              </svg>
                              Make Payment
                            </Button>
                          )}
                          
                          {/* Cancel Booking Button */}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setCancelBookingId(booking._id)}
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Cancel Booking
                          </Button>
                        </div>
                      </TableCell>
                    )}
                    {showReviewButton && (
                    <TableCell className="text-right">
                      {booking.event.status === "Completed" ? (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() =>
                            setReviewEvent({
                              id: booking.event._id,
                              name: booking.event.name,
                            })
                          }
                        >
                          <svg
                            className="w-4 h-4 mr-2"
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
                          Write Review
                        </Button>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        </div>

        {/* Cancel Confirmation Dialog */}
        <AlertDialog
          open={!!cancelBookingId}
          onOpenChange={() => setCancelBookingId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this booking? This action cannot be
                undone.
              </AlertDialogDescription>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mt-3">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>⚠️ Important:</strong> Once you cancel this booking, you will not be able to rebook this event until the booking expires automatically.
                </p>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Booking</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancel}
                disabled={isCanceling}
                className="bg-red-600 hover:bg-red-700"
              >
                {isCanceling ? "Canceling..." : "Cancel Booking"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Review Event Dialog */}
        <ReviewEventDialog
          open={!!reviewEvent}
          onOpenChange={() => setReviewEvent(null)}
          eventId={reviewEvent?.id || null}
          eventName={reviewEvent?.name || null}
          onReviewSubmitted={onBookingUpdated}
        />

        {/* Payment Dialog */}
        <PaymentDialog
          open={!!paymentBooking}
          onOpenChange={() => setPaymentBooking(null)}
          bookingId={paymentBooking?.id || null}
          amount={paymentBooking?.amount || 0}
          eventName={paymentBooking?.name || null}
          onPaymentSuccess={onBookingUpdated}
        />
      </div>
    </TooltipProvider>
  );
}
