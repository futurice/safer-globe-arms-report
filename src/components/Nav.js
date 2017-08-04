import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import intl from 'react-intl-universal';

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
            <NavLink exact to="/">{intl.get('DATA')}</NavLink>
          </li>
          <li>
            <NavLink to="/stories">{intl.get('STORIES')}</NavLink>
          </li>
          <li>
            <NavLink to="/about">{intl.get('ABOUT')}</NavLink>
          </li>
          <li>
            <NavLink to="/downloads">{intl.get('DOWNLOADS')}</NavLink>
          </li>
          <li className="at-flex-end">
            <span>
              <a href="?lang=fi">FI</a> | <a href="?lang=en-US">EN</a>
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
