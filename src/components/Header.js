import React from 'react';
import logo from '../images/logo-mesto.svg';

function Header () {
  return (
    <header className="header">
      <img src= {logo} className="header__logo" alt="Логотип"/>
    </header>
  )
}

export default Header