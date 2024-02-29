import AuthContext from "../context/AuthContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBurger } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openNav = () =>  {
    let sidenav = document.getElementById('Sidenav');
    sidenav.style.width = "33.33%";
    sidenav.style.zIndex = "3";
    // document.body.style.marginLeft = "33.33%";
  
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  const closeNav = () => {
    let sidenav = document.getElementById('Sidenav');
    sidenav.style.zIndex = -1;
    sidenav.style.width = "0";
    // document.body.style.marginLeft = "0";
  
    document.body.style.backgroundColor = "white";
  }
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let { user, logoutUser } = useContext(AuthContext)
  return (
    <>
      <div id="Sidenav" className="sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
        <a href="/">About</a>
        <a href="/">Services</a>
        <a href="/">Clients</a>
        <a href="/">Contact</a>
        {user ?
              (
                <>
                <Link to='/dashboard' className='btn border-yellow-400 rounded font-bold bg-yellow-500 m-2 py-2 px-6 hover:bg-yellow-700'>Dashboard</Link>
                <span onClick={logoutUser} className='btn border-red-400 rounded font-bold hover:cursor-pointer cursor-pointer bg-red-500 m-2 py-2 px-6 hover:bg-red-700'>Logout</span>
                  

                </>
              ) :
              (<Link to="/login" className='btn border-teal-400 rounded font-bold bg-teal-500 m-2 py-2 px-6 hover:bg-teal-700'>Login</Link>)}
      </div>
      <header>
        <nav>
          <div className="brand">
            <h1>Brand</h1>
          </div>
          <div id="navigation">
            

            <span onClick={openNav} className="hamburger">
              <span  id="hamburger-link">
                {/* <div className="bar"></div>
                <div className="bar1"></div>
                <div className="bar2"></div> */}
                {/* <i className="fa-light fa-burger"></i> */}
                <FontAwesomeIcon icon={faBurger} />
              </span>
            </span>
            <div className="nav-links">
              <ul>
                <li><a href="/">About</a></li>
                <li><a href="/">Trainings</a></li>
                <li><a href="/">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="login">
            {user ?
              (
                <>
                <span onClick={logoutUser} className='btn border-red-400 rounded font-bold hover:cursor-pointer bg-red-500 m-2 py-2 px-6 hover:bg-red-700'>Logout</span>
                  <Link to='/dashboard' className='btn border-yellow-400 rounded font-bold bg-yellow-500 m-2 py-2 px-6 hover:bg-yellow-700'>Dashboard</Link>

                </>
              ) :
              (<Link to="/login" className='btn border-teal-400 rounded font-bold bg-teal-500 m-2 py-2 px-6 hover:bg-teal-700'>Login</Link>)}
          </div>
        </nav>
      </header>
    </>
    // <nav className="navigation">
    //   <div className="logo">
    //     <Link to="/">Your Blog</Link>
    //   </div>
    //   <div
    //     className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
    // C   onClick={handleMenuToggle}
    //   >

    //     <span></span>
    //     <span></span>
    //     <span></span>
    // </div>
    //   <ul className={`menu ${isMenuOpen ? 'open' : ''} nav-links`}>
    //     <li className='hover:border-b-amber-400 hover:border-b-4 translate-x-2 transition-all'>
    //       <Link  to="/">Home</Link>
    //     </li>
    //     <li className='hover:border-b-amber-400 hover:border-b-4 translate-x-2 transition-all'>
    //       <Link to="/about">About</Link>
    //     </li>
    //     <li className='hover:border-b-amber-400 hover:border-b-4 translate-x-2 transition-all'>
    //       <Link to="/blog">Blog</Link>
    //     </li>
    //     <li className='hover:border-b-amber-400 hover:border-b-4 translate-x-2 transition-all'>
    //       <Link to="/contact">Contact</Link>
    //     </li>
    //   </ul>
    // <div className="login">
    //   { user ? 
    //   (
    //   <>
    //   <a onClick={logoutUser} className='btn border-red-400 rounded font-bold hover:cursor-pointer bg-red-500 m-2 py-2 px-6 hover:bg-red-700'>Logout</a>
    //   <Link to='/dashboard' className='btn border-yellow-400 rounded font-bold bg-yellow-500 m-2 py-2 px-6 hover:bg-yellow-700'>Dashboard</Link>

    //   </>
    //    ):
    // 	(<Link to="/login" className='btn border-teal-400 rounded font-bold bg-teal-500 m-2 py-2 px-6 hover:bg-teal-700'>Login</Link>)}
    // </div>
    // </nav>
  );
};

export default Navigation;
