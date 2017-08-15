import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioButton from './forms/RadioButton';
import intl from 'react-intl-universal';

import './../styles/components/CountryDataList.css';

class DataListTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: 'total',
    };
  }

  handleClick = value => {
    this.props.onClick(value);
  };

  render() {
    return (
      <div>
        <RadioButton
          checked={this.state.checked === 'total'}
          id="total"
          name="countryList"
          value="total"
          label={intl.get('TOTAL')}
          onClick={this.handleClick.bind(this)}
        />
        <RadioButton
          checked={this.state.checked === 'defence'}
          id="defence"
          name="countryList"
          value="defence"
          label={intl.get('DEFENCE')}
          onClick={this.handleClick.bind(this)}
        />
        <RadioButton
          checked={this.state.checked === 'civilian'}
          id="civilian"
          name="countryList"
          value="civilian"
          label={intl.get('CIVILIAN')}
          onClick={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}

DataListTabs.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DataListTabs;
