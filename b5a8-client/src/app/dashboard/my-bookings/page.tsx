"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import MyBookingsHeader from "./components/MyBookingsHeader";
import BookingsTable from "./components/BookingsTable";
import { useMyBookings } from "./hooks/useMyBookings";

export default function MyBookingsPage() {
  const { confirmedBookings, pendingBookings, isLoading, refetch } =
    useMyBookings();

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
        <MyBookingsHeader />

        <Tabs defaultValue="confirmed" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="confirmed">
              Confirmed Bookings ({confirmedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending Payment ({pendingBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="confirmed">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bookings with confirmed payment
                  </p>
                </div>
                <BookingsTable
                  bookings={confirmedBookings}
                  showCancelButton={false}
                  onBookingUpdated={refetch}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bookings awaiting payment confirmation
                  </p>
                </div>
                <BookingsTable
                  bookings={pendingBookings}
                  showCancelButton={true}
                  onBookingUpdated={refetch}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
