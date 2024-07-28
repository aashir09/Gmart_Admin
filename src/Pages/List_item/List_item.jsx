import React, { useState, useEffect } from 'react';
import './List_item.css';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const List_item = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Get navigate function from React Router

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove the deleted product from the state
        setProducts(products.filter(product => product._id !== productId));
        toast.success('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
        toast.error('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleEditProduct = (productId) => {
    // Redirect to Add_item component with the product ID as a route parameter
    navigate(`/Edit_item/${productId}`);
  };

  return (
    <section style={{ overflowY: 'scroll', height: '80vh' }}>
       <ToastContainer />
      {products.map((product, index) => (
        <div key={index} className="container py-5" style={{ marginBottom: '100px' }}>
          <div className="row justify-content-center mb-3">
            <div className="col-md-12 col-xl-10">
              <div>
                <div className="card-body" style={{ position: 'absolute', width: '117%', left: '-83px', top: '-30px' }}>
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        <img src={product.thumbnail} className="w-70" alt="Product" />
                        <a href="#!">
                          <div className="hover-overlay">
                            <div className="mask"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6 order">
                      <h5>{product.name}</h5>
                      <div className="mt-1 mb-0 text-muted small">
                        <span>Product id: {product._id}</span><br></br>
                        <span>Rating: {product.rating}</span>
                      </div>
                      <p className="text-truncate mb-4 mb-md-0">{product.description}</p>
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                      <div className="d-flex flex-row align-items-center mb-1">
                        <h4 className="mb-1 me-1">{product.price}</h4>
                        {product.salesPrice && <span className="text-danger"><s>{product.salesPrice}</s></span>}
                      </div>
                      <div className="d-flex flex-column mt-4">
                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm" type="button" onClick={() => handleEditProduct(product._id)}>
                          Edit Product
                        </button>
                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger btn-sm mt-2" type="button" onClick={() => handleDeleteProduct(product._id)}>
                          Delete Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default List_item;
