"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaymentHistory } from "../hooks/usePaymentHistory";

interface PaymentHistoryTableProps {
  payments: PaymentHistory[];
}

export default function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };



  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Payment Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No payment history found
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.bookingId}>
                <TableCell className="font-medium">
                  <div>
                    <div>{payment.event.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Booking ID: {payment.bookingId.slice(-8)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">${payment.paymentAmount}</span>
                </TableCell>
                <TableCell>
                  <Badge className={getPaymentStatusColor(payment.paymentStatus)}>
                    {payment.paymentStatus.charAt(0).toUpperCase() +
                      payment.paymentStatus.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-mono text-xs text-gray-600 dark:text-gray-400">
                      {payment.transactionId}
                    </div>
                    {payment.paymentConfirmation && (
                      <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Confirmed
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>{formatDate(payment.paidAt)}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(payment.paidAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
