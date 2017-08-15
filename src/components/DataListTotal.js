import React, { Component } from 'react';
import PropTypes from 'prop-types';

import formatEuros from '../utils/formatEuros';

import './../styles/components/DataListTotal.css';

class DataListTotal extends Component {
  render() {
    const { total } = this.props;

    return (
      <div className="data-list-total">
        <h4 className="data-list-total__value">
          {formatEuros(total)}
        </h4>
        <div className="data-list-total__sparkline" />
      </div>
    );
  }
}

DataListTotal.propTypes = {
  total: PropTypes.number.isRequired,
};

export default DataListTotal;
