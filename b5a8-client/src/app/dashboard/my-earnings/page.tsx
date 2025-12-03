"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useMyEvents } from "../my-events/hooks/useMyEvents";
import { useMyEarnings } from "./hooks/useMyEarnings";
import EarningsCard from "./components/EarningsCard";

export default function MyEarningsPage() {
  // Get all events created by the host
  const { events, isLoading: eventsLoading } = useMyEvents();

  // Filter paid events only
  const paidEventIds = events
    .filter((event) => event.feeStatus === "paid")
    .map((event) => event._id);

  // Fetch earnings for all paid events
  const { earnings, loading: earningsLoading, error, totals } = useMyEarnings(paidEventIds);

  const loading = eventsLoading || earningsLoading;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">My Earnings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your revenue and earnings from paid events
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Total Earnings</p>
              <svg
                className="w-8 h-8 opacity-80"
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
            <p className="text-3xl font-bold">${totals.totalEarnings.toFixed(2)}</p>
            <p className="text-xs opacity-80 mt-1">After platform fees</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Gross Revenue
              </p>
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${totals.totalRevenue.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total revenue collected</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Platform Fees
              </p>
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${totals.totalPlatformFee.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Deducted fees</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Bookings
              </p>
              <svg
                className="w-8 h-8 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {totals.totalBookings}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {totals.totalConfirmedPayments} confirmed
            </p>
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
        ) : earnings.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Earnings Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You don&apos;t have any paid events with confirmed bookings yet.
            </p>
          </div>
        ) : (
          /* Earnings List */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Event-wise Earnings</h2>
              <div className="text-sm text-gray-500">
                {earnings.length} paid event{earnings.length !== 1 ? "s" : ""}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {earnings.map((earning) => (
                <EarningsCard key={earning.event.id} earnings={earning} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
