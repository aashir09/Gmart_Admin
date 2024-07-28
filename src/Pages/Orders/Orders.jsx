import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error, show error message, etc.
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderNumber) => {
    try {
      // Make sure order status is selected
      if (!selectedOrderStatus) {
        console.error('Please select order status');
        return;
      }

      const response = await axios.put('http://localhost:3000/api/orders/update-order-status', {
        orderNumber: orderNumber,
        orderStatus: selectedOrderStatus,
      });

      console.log('Order status updated:', response.data);
      toast.success(`Order status updated: ${selectedOrderStatus}`);
      // You can update the state or perform any other action after successful update
    } catch (error) {
      console.error('Error updating order status:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div style={{ overflowY: 'scroll', height: '80vh' }}>
         <ToastContainer /> 
      {orders.map((order) => (
        <div key={order._id}>
          <div className="card-body">
            <p className="small text-muted mb-0">Order Number: {order.orderNumber}</p>
            {order.products.map((product) => (
              <div key={product._id} className="row">
                <div className="col-md-2">
                  {/* Use appropriate image URL for the product */}
                  <img src={product.thumbnail} className="img-fluid" alt="Product" />
                </div>
                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p className="text-muted mb-0">{product.name}</p>
                </div>
                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p className="text-muted mb-0 small" style={{ textAlign: 'left' }}>{product.description}</p>
                </div>
                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p className="text-muted mb-0 small">Category: {product.category}</p>
                </div>
                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p className="text-muted mb-0 small">Qty: {product.quantity}</p>
                </div>
                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p className="text-muted mb-0 small">₹{product.total}</p>
                </div>
              </div>
            ))}
            <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: '1' }} />
            <div className="row d-flex align-items-center">
              <div className="col-md-2">
                <p className="text-muted mb-0 small">Order Status</p>
              </div>
              <div className="col-md-6">
                {/* Dropdown button for updating delivery status */}
                <div className="custom-dropdown">
                  <select onChange={(e) => setSelectedOrderStatus(e.target.value)} style={{ borderRadius: '0px' }}>
                    <option disabled selected hidden>Select Status</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button type="submit" onClick={() => handleUpdateStatus(order.orderNumber)} style={{ borderRadius: '0px' }}>Update Status</button>
                </div>
              </div>
              <div className="col-md-4">
                {/* Display delivery fees and total fees */}
                <div className="text-end">
                  <p className="text-muted mb-0 small">Delivery Fees: ₹{order.deliveryFee}</p>
                  <p className="text-muted mb-0 small">Total Fees: ₹{order.totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
