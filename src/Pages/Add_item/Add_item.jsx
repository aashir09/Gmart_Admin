import React, { useState } from 'react';
import './Add_item.css';
import { toast } from 'react-toastify'; //

const Add_item = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    salesPrice: '',
    rating: 4, // Assuming rating is always 4
    thumbnail: '',
    images: [],
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImage = () => {
    if (formData.images.length < 4) {
      setFormData({ ...formData, images: [...formData.images, ''] });
    } else {
      alert('You can only add a maximum of 4 images.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // Make sure token exists
      if (!token) {
        console.error('No token found in local storage');
        // Handle the absence of token here if needed
        return;
      }

      // Set headers with the token
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Create request data object
      const requestData = {
        ...formData
      };

      // Make POST request to the API endpoint with raw data and headers using Fetch API
      const response = await fetch('http://localhost:3000/api/products/create', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
      });

      // Check if request was successful
      if (response.ok) {
        console.log('Product added successfully');
        toast.success('Product added successfully');
        // Clear form data after successful submission
        setFormData({
          name: '',
          price: '',
          category: '',
          salesPrice: '',
          rating: 4,
          thumbnail: '',
          images: [],
          description: ''
        });
      } else {
        console.error('Failed to add product');
        toast.error('An unexpected error occurred. Please try again.');
        // Handle error messages if needed
      }
    } catch (error) {
      console.error(error); // Log any errors
      // Handle error messages if needed
    }
  };

  return (
    <div className="add-item-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="salesPrice">Sales Price:</label>
          <input type="number" id="salesPrice" name="salesPrice" value={formData.salesPrice} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail URL:</label>
          <input type="text" id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="images">Image URLs:</label>
          {formData.images.map((image, index) => (
            <div key={index} className="image-input-row">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
            </div>
          ))}
          {formData.images.length < 4 && (
            <button type="button" onClick={handleAddImage}>Add Image</button>
          )}
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Add_item;
