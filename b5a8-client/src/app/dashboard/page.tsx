"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminStats } from "./hooks/useAdminStats";

export default function DashboardPage() {
  const { user } = useAuth();
  const { stats, loading, error } = useAdminStats();

  // Show admin dashboard for admin users
  if (user?.role === "admin") {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Complete overview of platform statistics and performance
            </p>
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
          ) : stats ? (
            <>
              {/* Main Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90 font-medium">Total Users</p>
                      <p className="text-3xl font-bold">{stats.users.total}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm opacity-90 pt-3 border-t border-white/20">
                    <span>Approved: {stats.users.approved}</span>
                    <span>Pending: {stats.users.pending}</span>
                  </div>
                </div>

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
                    <span>Approved: {stats.events.approved}</span>
                    <span>Pending: {stats.events.pending}</span>
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
                  <div className="flex items-center justify-between text-sm opacity-90 pt-3 border-t border-white/20">
                    <span>Active: {stats.bookings.active}</span>
                    <span>Cancelled: {stats.bookings.cancelled}</span>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90 font-medium">Platform Revenue</p>
                      <p className="text-3xl font-bold">${stats.revenue.platformCommission.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm opacity-90 pt-3 border-t border-white/20">
                    <span>Total: ${stats.revenue.totalRevenue}</span>
                    <span>{stats.revenue.platformPercentage}% fee</span>
                  </div>
                </div>
              </div>

              {/* Detailed Stats Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Users Breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Users Analytics
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">By Role</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Regular Users</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.users.byRole.users}</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hosts</p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.users.byRole.hosts}</p>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">By Gender</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-1">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.users.byGender.male}</p>
                          </div>
                          <p className="text-xs text-gray-500">Male</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-1">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.users.byGender.female}</p>
                          </div>
                          <p className="text-xs text-gray-500">Female</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-1">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.users.byGender.third}</p>
                          </div>
                          <p className="text-xs text-gray-500">Other</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Events Breakdown */}
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

                {/* Bookings & Payments */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Bookings Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.bookings.total}</p>
                        <p className="text-xs text-gray-500 mt-1">Total</p>
                      </div>
                      <div className="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.bookings.active}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active</p>
                      </div>
                      <div className="text-center bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.bookings.cancelled}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cancelled</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmed Payments</p>
                          <p className="text-xs text-gray-500">Successfully processed transactions</p>
                        </div>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.bookings.confirmedPayments}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Revenue Breakdown
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Revenue</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">${stats.revenue.totalRevenue.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform Commission</span>
                          <p className="text-xs text-gray-500 mt-0.5">{stats.revenue.platformPercentage}% of total</p>
                        </div>
                        <span className="text-xl font-bold text-orange-600 dark:text-orange-400">${stats.revenue.platformCommission.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Net Revenue to Hosts</span>
                        <span className="text-xl font-bold text-green-600 dark:text-green-400">${stats.revenue.netRevenue.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Completed Transactions</span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">{stats.revenue.completedTransactions}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </DashboardLayout>
    );
  }

  // Default dashboard for non-admin users
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here&apos;s what&apos;s happening with your events today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Events
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  24
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  356
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  $12,543
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Events
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  12
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No recent activity to display.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
