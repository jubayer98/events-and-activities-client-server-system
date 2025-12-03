import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';

export interface AdminStats {
  users: {
    total: number;
    approved: number;
    pending: number;
    byGender: {
      male: number;
      female: number;
      third: number;
    };
    byRole: {
      users: number;
      hosts: number;
    };
  };
  events: {
    total: number;
    approved: number;
    pending: number;
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
    active: number;
    cancelled: number;
    confirmedPayments: number;
  };
  revenue: {
    totalRevenue: number;
    platformCommission: number;
    platformPercentage: number;
    netRevenue: number;
    completedTransactions: number;
  };
  appliedFilters: null | object;
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await adminApi.getDashboardStats();
        if (result.error) {
          setError(result.error);
        } else {
          setStats(result.data as AdminStats);
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
      const result = await adminApi.getDashboardStats();
      if (result.error) {
        setError(result.error);
      } else {
        setStats(result.data as AdminStats);
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
