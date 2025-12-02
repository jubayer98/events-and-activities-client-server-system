/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { eventApi } from "@/lib/api";
import { toast } from "sonner";

export interface Event {
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

export function useEventControl() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const result = await eventApi.getAllEvents();
      if (result.error) {
        toast.error(result.error);
        setEvents([]);
      } else {
        // Handle nested response structure: data.events
        const eventsData = (result.data as any)?.events || [];
        setEvents(eventsData);
      }
    } catch (error) {
      toast.error("Failed to load events");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const approvedEvents = events.filter((event) => event.approvalStatus);
  const pendingEvents = events.filter((event) => !event.approvalStatus);

  const openEvents = approvedEvents.filter((event) => event.status === "Open");
  const fullEvents = approvedEvents.filter((event) => event.status === "Full");
  const cancelledEvents = approvedEvents.filter(
    (event) => event.status === "Cancelled"
  );
  const completedEvents = approvedEvents.filter(
    (event) => event.status === "Completed"
  );

  return {
    events,
    approvedEvents,
    pendingEvents,
    openEvents,
    fullEvents,
    cancelledEvents,
    completedEvents,
    isLoading,
    refetch: fetchEvents,
  };
}
