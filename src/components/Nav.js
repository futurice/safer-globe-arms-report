import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import intl from 'react-intl-universal';

import './../styles/components/Nav.css';

class Nav extends Component {
  render() {
    const selectedLocale = intl.options.currentLocale;

    return (
      <nav className="primary-nav">
        <h1>
          <Link to="/">
            <span className="is-strong logo-text">SaferGlobe</span>
            <span className="is-light logo-sub-text">Arms Report</span>
          </Link>
        </h1>
        <ul className="flex-container no-bullets">
          <li>
            <NavLink exact to="/">
              {intl.get('DATA')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/stories">
              {intl.get('STORIES')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              {intl.get('ABOUT')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/downloads">
              {intl.get('DOWNLOADS')}
            </NavLink>
          </li>
        </ul>
        <span className="lang-selection">
          <a
            href="?lang=fi"
            className={selectedLocale.includes('fi') ? 'selected' : null}
          >
            FI
          </a>{' '}
          |
          <a
            href="?lang=en-US"
            className={selectedLocale.includes('en') ? 'selected' : null}
          >
            EN
          </a>
        </span>
      </nav>
    );
  }
}

export default Nav;
