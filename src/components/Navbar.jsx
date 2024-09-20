import React, { useContext, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopingContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const toggleMenu = () => setVisible((prev) => !prev);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-36' alt='Logo' /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {['/', '/collection', '/about', '/contact'].map((path, index) => {
          const label = path === '/' ? 'HOME' : path.toUpperCase().slice(1);
          return (
            <li key={index} className='relative'>
              <NavLink
                to={path}
                className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-black' : ''}`}
              >
                <p>{label}</p>
              </NavLink>
              {location.pathname === path && (
                <hr className='absolute left-1/2 transform -translate-x-1/2 w-1/2 h-[1.5px] bg-black' />
              )}
            </li>
          );
        })}
      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt='Search Icon' />
        <div className='relative group'>
          <img src={assets.profile_icon} className='w-5 cursor-pointer' alt='Profile Icon' />
          <div className='absolute right-0 pt-4 hidden group-hover:block'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <Link to='/login' className='cursor-pointer hover:text-black'>My Profile</Link>
              <Link to='/orders' className='cursor-pointer hover:text-black'>Orders</Link>
              <Link to='/logout' className='cursor-pointer hover:text-black'>Logout</Link>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart Icon' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-700 text-white rounded-full text-sm'>10</p>
        </Link>
        <img onClick={toggleMenu} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='Menu Icon' />
      </div>
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className={`flex flex-col items-center pt-20 space-y-4 ${visible ? 'block' : 'hidden'}`}>
          {['/', '/collection', '/about', '/contact'].map((path, index) => {
            const label = path === '/' ? 'HOME' : path.toUpperCase().slice(1);
            return (
              <NavLink
                key={index}
                to={path}
                onClick={() => setVisible(false)} // Close menu on link click
                className='text-gray-700 hover:text-black'
              >
                {label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
