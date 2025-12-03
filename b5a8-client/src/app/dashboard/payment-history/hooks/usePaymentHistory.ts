import { useState, useEffect } from 'react';
import { paymentApi } from '@/lib/api';

export interface PaymentHistory {
  bookingId: string;
  paymentConfirmation: boolean;
  paymentStatus: string;
  paymentAmount: number;
  transactionId: string;
  paymentIntentId: string;
  paidAt: string;
  event: {
    name: string;
    feeStatus: string;
    joiningFee: number;
  };
}

export function usePaymentHistory(bookingIds: string[]) {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (bookingIds.length === 0) {
        setPayments([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          bookingIds.map(async (bookingId) => {
            try {
              const result = await paymentApi.getPaymentStatus(bookingId);
              if (result.error) {
                console.error(`Error fetching payment for ${bookingId}:`, result.error);
                return null;
              }
              return result.data as PaymentHistory;
            } catch (err) {
              console.error(`Error fetching payment for ${bookingId}:`, err);
              return null;
            }
          })
        );

        const validPayments = results.filter((p): p is PaymentHistory => p !== null);
        setPayments(validPayments);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Failed to fetch payment history');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingIds.length, bookingIds.join(',')]);

  const refetch = async () => {
    if (bookingIds.length === 0) {
      setPayments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        bookingIds.map(async (bookingId) => {
          try {
            const result = await paymentApi.getPaymentStatus(bookingId);
            if (result.error) {
              console.error(`Error fetching payment for ${bookingId}:`, result.error);
              return null;
            }
            return result.data as PaymentHistory;
          } catch (err) {
            console.error(`Error fetching payment for ${bookingId}:`, err);
            return null;
          }
        })
      );

      const validPayments = results.filter((p): p is PaymentHistory => p !== null);
      setPayments(validPayments);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch payment history');
    } finally {
      setLoading(false);
    }
  };

  return { payments, loading, error, refetch };
}
