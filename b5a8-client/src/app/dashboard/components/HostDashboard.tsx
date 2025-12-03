"use client";

import { useHostStats } from "../hooks/useHostStats";

export default function HostDashboard() {
  const { stats, loading, error } = useHostStats();

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-600 dark:text-red-400">Failed to load host dashboard: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Host Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of your events and earnings
        </p>
      </div>

      {/* Header Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Events */}
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 font-medium">Total Events</p>
              <p className="text-3xl font-bold">{stats.events.total}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm opacity-90 pt-3 border-t border-white/20">
            <span>Free: {stats.events.byFeeType.free}</span>
            <span>Paid: {stats.events.byFeeType.paid}</span>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 font-medium">Total Bookings</p>
              <p className="text-3xl font-bold">{stats.bookings.total}</p>
            </div>
          </div>
          <div className="flex items-center justify-center text-sm opacity-90 pt-3 border-t border-white/20">
            <span>Confirmed Payments: {stats.bookings.confirmedPayments}</span>
          </div>
        </div>

        {/* Host Earnings */}
        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 font-medium">Host Earnings</p>
              <p className="text-3xl font-bold">${stats.revenue.hostEarnings.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm opacity-90 pt-3 border-t border-white/20">
            <span>Revenue: ${stats.revenue.totalRevenue.toFixed(2)}</span>
            <span>Fee: {stats.revenue.platformPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Analytics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Events Analytics
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">By Status</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Open</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.events.byStatus.open}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Full</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.events.byStatus.full}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.events.byStatus.completed}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.events.byStatus.cancelled}</p>
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">By Fee Type</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Free Events</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.events.byFeeType.free}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Paid Events</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.events.byFeeType.paid}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue & Bookings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Revenue & Bookings
          </h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Revenue</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">${stats.revenue.totalRevenue.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform Fee</span>
                  <p className="text-xs text-gray-500 mt-0.5">{stats.revenue.platformPercentage}% of total</p>
                </div>
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">${stats.revenue.platformFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Earnings</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">${stats.revenue.hostEarnings.toFixed(2)}</span>
              </div>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Bookings</p>
                  <p className="text-xs text-gray-500">Confirmed Payments: {stats.bookings.confirmedPayments}</p>
                </div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.bookings.total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
