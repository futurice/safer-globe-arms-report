import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from './../HelpIcon';
import './../../styles/components/forms/RadioButton.css';

class RadioButton extends Component {
  render() {
    let helpIcon;
    if (this.props.helpIcon) {
      helpIcon = <HelpIcon id={this.props.id} />;
    }

    return (
      <div>
        <input
          type="radio"
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          defaultChecked={this.props.checked}
        />
        <label
          htmlFor={this.props.id}
          onClick={() => this.props.onClick(this.props.value)}
        >
          {this.props.label}
          {helpIcon}
        </label>
      </div>
    );
  }
}

RadioButton.defaultProps = {
  checked: PropTypes.boolean,
  helpIcon: false,
  onClick: PropTypes.func.isRequired,
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  helpIcon: PropTypes.bool,
};

export default RadioButton;
