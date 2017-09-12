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
            <span className="is-strong">
              {intl.get('ARMS_REPORT')}
            </span>
            <span className="is-light"> | SaferGlobe</span>
          </Link>
        </h1>
      </nav>
    );
  }
}

export default Nav;
