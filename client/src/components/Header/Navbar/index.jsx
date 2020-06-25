import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
function Navbar() {
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src='./images/logo.png' alt='' />
      </div>
      <div className='navbar__link'>
        <Link to='/'>Trang chủ</Link>
        <Link to='/movie'>Phim</Link>
      </div>
      <div className='navbar__optimal'>
        <i className='fas fa-search'></i>
      </div>
    </div>
  );
}

export default Navbar;
