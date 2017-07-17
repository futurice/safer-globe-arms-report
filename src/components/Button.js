import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './../styles/components/Button.css';
import './../styles/icons.css';

/*
 Extract out the SVG portion into an SVG component library
 <SVG type="download" />
*/

class Button extends Component {
  render() {
    return (
      <a href="#" className={`btn ${this.props.type}`}>
        <svg
          className="icon icon-file-download"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <title>Download</title>
          <desc>Icon for downloading data</desc>
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
        <span>{this.props.text}</span>
      </a>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
