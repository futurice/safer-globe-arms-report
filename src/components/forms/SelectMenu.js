import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HelpIcon from './../HelpIcon';
import './../../styles/components/forms/SelectMenu.css';

class SelectMenu extends Component {
  render() {
    let helpIcon;
    let defaultOption;

    if (this.props.helpIcon) {
      helpIcon = <HelpIcon id={this.props.id} />;
    }

    if (this.props.defaultOption) {
      defaultOption = <option value="">{this.props.defaultOption}</option>;
    }

    return (
      <div>
        <label htmlFor={this.props.id} className="is-hidden">
          {this.props.label}
          {helpIcon}
        </label>
        <select
          onChange={this.props.onChange}
          className="select-filter"
          id={this.props.id}>
          {defaultOption}

          {this.props.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}

        </select>
      </div>
    );
  }
}

SelectMenu.defaultProps = {
  helpIcon: false,
};

SelectMenu.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helpIcon: PropTypes.bool,
  defaultOption: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default SelectMenu;
