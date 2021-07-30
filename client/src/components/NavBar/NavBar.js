import React from "react";
import "./style.css";
import { FaBars } from "react-icons/fa";

class NavBar extends React.Component {
  state = {
    menuIsOpen: false,
  };

  toggle = () => {
    this.setState((state) => ({ menuIsOpen: ~state.menuIsOpen }));
  };

  render() {
    return (
      <nav className="Navbar">
        <div className="Navbar__logo">
          <a href="/">
            <h1>Logo</h1>
          </a>
        </div>
        <ul
          onClick={this.toggle}
          className={` Navbar__list ${this.state.menuIsOpen && "active"}`}
        >
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
        <FaBars
          className={
            this.state.menuIsOpen
              ? "Navbar__MobileIcon active"
              : "Navbar__MobileIcon"
          }
          onClick={this.toggle}
        />
      </nav>
    );
  }
}

export default NavBar;
