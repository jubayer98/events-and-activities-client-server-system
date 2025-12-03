/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { paymentApi } from "@/lib/api";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string | null;
  amount: number;
  eventName: string | null;
  onPaymentSuccess: () => void;
}

// Card element options
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

function PaymentForm({
  bookingId,
  amount,
  eventName,
  onSuccess,
  onCancel,
}: {
  bookingId: string;
  amount: number;
  eventName: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [cardholderName, setCardholderName] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize payment intent when component mounts
  useEffect(() => {
    if (bookingId && !isInitialized) {
      handleInitiatePayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  const handleInitiatePayment = async () => {
    if (!bookingId) return;

    setIsProcessing(true);
    try {
      const result = await paymentApi.createPaymentIntent(bookingId);

      if (result.error) {
        toast.error(result.error);
      } else {
        const data = result.data as {
          clientSecret: string;
          paymentIntentId: string;
          amount: number;
        };
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
        setIsInitialized(true);
        toast.success("Ready to accept payment");
      }
    } catch (error) {
      toast.error("Failed to initialize payment");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret || !paymentIntentId) {
      toast.error("Payment system not ready");
      return;
    }

    if (!cardholderName.trim()) {
      toast.error("Please enter cardholder name");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card element not found");
      return;
    }

    setIsProcessing(true);

    try {
      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardholderName,
            },
          },
        }
      );

      if (error) {
        toast.error(error.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Confirm payment on backend
        const result = await paymentApi.confirmPayment(
          bookingId,
          paymentIntentId
        );

        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Payment successful!");
          onSuccess();
        }
      } else {
        toast.error("Payment was not completed");
      }
    } catch (error: any) {
      toast.error(error.message || "Payment failed. Please try again.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
        <p className="text-center text-sm text-gray-500">
          Initializing payment...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        {/* Cardholder Name */}
        <div className="space-y-2">
          <Label htmlFor="cardholderName">Cardholder Name *</Label>
          <Input
            id="cardholderName"
            placeholder="John Doe"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
            disabled={isProcessing}
          />
        </div>

        {/* Stripe Card Element */}
        <div className="space-y-2">
          <Label>Card Details *</Label>
          <div className="border rounded-md p-3 bg-white dark:bg-gray-950">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <p className="text-xs text-gray-500">
            Test card: 4242 4242 4242 4242, any future expiry, any CVC
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-green-600 mt-0.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Your payment is secured with Stripe. We never store your card details.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isProcessing || !stripe} className="flex-1">
          {isProcessing ? "Processing..." : `Pay $${amount}`}
        </Button>
      </div>
    </form>
  );
}

export default function PaymentDialog({
  open,
  onOpenChange,
  bookingId,
  amount,
  eventName,
  onPaymentSuccess,
}: PaymentDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSuccess = () => {
    onPaymentSuccess();
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Make Payment</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{eventName}</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
            Amount: ${amount}
          </p>
        </DialogHeader>

        {bookingId && (
          <Elements stripe={stripePromise}>
            <PaymentForm
              bookingId={bookingId}
              amount={amount}
              eventName={eventName || ""}
              onSuccess={handleSuccess}
              onCancel={handleClose}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}
