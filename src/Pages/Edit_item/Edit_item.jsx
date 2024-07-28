import React, { useState, useEffect } from 'react';
import './Edit_item.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Edit_item = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    salesPrice: '',
    rating: 4,
    thumbnail: '',
    images: [],
    description: ''
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Failed to fetch product data');
        }
      } catch (error) {
        console.error('Failed to fetch product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      if (!token) {
        console.error('No token found in local storage');
        return;
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Product updated successfully');
        toast.success('Product updated successfully');
        navigate(`/Dashboard`);
      } else {
        console.error('Failed to update product');
        toast.error('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <div className="add-item-container">
      <ToastContainer />
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

export default Edit_item;
