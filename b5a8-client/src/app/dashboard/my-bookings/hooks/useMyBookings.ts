/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { bookingApi } from "@/lib/api";
import { toast } from "sonner";

export interface Booking {
  bookingExpiry: string;
  _id: string;
  user: string;
  event: {
    _id: string;
    name: string;
    type: string;
    date: string;
    time: string;
    location: string;
    feeStatus: "free" | "paid";
    joiningFee: number;
    status: "Open" | "Full" | "Cancelled" | "Completed";
  };
  bookingStatus: boolean;
  paymentStatus: "pending" | "completed" | "failed";
  paymentConfirmation: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useMyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const result = await bookingApi.getMyBookings();
      if (result.error) {
        toast.error(result.error);
        setBookings([]);
      } else {
        const bookingsData = (result.data as any)?.bookings || [];
        setBookings(bookingsData);
      }
    } catch (error) {
      toast.error("Failed to load bookings");
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings with bookingStatus true and paymentConfirmation true
  const confirmedBookings = bookings.filter(
    (booking) => booking.bookingStatus && booking.paymentConfirmation
  );

  // Filter bookings with bookingStatus true, paymentConfirmation false, and paymentStatus pending
  const pendingBookings = bookings.filter(
    (booking) =>
      booking.bookingStatus &&
      !booking.paymentConfirmation &&
      booking.paymentStatus === "pending"
  );

  return {
    bookings,
    confirmedBookings,
    pendingBookings,
    isLoading,
    refetch: fetchBookings,
  };
}
