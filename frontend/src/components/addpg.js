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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Location</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Amenities</label>
        <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} placeholder="Comma separated" required />
      </div>
      <div>
        <label>Images (URLs)</label>
        <input type="text" value={images} onChange={(e) => setImages(e.target.value)} placeholder="Comma separated" />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Add PG</button>
    </form>
  );
};

export default AddPGForm;
