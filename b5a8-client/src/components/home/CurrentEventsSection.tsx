"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EventCard from "./EventCard";
import { eventApi } from "@/lib/api";
import { toast } from "sonner";
import BookingGuideModal from "@/app/events/components/BookingGuideModal";

interface Event {
  _id: string;
  name: string;
  type: string;
  date: string;
  time: string;
  location: string;
  requiredParticipant: {
    min: number;
    max: number;
  };
  currentParticipants: number;
  description: string | null;
  image: string | null;
  feeStatus: "free" | "paid";
  joiningFee: number;
  status: "Open" | "Full" | "Cancelled" | "Completed";
  approvalStatus: boolean;
  host: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export default function CurrentEventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      setIsLoading(true);
      try {
        const result = await eventApi.getAllEvents({
          type: "all",
          feeStatus: "all",
          status: "Open",
          search: "",
          sortBy: "date-asc",
        });

        if (result.error) {
          toast.error(result.error);
          setEvents([]);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const eventsData = (result.data as any)?.events || [];
          // Filter approved events only
          const approvedEvents = eventsData.filter(
            (event: Event) => event.approvalStatus === true
          );
          
          // Sort by createdAt descending (most recent first) and take first 4
          const recentEvents = approvedEvents
            .sort((a: Event, b: Event) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 4);
          
          setEvents(recentEvents);
        }
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  // Transform events to match EventCard's expected format
  const transformedEvents = events.map((event) => ({
    id: event._id,
    title: event.name,
    date: new Date(event.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    location: event.location,
    category: event.type,
    price: event.feeStatus === "free" ? "Free" : `$${event.joiningFee}`,
    image: event.image || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop`,
    attendees: event.currentParticipants,
    status: event.status,
  }));

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Currently Open Events
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join these most recent events happening soon
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/events">View All</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 rounded-xl h-80 animate-pulse"
              ></div>
            ))}
          </div>
        ) : transformedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No open events available at the moment</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transformedEvents.map((event) => (
              <EventCard key={event.id} event={event} onShowGuide={() => setIsModalOpen(true)} />
            ))}
          </div>
        )}

        <BookingGuideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
}
