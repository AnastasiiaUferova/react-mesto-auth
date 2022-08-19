import React from "react";
import logo from "../images/logo.svg";
import { NavLink, useLocation } from "react-router-dom";

function Header(props) {
    let { email } = props.userData;

    let location = useLocation();

    return (
        <header className="header root__header">
            <img className="header__logo" src={logo} alt="logo Mesto" />

            {location.pathname === "/sign-up" && (
                <NavLink to="/sign-in" className="header__info">
                    Login
                </NavLink>
            )}
            {location.pathname === "/sign-in" && (
                <NavLink to="/sign-up" className="header__info">
                    Register
                </NavLink>
            )}
            {location.pathname === "/" && (
                <div className="header__info-container">
                    <p className="header__email">{email}</p>
                    <button onClick={props.signOut} className="header__info header__info_sign-out">
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;