import React from 'react' 
import logo from '../images/logo.svg'
import { NavLink, useLocation } from 'react-router-dom'; 


function Header() { 

  let location = useLocation();
  return (
    <header className="header root__header">
      <img
        className="header__logo"
        src={logo}
        alt="логотип Mesto"
      />
      {location.pathname ==='/sign-up' ? <NavLink to="/sign-in" className="header__info">Войти</NavLink> : <NavLink to="/sign-up" className="header__info">Регистрация</NavLink> }
      
    
    </header>
  )
}

export default Header