import React, { useState } from 'react';
import axios from 'axios';

const AddPGForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState('');
  const [images, setImages] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/pg/add', {
        name,
        location,
        price,
        amenities: amenities.split(','),
        images: images.split(','),
        description,
      });
      alert('PG added successfully');
    } catch (error) {
      alert('Error adding PG');
    }
  };

  return (
    <div className="auth-modal">
      <h2>Add PG Details</h2>
    <form className="auth-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pg-name">Name</label>
        <input
          id="pg-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="pg-location">Location</label>
        <input
          id="pg-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="pg-price">Price</label>
        <input
          id="pg-price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="pg-amenities">Amenities</label>
        <input
          id="pg-amenities"
          type="text"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
          placeholder="Comma separated"
          required
        />
      </div>
      <div>
        <label htmlFor="pg-images">Images (URLs)</label>
        <input
          id="pg-images"
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          placeholder="Comma separated"
        />
      </div>
      <div>
        <label htmlFor="pg-description">Description</label>
        <textarea
          id="pg-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          height="100"
          width="100"
        />
      </div>
      <button type="submit">Add PG</button>
    </form>
    </div>
  );
};

export default AddPGForm;
