import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, amount } = location.state || {};

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
      alert('Please fill in all card details');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/payments/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, bookingId }),
      });

      const data = await response.json();

      if (data.id) {
        const confirmResponse = await fetch('http://localhost:5000/api/payments/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId }),
        });

        const confirmData = await confirmResponse.json();

        if (confirmData.success) {
          alert('Payment successful! Your PG booking is now confirmed.');
          navigate('/booking-confirmation', { state: { bookingId }, replace: true });
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
    <div className="payment-container">
      <h2 className="payment-title">Complete Your Payment</h2>
      <p className="payment-amount">Amount: ₹{amount}</p>

      <div className="payment-form">
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={cardDetails.cardNumber}
          onChange={handleChange}
          className="payment-input"
        />
        <input
          type="text"
          name="expiry"
          placeholder="Expiry (MM/YY)"
          value={cardDetails.expiry}
          onChange={handleChange}
          className="payment-input"
        />
        <input
          type="password"
          name="cvv"
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={handleChange}
          className="payment-input"
        />
      </div>

      <button onClick={handlePayment} className="payment-button">Pay Now</button>
    </div>
  );
}

export default PaymentPage;
