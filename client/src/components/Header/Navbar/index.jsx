import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import { useEffect } from 'react';
function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [offset, setOffset] = useState();
  const style =
    offset > 0
      ? { backgroundColor: '#1d69b1e6' }
      : { backgroundColor: 'transparent' };
  function showDesktop() {
    setToggle(false);
  }

  function toggleMenu() {
    setToggle(!toggle);
  }
  const styleMenu = toggle ? { left: 0 } : { left: '-100%' };

  useEffect(() => {
    const onScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return (
    <div className='nav_bar' style={style}>
      <div className='logo'>
        <img src='/images/logo.png' alt='' />
      </div>
      <div className='menu' style={styleMenu}>
        <div className='menu_content'>
          <div className='link'>
            <Link to='/'>Trang chủ</Link>
            <Link to='/movie'>Phim</Link>
            <Link to='/series'>Phim bộ</Link>
          </div>
          <div className='search'>
            <input type='search' name='search' placeholder='Search...' />
          </div>
          <div className='login'>Login</div>
        </div>
        <div className='other' onClick={showDesktop}></div>
      </div>
      <div className='button_menu' onClick={toggleMenu}>
        <i className='fas fa-bars'></i>
      </div>
    </div>
  );
}

export default Navbar;
