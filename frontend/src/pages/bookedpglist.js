import { useNavigate } from 'react-router-dom';

const BookedPGList = ({ data, onDelete }) => {
    const navigate = useNavigate();

    const handlePayment = (booking) => {
        navigate('/payment', { state: { bookingId: booking._id, amount: booking.pgsId.price } });
    };

    const calculateExpiryDate = (bookingDate, duration) => {
        if (!bookingDate || !duration) return "N/A";
        const startDate = new Date(bookingDate);
        startDate.setMonth(startDate.getMonth() + duration);
        return startDate.toLocaleDateString();
    };

    if (!Array.isArray(data)) {
        return <p className="no-pg-message">No PGs booked.</p>;
    }

    return data.length > 0 ? (
        <div className="pg-list">
            {data.map((booking) => (
                <div key={booking._id} className="pg-card">
                    {booking.pgsId?.images?.length > 0 && (
                        <img src={`http://localhost:5000/uploads/${booking.pgsId.images[0]}`} alt={booking.pgsId.name} className="pg-image" />
                    )}
                    <h3>{booking.pgsId.name}</h3>
                    <p><strong>Location:</strong> {booking.pgsId.location}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                    <p><strong>Expiry Date:</strong> {calculateExpiryDate(booking.checkInDate, booking.duration)}</p>

                    <button className="delete-btn" onClick={() => onDelete && onDelete(booking._id)}>Cancel Booking</button>
                </div>
            ))}
        </div>
    ) : <p className="no-pg-message">No PGs booked.</p>;
};

export default BookedPGList;
