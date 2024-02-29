import AuthContext from "../context/AuthContext"

import React, { useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const DashNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/">Your Blog</Link>
      </div>
      <div
        className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
        onClick={handleMenuToggle}
      >
		
        <span></span>
        <span></span>
        <span></span>
		</div>
     
	  <div className="login">
      { user ? 
      (
        <>
        <a onClick={logoutUser} className='btn border-red-400 rounded font-bold hover:cursor-pointer bg-red-500 m-2 py-2 px-6 hover:bg-red-700'>Logout</a>
        <Link to='/dashboard' className='btn border-yellow-400 rounded font-bold bg-yellow-500 m-2 py-2 px-6 hover:bg-yellow-700'>Dashboard</Link>
         
        </>
      ):
			(<Link to="/login" className='btn border-teal-400 rounded font-bold bg-teal-500 m-2 py-2 px-6 hover:bg-teal-700'>Login</Link>)}
	  </div>
    </nav>
  );
};

export default DashNavigation;
