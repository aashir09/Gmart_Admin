import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='Top_Header'>
      <div className='Left_header'>
        <img src='/assets/logo.png' className='Logo_img'/>
        <h6>Admin Panel</h6>
      </div>
      <div className='Right_header'>
        <img src='./assets/profile.png' className='Admin_logo'/>
      </div>
      </div>
  )
}

export default Header