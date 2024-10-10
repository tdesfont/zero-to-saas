// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import HoverableButton from './Components/HoverableButton';


const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><span style={{fontSize: 30}}>🩺 MediLake</span></li>
          <li><Link to="/">Nos offres</Link></li>
          <li><Link to="/about">Pourquoi MediLake ?</Link></li>
          <li><Link to="/services">Resources</Link></li>
          <li><Link to="/contact">A propos de MediLake</Link></li>
          <li><HoverableButton></HoverableButton></li>
          <li><Link to="/login">Me connecter</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
