# Stripe Payment Integration Guide

## Overview
The system now supports Stripe payment integration for paid event bookings. Users can only pay for bookings with `paymentConfirmation: false`, and once payment is confirmed, bookings cannot be deleted.

## Features Implemented

### 1. Booking Model Updates
Added new fields to the Booking model:
- `transactionId`: Stripe charge ID after successful payment
- `paymentIntentId`: Stripe payment intent ID
- `paymentAmount`: Amount paid
- `paymentStatus`: Payment status (pending/completed/failed)
- `paidAt`: Payment completion timestamp

### 2. Payment Endpoints

#### Create Payment Intent
```http
POST /api/payments/create-intent
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "bookingId": "booking_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment intent created successfully",
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxxxxxxxxxxxx",
    "amount": 50.00
  }
}
```

**Validations:**
- User must own the booking
- Booking must not already be paid
- Booking must not be cancelled
- Booking must not be expired
- Event must be a paid event (not free)

#### Confirm Payment
```http
POST /api/payments/confirm
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "bookingId": "booking_id_here",
  "paymentIntentId": "pi_xxxxxxxxxxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment confirmed successfully",
  "data": {
    "booking details with payment confirmation"
  }
}
```

**Updates:**
- Sets `paymentConfirmation: true`
- Sets `paymentStatus: 'completed'`
- Saves `transactionId` and `paidAt` timestamp
- **Prevents booking deletion** once payment is confirmed

#### Get Payment Status
```http
GET /api/payments/status/:bookingId
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bookingId": "...",
    "paymentConfirmation": true,
    "paymentStatus": "completed",
    "paymentAmount": 50.00,
    "transactionId": "ch_xxxxxxxxxxxxx",
    "paymentIntentId": "pi_xxxxxxxxxxxxx",
    "paidAt": "2025-12-01T10:30:00.000Z",
    "event": {
      "name": "Event Name",
      "feeStatus": "paid",
      "joiningFee": 50.00
    }
  }
}
```

#### Stripe Webhook Handler
```http
POST /api/payments/webhook
Stripe-Signature: {stripe_signature}
Content-Type: application/json

{stripe webhook payload}
```

Handles Stripe events:
- `payment_intent.succeeded`: Auto-confirms payment
- `payment_intent.payment_failed`: Updates status to failed

### 3. Booking Deletion Protection

The booking cancellation logic now prevents deletion if payment is confirmed:

```typescript
if (booking.paymentConfirmation) {
  throw new Error('Cannot cancel a booking with confirmed payment');
}
```

**DELETE /api/bookings/:id** will return error if payment is confirmed.

## Setup Instructions

### 1. Get Stripe API Keys

1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your **Secret Key** from Developers > API Keys
3. Get your **Webhook Secret** from Developers > Webhooks

### 2. Configure Environment Variables

Update `.env` file:
```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

### 3. Set Up Webhook Endpoint

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.com/api/payments/webhook`
3. Select events to listen:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the webhook secret to your `.env` file

## Payment Flow

### Frontend Integration

1. **Create Payment Intent**
```javascript
const response = await fetch('/api/payments/create-intent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({ bookingId })
});

const { clientSecret } = await response.json();
```

2. **Use Stripe Elements to Collect Payment**
```javascript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_your_publishable_key');

// In your payment component:
const stripe = useStripe();
const elements = useElements();

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
      billing_details: {
        name: 'User Name',
        email: 'user@example.com',
      },
    },
  });
  
  if (error) {
    console.error(error);
  } else if (paymentIntent.status === 'succeeded') {
    // Confirm payment on backend
    await fetch('/api/payments/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        bookingId,
        paymentIntentId: paymentIntent.id
      })
    });
  }
};
```

## Payment States

| Payment Status | Payment Confirmation | Can Delete? | Description |
|---------------|---------------------|-------------|-------------|
| `pending` | `false` | ✅ Yes | Booking created, awaiting payment |
| `completed` | `true` | ❌ No | Payment successful, booking locked |
| `failed` | `false` | ✅ Yes | Payment failed, can retry or cancel |

## Security Features

1. **User Authorization**: Users can only pay for their own bookings
2. **Webhook Signature Verification**: Validates Stripe webhook signatures
3. **Payment Confirmation Lock**: Prevents booking deletion after payment
4. **Expiry Validation**: Expired bookings cannot be paid
5. **Duplicate Payment Prevention**: Checks if payment already confirmed

## Error Handling

Common errors:
- `Booking not found`: Invalid booking ID
- `You can only pay for your own bookings`: Authorization error
- `Payment has already been confirmed`: Attempting to pay again
- `This booking has been cancelled`: Booking was cancelled
- `This booking has expired`: 30-minute window passed
- `This is a free event, no payment required`: Attempting to pay for free event
- `Cannot cancel a booking with confirmed payment`: Trying to delete paid booking

## Testing

### Test Mode
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires Auth: `4000 0025 0000 3155`

Any future date, any 3-digit CVC

### Webhook Testing
Use Stripe CLI:
```bash
stripe listen --forward-to localhost:4000/api/payments/webhook
stripe trigger payment_intent.succeeded
```

## Notes

- Free events auto-set `paymentConfirmation: true`, no payment required
- Paid events have 30-minute payment window before expiry
- Webhook automatically confirms payments (backup to frontend confirmation)
- Transaction IDs are stored for refund tracking (future feature)
