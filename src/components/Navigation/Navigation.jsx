import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink
        to='/'
        className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
        end
      >
        Home
      </NavLink>
      <NavLink
        to='/movies'
        className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
