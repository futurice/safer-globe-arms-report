import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import intl from 'react-intl-universal';

import './../styles/components/Nav.css';

const logo = require('./../assets/saferglobe_logo.png');

class Nav extends Component {
  render() {
    const selectedLocale = intl.options.currentLocale;
    window.nav = true;
    return (
      <nav className="primary-nav">
        <h1>
          <Link to="/">
            <img
              src={logo}
              className="logo"
              alt="Logo"
              title="Logo"
              width="160"
            />
            <span className="is-light logo-sub-text">
              {intl.get('ARMS_REPORT')}
            </span>
          </Link>
        </h1>
        <ul className="flex-container no-bullets">
          <li>
            <NavLink exact to="/">
              {intl.get('DATA')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/articles/">{intl.get('STORIES')}</NavLink>
          </li>
          <li>
            <NavLink to="/about/">{intl.get('ABOUT')}</NavLink>
          </li>
          <li>
            <NavLink to="/downloads/">{intl.get('DOWNLOADS')}</NavLink>
          </li>
        </ul>
        <span className="lang-selection">
          <a
            href="?lang=fi"
            id="FI"
            className={selectedLocale.includes('fi') ? 'selected' : null}
          >
            FI
          </a>{' '}
          |
          <a
            href="?lang=en-US"
            id="EN"
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
