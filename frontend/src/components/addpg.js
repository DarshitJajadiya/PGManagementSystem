import React, { useState } from 'react';
import axios from 'axios';

const AddPGForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState('');
  const [images, setImages] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState([]);
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); 
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if(name==='' || location==='' || price==='' || amenities==='' || images.length===0 || description===''){ 
      alert('Please fill all the fields');
      return;
    } 
    formData.append('name', name);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('amenities', amenities.split(','));
    formData.append('description', description);
    images.forEach((image) => formData.append('images', image)); 

    try {
      const response = await axios.post('http://localhost:5000/api/pg/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
          <label htmlFor="pg-images">Images</label>
          <input
            id="pg-images"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            multiple // Allow multiple file selection
            required
          />
        </div>
        <div className="image-preview-container">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              style={{ width: '100px', height: '100px', margin: '5px' }}
            />
          ))}
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
