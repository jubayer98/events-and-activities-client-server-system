import { useState, useEffect, useMemo } from 'react';
import { eventApi } from '@/lib/api';

export interface EventEarnings {
  event: {
    id: string;
    name: string;
    type: string;
    date: string;
    feeStatus: string;
    joiningFee: number;
  };
  bookingStats: {
    totalBookings: number;
    confirmedPayments: number;
    pendingPayments: number;
  };
  earnings: {
    totalRevenue: number;
    platformFee: number;
    platformPercentage: number;
    hostEarnings: number;
  };
}

export function useMyEarnings(eventIds: string[]) {
  const [earnings, setEarnings] = useState<EventEarnings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create a stable key for dependency tracking
  const eventIdsKey = useMemo(() => eventIds.join(','), [eventIds]);

  useEffect(() => {
    const fetchEarnings = async () => {
      if (eventIds.length === 0) {
        setEarnings([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          eventIds.map(async (eventId) => {
            try {
              const result = await eventApi.getEventEarnings(eventId);
              if (result.error) {
                console.error(`Error fetching earnings for ${eventId}:`, result.error);
                return null;
              }
              return result.data as EventEarnings;
            } catch (err) {
              console.error(`Error fetching earnings for ${eventId}:`, err);
              return null;
            }
          })
        );

        const validEarnings = results.filter((e): e is EventEarnings => e !== null);
        setEarnings(validEarnings);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Failed to fetch earnings');
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventIdsKey]);

  const refetch = async () => {
    if (eventIds.length === 0) {
      setEarnings([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        eventIds.map(async (eventId) => {
          try {
            const result = await eventApi.getEventEarnings(eventId);
            if (result.error) {
              console.error(`Error fetching earnings for ${eventId}:`, result.error);
              return null;
            }
            return result.data as EventEarnings;
          } catch (err) {
            console.error(`Error fetching earnings for ${eventId}:`, err);
            return null;
          }
        })
      );

      const validEarnings = results.filter((e): e is EventEarnings => e !== null);
      setEarnings(validEarnings);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch earnings');
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const totalEarnings = earnings.reduce((sum, e) => sum + e.earnings.hostEarnings, 0);
  const totalRevenue = earnings.reduce((sum, e) => sum + e.earnings.totalRevenue, 0);
  const totalPlatformFee = earnings.reduce((sum, e) => sum + e.earnings.platformFee, 0);
  const totalBookings = earnings.reduce((sum, e) => sum + e.bookingStats.totalBookings, 0);
  const totalConfirmedPayments = earnings.reduce((sum, e) => sum + e.bookingStats.confirmedPayments, 0);

  return { 
    earnings, 
    loading, 
    error, 
    refetch,
    totals: {
      totalEarnings,
      totalRevenue,
      totalPlatformFee,
      totalBookings,
      totalConfirmedPayments
    }
  };
}
