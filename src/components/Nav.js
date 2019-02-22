import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import intl from 'react-intl-universal';

import './../styles/components/Nav.css';

const logo = require('./../assets/saferglobe_logo.png');
const menuIcon = require('./../assets/menu.svg');
const crossIcon = require('./../assets/cross.svg');

class Nav extends Component {
  constructor(props) {
    super(props);

    this.handleMobileMenuClick = this.handleMobileMenuClick.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);

    this.state = {
      mobileMenuOpen: false,
    };
  }

  handleMobileMenuClick() {
    this.setState({
      mobileMenuOpen: !this.state.mobileMenuOpen,
    });
  }

  handleNavClick() {
    this.setState({
      mobileMenuOpen: false,
    });
  }

  render() {
    const { mobileMenuOpen } = this.state;
    const primaryNavClassName = `primary-nav ${mobileMenuOpen &&
      'primary-nav--open'}`;

    const selectedLocale = intl.options.currentLocale;
    window.nav = true;
    return (
      <nav className={primaryNavClassName}>
        <h1>
          <Link to="/" className="logo-link">
            <div className="logo-wrap">
              <img
                src={logo}
                className="logo"
                alt="Logo"
                title="Logo"
                width="160"
              />
            </div>
            <span className="is-light logo-sub-text">
              {intl.get('ARMS_REPORT')}
            </span>
          </Link>
        </h1>

        <ul className="flex-container no-bullets">
          <li>
            <NavLink exact to="/" onClick={this.handleNavClick}>
              {intl.get('DATA')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/articles" onClick={this.handleNavClick}>
              {intl.get('STORIES')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={this.handleNavClick}>
              {intl.get('ABOUT')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/downloads" onClick={this.handleNavClick}>
              {intl.get('DOWNLOADS')}
            </NavLink>
          </li>

          <li className="mobile-lang-selection">
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
          </li>
        </ul>

        <span className="lang-selection">
          <span className="desktop-lang-selection">
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

          <button className="menu-icon" onClick={this.handleMobileMenuClick}>
            <img
              src={mobileMenuOpen ? crossIcon : menuIcon}
              alt={'mobileMenu'}
            />
          </button>
        </span>
      </nav>
    );
  }
}

export default Nav;
