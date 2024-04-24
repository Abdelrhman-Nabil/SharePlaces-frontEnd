import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth.context';

import './navLink.scss';

const NavLinks = props => {
  const {isLoggedIn,logOut,userId}=useContext(AuthContext)
  return <ul className="nav-links">
    <li><NavLink to="/" exact>ALL USERS</NavLink></li>
    {  isLoggedIn && <li><NavLink to={'/'+ userId + '/places'}>MY PLACES</NavLink> </li>}
    {  isLoggedIn && <li><NavLink to="/places/new">ADD PLACE</NavLink></li>}
    {!isLoggedIn && <li><NavLink to="/auth">AUTHENTICATE</NavLink></li>}
    {isLoggedIn && <li><NavLink onClick={logOut} to={"/"}>Log Out</NavLink></li>}
  </ul>
};

export default NavLinks;