import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  let activeStyle = {
    fontWeight: 'bold',
    color: 'black',
    fontSize: '18px',
  };

  return (
    <nav className="navbar">
      <h1>
        <a href="/">My Blog</a>
      </h1>
      <div>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Home
        </NavLink>

        <NavLink
          to="/blog"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Blog
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
