/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useCallback } from "react";
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

export interface FilterOptions {
  type: string;
  feeStatus: string;
  status: string;
  search: string;
  sortBy: string;
}

export function useBrowseEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    type: "all",
    feeStatus: "all",
    status: "all",
    search: "",
    sortBy: "date-asc",
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await eventApi.getAllEvents({
        type: filters.type,
        feeStatus: filters.feeStatus,
        status: filters.status,
        search: debouncedSearch,
        sortBy: filters.sortBy,
      });
      if (result.error) {
        toast.error(result.error);
        setEvents([]);
      } else {
        // Get approved events only
        const eventsData = (result.data as any)?.events || [];
        const approvedEvents = eventsData.filter(
          (event: Event) => event.approvalStatus === true
        );
        setEvents(approvedEvents);
      }
    } catch (error) {
      toast.error("Failed to load events");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters.type, filters.feeStatus, filters.status, debouncedSearch, filters.sortBy]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Backend handles filtering and sorting, so just return events
  const filteredAndSortedEvents = useMemo(() => {
    return events;
  }, [events]);

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      type: "all",
      feeStatus: "all",
      status: "all",
      search: "",
      sortBy: "date-asc",
    });
  };

  return {
    events: filteredAndSortedEvents,
    isLoading,
    filters,
    updateFilter,
    resetFilters,
    refetch: fetchEvents,
  };
}
