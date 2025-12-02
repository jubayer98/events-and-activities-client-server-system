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
import { toast } from "sonner";
import { bookingApi } from "@/lib/api";
import { Booking } from "../hooks/useMyBookings";

interface BookingsTableProps {
  bookings: Booking[];
  showCancelButton?: boolean;
  onBookingUpdated: () => void;
}

export default function BookingsTable({
  bookings,
  showCancelButton = false,
  onBookingUpdated,
}: BookingsTableProps) {
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [isCanceling, setIsCanceling] = useState(false);

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
              {showCancelButton && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={showCancelButton ? 8 : 7}
                  className="text-center py-8 text-gray-500"
                >
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">
                    {booking.event.name}
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
    </div>
  );
}
