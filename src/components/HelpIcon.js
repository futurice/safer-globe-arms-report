import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './../styles/components/HelpIcon.css';

class HelpIcon extends Component {
  render() {
    return <span className="help" data-target={this.props.target}>?</span>;
  }
}

HelpIcon.defaultProps = {
  target: 'help-text',
};

HelpIcon.propTypes = {
  target: PropTypes.string,
};

export default HelpIcon;
