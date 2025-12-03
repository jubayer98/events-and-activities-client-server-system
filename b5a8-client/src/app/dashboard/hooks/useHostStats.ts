import { useState, useEffect } from 'react';
import { hostApi } from '@/lib/api';

export interface HostStats {
  events: {
    total: number;
    byStatus: {
      open: number;
      full: number;
      completed: number;
      cancelled: number;
    };
    byFeeType: {
      free: number;
      paid: number;
    };
  };
  bookings: {
    total: number;
    confirmedPayments: number;
  };
  revenue: {
    totalRevenue: number;
    platformFee: number;
    platformPercentage: number;
    hostEarnings: number;
  };
}

export function useHostStats() {
  const [stats, setStats] = useState<HostStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await hostApi.getDashboardStats();
        if (result.error) {
          setError(result.error);
        } else {
          setStats(result.data as HostStats);
        }
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Failed to fetch dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await hostApi.getDashboardStats();
      if (result.error) {
        setError(result.error);
      } else {
        setStats(result.data as HostStats);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refetch };
}
