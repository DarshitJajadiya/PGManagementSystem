import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, amount } = location.state;

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    const response = await axios.post('http://localhost:5000/api/payments/order', { amount });
    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: response.data.amount,
      currency: 'INR',
      name: 'Vidyashram PG',
      description: 'PG Booking Payment',
      order_id: response.data.id,
      handler: function (paymentResponse) {
        alert('Payment successful!');
        navigate('/booking-confirmation', { state: { bookingId } });
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
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
