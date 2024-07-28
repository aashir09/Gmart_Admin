import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activePage, onPageChange }) => {
  return (
    <div className='Left_sidebar'>
      <div className='side_menu'>
        <div className={`menu_1 ${activePage === 1 ? 'active' : ''}`} onClick={() => onPageChange(1)}>
          <img src="./assets/add.svg" className='Menu_logo' alt='Add Item'/>
          <h5>Add Item</h5>
        </div>
        <div className={`menu_2 ${activePage === 2 ? 'active' : ''}`} onClick={() => onPageChange(2)}>
          <img src="./assets/list.svg" className='Menu_logo' alt='List Order'/>
          <h5>Product List</h5>
        </div>
        <div className={`menu_3 ${activePage === 3 ? 'active' : ''}`} onClick={() => onPageChange(3)}>
          <img src="./assets/order.svg" className='Menu_logo' alt='Orders'/>
          <h5>Orders</h5>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
