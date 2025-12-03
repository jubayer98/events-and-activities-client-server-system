"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { eventApi } from "@/lib/api";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  profileImage: string | null;
  bio?: string;
  interests?: string[];
  location?: string;
  fullName: string;
  id: string;
}

interface Booking {
  _id: string;
  user: User;
  event: string;
  bookingStatus: boolean;
  paymentConfirmation: boolean;
  bookingExpiry: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface BookingStats {
  totalBookings: number;
  activeBookings: number;
  confirmedPayments: number;
  pendingPayments: number;
}

interface Participant {
  bookingId: string;
  user: {
    fullName: string;
    email: string;
    profileImage: string | null;
    bio?: string;
    gender: string;
    location?: string;
    interests?: string[];
  };
  paymentConfirmation: boolean;
  bookingDate: string;
}

interface ParticipantsData {
  eventDetails: {
    name: string;
    date: string;
    currentParticipants: number;
    maxParticipants: number;
  };
  stats: {
    totalParticipants: number;
    paidParticipants: number;
    unpaidParticipants: number;
  };
  participants: Participant[];
}

interface EventBookingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string | null;
  eventName: string | null;
}

export default function EventBookingsDialog({
  open,
  onOpenChange,
  eventId,
  eventName,
}: EventBookingsDialogProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [participants, setParticipants] = useState<ParticipantsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && eventId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, eventId]);

  const fetchData = async () => {
    if (!eventId) return;

    setIsLoading(true);
    try {
      const [bookingsRes, statsRes, participantsRes] = await Promise.all([
        eventApi.getEventBookings(eventId),
        eventApi.getEventBookingStats(eventId),
        eventApi.getEventParticipants(eventId),
      ]);

      if (bookingsRes.error || statsRes.error || participantsRes.error) {
        toast.error("Failed to load event data");
      } else {
        const bookingsData = (bookingsRes.data as { bookings?: Booking[] })?.bookings || [];
        const statsData = (statsRes.data as { stats?: BookingStats })?.stats || null;
        const participantsData = participantsRes.data as ParticipantsData;

        setBookings(bookingsData);
        setStats(statsData);
        setParticipants(participantsData);
      }
    } catch (error) {
      toast.error("An error occurred while fetching data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Event Bookings & Participants</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{eventName}</p>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Overview */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Active Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stats.activeBookings}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Confirmed Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.confirmedPayments}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Pending Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-yellow-600">
                      {stats.pendingPayments}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tabs */}
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bookings">All Bookings</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No bookings yet
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[150px]">User</TableHead>
                          <TableHead className="min-w-[200px]">Email</TableHead>
                          <TableHead className="min-w-[150px]">Location</TableHead>
                          <TableHead className="min-w-[120px]">Payment</TableHead>
                          <TableHead className="min-w-[100px]">Status</TableHead>
                          <TableHead className="min-w-[120px]">Booked On</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking._id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                  {booking.user.profileImage ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={booking.user.profileImage}
                                      alt={booking.user.fullName}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm font-semibold text-gray-600">
                                      {booking.user.fullName.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                <span>{booking.user.fullName}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[200px] truncate" title={booking.user.email}>
                                {booking.user.email}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[150px] truncate" title={booking.user.location || "N/A"}>
                                {booking.user.location || "N/A"}
                              </div>
                            </TableCell>
                            <TableCell>
                              {booking.paymentConfirmation ? (
                                <Badge className="bg-green-500 whitespace-nowrap">Confirmed</Badge>
                              ) : (
                                <Badge variant="secondary" className="whitespace-nowrap capitalize">
                                  {booking.paymentStatus}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {booking.bookingStatus ? (
                                <Badge className="bg-blue-500 whitespace-nowrap">Active</Badge>
                              ) : (
                                <Badge variant="destructive" className="whitespace-nowrap">Inactive</Badge>
                              )}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {formatDate(booking.createdAt)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              {/* Participants Tab */}
              <TabsContent value="participants" className="space-y-4">
                {participants && (
                  <>
                    {/* Event Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Event Details</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Event Date</p>
                          <p className="font-semibold">
                            {formatDate(participants.eventDetails.date)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Participants</p>
                          <p className="font-semibold">
                            {participants.eventDetails.currentParticipants}/
                            {participants.eventDetails.maxParticipants}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Paid</p>
                          <p className="font-semibold text-green-600">
                            {participants.stats.paidParticipants}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Unpaid</p>
                          <p className="font-semibold text-yellow-600">
                            {participants.stats.unpaidParticipants}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Participants List */}
                    {participants.participants.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No participants yet
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {participants.participants.map((participant) => (
                          <Card key={participant.bookingId}>
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                      {participant.user.profileImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                          src={participant.user.profileImage}
                                          alt={participant.user.fullName}
                                          className="w-12 h-12 rounded-full object-cover"
                                        />
                                      ) : (
                                        <span className="text-xl font-semibold text-gray-600">
                                          {participant.user.fullName.charAt(0)}
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-lg">
                                        {participant.user.fullName}
                                      </h4>
                                      <p className="text-sm text-gray-500">
                                        {participant.user.email}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    {participant.user.bio && (
                                      <div>
                                        <p className="text-gray-600">Bio</p>
                                        <p className="font-medium">{participant.user.bio}</p>
                                      </div>
                                    )}
                                    <div>
                                      <p className="text-gray-600">Gender</p>
                                      <p className="font-medium">{participant.user.gender}</p>
                                    </div>
                                    {participant.user.location && (
                                      <div>
                                        <p className="text-gray-600">Location</p>
                                        <p className="font-medium">
                                          {participant.user.location}
                                        </p>
                                      </div>
                                    )}
                                    <div>
                                      <p className="text-gray-600">Booked On</p>
                                      <p className="font-medium">
                                        {formatDate(participant.bookingDate)}
                                      </p>
                                    </div>
                                    {participant.user.interests &&
                                      participant.user.interests.length > 0 && (
                                        <div className="col-span-full">
                                          <p className="text-gray-600 mb-2">Interests</p>
                                          <div className="flex flex-wrap gap-2">
                                            {participant.user.interests.map((interest) => (
                                              <Badge key={interest} variant="secondary">
                                                {interest}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                </div>

                                <div>
                                  {participant.paymentConfirmation ? (
                                    <Badge className="bg-green-500">Paid</Badge>
                                  ) : (
                                    <Badge variant="secondary">Unpaid</Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
