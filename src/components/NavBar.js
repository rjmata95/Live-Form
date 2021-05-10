import React from "react";
import "./styles/NavBar.css";
import { FaBars } from "react-icons/fa";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="Navbar">
        <div>
          <FaBars />
          <a href="/">
            <h1>Logo</h1>
          </a>
        </div>
        <ul className="Navbar__list">
          <li className="Navbar__item">
            <a href="http://youtube.com">Go to</a>
          </li>
          <li className="Navbar__item">
            <a href="http://youtube.com">About</a>
          </li>
          <li className="Navbar__item">
            <a href="http://youtube.com" target="_blank">
              Contact me
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
