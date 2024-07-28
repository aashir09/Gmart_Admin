import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Header from '../Header/Header';
import Add_item from '../../Pages/Add_item/Add_item';
import List_item from '../../Pages/List_item/List_item';
import Orders from '../../Pages/Orders/Orders';
import './Dashboard.css'
const Dashboard = () => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className='struct'>
        <Sidebar activePage={activePage} onPageChange={handlePageChange} />
      <div className='Header_main'>
            <Header />  
            <div className="content">
                {activePage === 1 && <Add_item />}
                {activePage === 2 && <List_item />}
                {activePage === 3 && <Orders />}

            </div> 
        </div>
    </div>
  );
}

export default Dashboard;
