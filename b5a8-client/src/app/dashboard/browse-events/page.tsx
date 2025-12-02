"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import BrowseEventsHeader from "./components/BrowseEventsHeader";
import EventFilters from "./components/EventFilters";
import BrowseEventsTable from "./components/BrowseEventsTable";
import { useBrowseEvents } from "./hooks/useBrowseEvents";

export default function BrowseEventsPage() {
  const { events, isLoading, filters, updateFilter, resetFilters, refetch } =
    useBrowseEvents();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BrowseEventsHeader onRefresh={refetch} isRefreshing={isLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <EventFilters
              filters={filters}
              onFilterChange={updateFilter}
              onReset={resetFilters}
            />
          </div>

          {/* Events Table */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {events.length} event{events.length !== 1 && "s"}
                  </p>
                </div>
                <BrowseEventsTable events={events} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
