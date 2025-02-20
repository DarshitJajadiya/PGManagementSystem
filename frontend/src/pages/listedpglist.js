const PGList = ({ data }) => {
    return data.length > 0 ? (
      <div className="pg-list">
        {data.map((pg) => (
          <div key={pg._id} className="pg-card">
            {pg.images?.length > 0 && (
              <img src={`http://localhost:5000/uploads/${pg.images[0]}`} alt={pg.name} className="pg-image" />
            )}
            <h3>{pg.name}</h3>
            <p><strong>Location:</strong> {pg.location}</p>
            <p><strong>Price:</strong> ₹{pg.price}</p>
            <p><strong>Amenities:</strong> {pg.amenities?.join(', ')}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="no-pg-message">No PGs found.</p>
    );
  };

  export default PGList;