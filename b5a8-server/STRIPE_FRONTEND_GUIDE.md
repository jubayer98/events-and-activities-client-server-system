# Stripe.js Frontend Integration Guide

## Installation

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## 1. Stripe Provider Setup (App.jsx or App.tsx)

```javascript
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Replace with your Stripe Publishable Key
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <YourApp />
    </Elements>
  );
}

export default App;
```

## 2. Payment Component

Create `PaymentForm.jsx`:

```javascript
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function PaymentForm({ bookingId, amount, eventName, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Step 1: Create payment intent
      const intentResponse = await fetch('http://localhost:4000/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ bookingId }),
      });

      const intentData = await intentResponse.json();

      if (!intentData.success) {
        throw new Error(intentData.message || 'Failed to create payment intent');
      }

      const { clientSecret, paymentIntentId } = intentData.data;

      // Step 2: Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: 'Customer Name', // You can get this from user input
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Step 3: Confirm payment on your backend
        const confirmResponse = await fetch('http://localhost:4000/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            bookingId,
            paymentIntentId: paymentIntent.id,
          }),
        });

        const confirmData = await confirmResponse.json();

        if (confirmData.success) {
          setSucceeded(true);
          setProcessing(false);
          if (onSuccess) onSuccess(confirmData.data);
        } else {
          throw new Error(confirmData.message || 'Payment confirmation failed');
        }
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h3>Payment for: {eventName}</h3>
      <p>Amount: ${amount}</p>

      <div className="card-element">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      {error && <div className="error-message">{error}</div>}

      {succeeded && (
        <div className="success-message">
          Payment succeeded! Your booking is confirmed.
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className="pay-button"
      >
        {processing ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
}

export default PaymentForm;
```

## 3. Usage Example

```javascript
import PaymentForm from './PaymentForm';

function EventBooking({ booking }) {
  const handlePaymentSuccess = (confirmedBooking) => {
    console.log('Payment successful!', confirmedBooking);
    // Redirect to success page or update UI
    window.location.href = '/bookings/success';
  };

  return (
    <div className="booking-container">
      {!booking.paymentConfirmation && booking.event.feeStatus === 'paid' && (
        <PaymentForm
          bookingId={booking._id}
          amount={booking.event.joiningFee}
          eventName={booking.event.name}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default EventBooking;
```

## 4. Styling (Optional CSS)

```css
.payment-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.card-element {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 20px 0;
  background: white;
}

.pay-button {
  width: 100%;
  padding: 12px;
  background: #5469d4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.pay-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #fa755a;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background: #ffebee;
}

.success-message {
  color: #4caf50;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background: #e8f5e9;
}
```

## 5. Test Cards

Use these test cards during development:

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Success |
| 4000 0025 0000 3155 | Requires 3D Secure authentication |
| 4000 0000 0000 9995 | Declined - insufficient funds |
| 4000 0000 0000 0002 | Declined - card declined |

- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

## 6. Environment Variables

Create `.env` file in your React app:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
REACT_APP_API_URL=http://localhost:4000/api
```

Then use it:

```javascript
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
```

## 7. Complete Flow

1. User books an event → Gets `bookingId`
2. If paid event, show `PaymentForm` component
3. User enters card details (test card: 4242 4242 4242 4242)
4. Click "Pay" button:
   - Creates payment intent via `/api/payments/create-intent`
   - Stripe.js confirms payment with card details
   - Backend confirms via `/api/payments/confirm`
   - Booking updated with `paymentConfirmation: true`
5. Success! User can now view confirmed booking

## 8. Get Stripe Publishable Key

1. Go to https://dashboard.stripe.com/
2. Click **Developers** → **API keys**
3. Copy the **Publishable key** (starts with `pk_test_...`)
4. Use it in `loadStripe('pk_test_...')`

**Note**: The publishable key is safe to use in frontend code (it's meant to be public).

## 9. TypeScript Version (Optional)

If using TypeScript, create `PaymentForm.tsx`:

```typescript
import React, { useState, FormEvent } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  eventName: string;
  onSuccess?: (data: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  bookingId, 
  amount, 
  eventName, 
  onSuccess 
}) => {
  // ... rest of the component (same as JavaScript version)
};

export default PaymentForm;
```

## Troubleshooting

**Error: "Stripe.js has not loaded"**
- Make sure you wrapped your app in `<Elements stripe={stripePromise}>`

**Error: "CORS policy"**
- Add CORS configuration in your backend (already configured in your Express app)

**Error: "Payment has not been completed"**
- Make sure you're calling `/confirm` AFTER Stripe.js confirms the payment

**Error: "Invalid API key"**
- Check your Stripe keys in `.env` file
- Make sure you're using the correct publishable key (pk_test_...)
