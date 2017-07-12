import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

import './../styles/components.nav.css';

class Nav extends Component {
  render() {
    return (
      <nav className='primary-nav'>
        <ul className='flex-container'>
          <li>
            <h1>
              <Link to="/">ARMS Report
                <span className='is-block'>SaferGlobe</span>
              </Link>
            </h1>
          </li>
          <li>
            <NavLink to="/data">Data</NavLink>
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
          <li>
            <span>FI | EN</span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
