"use client";

import { Suspense } from "react";
import CommonLayout from "@/components/layouts/CommonLayout";
import EventsHero from "./components/EventsHero";
import { usePublicEvents } from "./hooks/usePublicEvents";
import EventsFilters from "./components/EventsFilters";
import EventsGrid from "./components/EventsGrid";

function EventsContent() {
  const { events, isLoading, filters, updateFilter, resetFilters, totalEvents } =
    usePublicEvents();

  return (
    <>
      <EventsHero totalEvents={totalEvents} />
      
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <EventsFilters
                filters={filters}
                onFilterChange={updateFilter}
                onReset={resetFilters}
              />
            </div>

            {/* Events Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <EventsGridSkeleton />
              ) : (
                <EventsGrid events={events} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function EventsPage() {
  return (
    <CommonLayout>
      <Suspense fallback={<EventsPageSkeleton />}>
        <EventsContent />
      </Suspense>
    </CommonLayout>
  );
}

function EventsGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EventsPageSkeleton() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 animate-pulse">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 bg-white/20 rounded w-1/2 mx-auto mb-4" />
          <div className="h-6 bg-white/20 rounded w-1/3 mx-auto" />
        </div>
      </div>
      
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="h-96 bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
            </div>
            <div className="lg:col-span-3">
              <EventsGridSkeleton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
