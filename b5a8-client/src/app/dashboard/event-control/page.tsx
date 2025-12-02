"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import RouteGuard from "@/components/RouteGuard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import EventControlHeader from "./components/EventControlHeader";
import EventsTable from "./components/EventsTable";
import { useEventControl } from "./hooks/useEventControl";

export default function EventControlPage() {
  const {
    openEvents,
    fullEvents,
    cancelledEvents,
    completedEvents,
    pendingEvents,
    isLoading,
    refetch,
  } = useEventControl();

  if (isLoading) {
    return (
      <RouteGuard allowedRoles={["admin"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </DashboardLayout>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard allowedRoles={["admin"]}>
      <DashboardLayout>
      <div className="space-y-6">
        <EventControlHeader />

        <Tabs defaultValue="open" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="open">
              Open ({openEvents.length})
            </TabsTrigger>
            <TabsTrigger value="full">
              Full ({fullEvents.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledEvents.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="open">
            <Card>
              <CardContent className="p-6">
                <EventsTable events={openEvents} onEventUpdated={refetch} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="full">
            <Card>
              <CardContent className="p-6">
                <EventsTable events={fullEvents} onEventUpdated={refetch} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cancelled">
            <Card>
              <CardContent className="p-6">
                <EventsTable events={cancelledEvents} onEventUpdated={refetch} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardContent className="p-6">
                <EventsTable events={completedEvents} onEventUpdated={refetch} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardContent className="p-6">
                <EventsTable
                  events={pendingEvents}
                  onEventUpdated={refetch}
                  showApproveAction={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  </RouteGuard>
  );
}
