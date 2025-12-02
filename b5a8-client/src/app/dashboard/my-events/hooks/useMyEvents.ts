/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { eventApi } from "@/lib/api";
import { toast } from "sonner";

export interface MyEvent {
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

export function useMyEvents() {
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const result = await eventApi.getMyEvents();
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

  return {
    events,
    isLoading,
    refetch: fetchEvents,
  };
}
