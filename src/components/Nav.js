import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

import './../styles/components/Nav.css';

class Nav extends Component {
  render() {
    return (
      <nav className="primary-nav">
        <ul className="flex-container no-bullets">
          <li>
            <h1>
              <Link to="/">
                ARMS Report <span className="is-block is-blue">SaferGlobe</span>
              </Link>
            </h1>
          </li>
          <li>
            <NavLink to="/">Data</NavLink>
          </li>
          <li>
            <NavLink to="/stories">Stories</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/downloads">Downloads</NavLink>
          </li>
          <li className="at-flex-end">
            <span><a href="#">FI</a> | <a href="#">EN</a></span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
