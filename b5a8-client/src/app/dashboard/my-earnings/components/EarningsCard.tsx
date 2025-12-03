"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventEarnings } from "../hooks/useMyEarnings";

interface EarningsCardProps {
  earnings: EventEarnings;
}

export default function EarningsCard({ earnings }: EarningsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Event Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {earnings.event.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{earnings.event.type}</span>
              <span>•</span>
              <span>{formatDate(earnings.event.date)}</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            ${earnings.event.joiningFee} / ticket
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Bookings</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {earnings.bookingStats.totalBookings}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Confirmed</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {earnings.bookingStats.confirmedPayments}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pending</p>
            <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {earnings.bookingStats.pendingPayments}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Revenue</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${earnings.earnings.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Gross Revenue</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ${earnings.earnings.totalRevenue.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
              Platform Fee
              <span className="text-xs text-gray-500">
                ({earnings.earnings.platformPercentage}%)
              </span>
            </span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              -${earnings.earnings.platformFee.toFixed(2)}
            </span>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-white">Your Earnings</span>
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              ${earnings.earnings.hostEarnings.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
