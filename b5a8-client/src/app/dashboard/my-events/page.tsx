"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import RouteGuard from "@/components/RouteGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreateEventDialog from "@/components/CreateEventDialog";
import MyEventsTable from "./components/MyEventsTable";
import { useMyEvents } from "./hooks/useMyEvents";

export default function MyEventsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { events, isLoading, refetch } = useMyEvents();

  if (isLoading) {
    return (
      <RouteGuard allowedRoles={["host"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </DashboardLayout>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard allowedRoles={["host"]}>
      <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Events</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your events and track their performance
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Event
          </Button>
        </div>

        {/* Events Table or Empty State */}
        {events.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-lg font-semibold mb-2">No events yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Get started by creating your first event
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  Create Your First Event
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Your Events ({events.length})
                </h2>
              </div>
              <MyEventsTable events={events} onEventUpdated={refetch} />
            </CardContent>
          </Card>
        )}

        {/* Create Event Dialog */}
        <CreateEventDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onEventCreated={() => {
            refetch();
          }}
        />
      </div>
    </DashboardLayout>
      </RouteGuard>
    );
  }
