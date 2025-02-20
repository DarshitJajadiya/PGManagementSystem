import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, amount } = location.state || {};

  const handlePayment = async () => {
    try {
      // Step 1: Create Payment Order
      const response = await fetch('http://localhost:5000/api/payments/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, bookingId }),
      });

      const data = await response.json();
      console.log(data);

      if (data.id) {
        // Step 2: Confirm Payment and Update Booking Status
        const confirmResponse = await fetch('http://localhost:5000/api/payments/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId }),
        });

        const confirmData = await confirmResponse.json();
        
        if (confirmData.success) {
          alert('Payment successful! Your PG booking is now confirmed.');
          navigate('/booking-confirmation', { state: { bookingId } });
        } else {
          alert('Payment was processed, but booking update failed.');
        }
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment failed due to a server issue.');
    }
  };

  return (
    <div>
      <h2>Complete Your Payment</h2>
      <p>Amount: ₹{amount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default PaymentPage;
