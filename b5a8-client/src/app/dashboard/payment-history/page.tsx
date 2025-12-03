"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useMyBookings } from "../my-bookings/hooks/useMyBookings";
import { usePaymentHistory } from "./hooks/usePaymentHistory";
import PaymentHistoryTable from "./components/PaymentHistoryTable";

export default function PaymentHistoryPage() {
  // Get all bookings to extract booking IDs with completed payments
  const { bookings, isLoading: bookingsLoading } = useMyBookings();

  // Filter bookings with completed payments
  const paidBookingIds = bookings
    .filter(
      (booking) =>
        booking.paymentConfirmation === true &&
        booking.paymentStatus === "completed"
    )
    .map((booking) => booking._id);

  // Fetch payment history for all paid bookings
  const { payments, loading: paymentsLoading, error } = usePaymentHistory(paidBookingIds);

  const loading = bookingsLoading || paymentsLoading;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Payment History</h1>
          <p className="text-gray-500 dark:text-gray-400">
            View all your completed payment transactions
          </p>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
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
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Payments
              </p>
              <p className="text-2xl font-bold">{payments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </p>
              <p className="text-2xl font-bold">
                ${payments.reduce((sum, p) => sum + p.paymentAmount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
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
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Avg. Payment
              </p>
              <p className="text-2xl font-bold">
                $
                {payments.length > 0
                  ? (
                      payments.reduce((sum, p) => sum + p.paymentAmount, 0) /
                      payments.length
                    ).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : (
        /* Payment History Table */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <div className="text-sm text-gray-500">
              {payments.length} transaction{payments.length !== 1 ? "s" : ""}
            </div>
          </div>
          <PaymentHistoryTable payments={payments} />
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}
