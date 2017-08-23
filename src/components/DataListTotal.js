import React, { Component } from 'react';
import PropTypes from 'prop-types';

import formatEuros from '../utils/formatEuros';

import './../styles/components/DataListTotal.css';

class DataListTotal extends Component {
  render() {
    const { total, defence, civilian } = this.props;

    return (
      <div>
        <div className="data-list-total">
          <div className="data-list-total__value">
            {formatEuros(total)}
          </div>
          <div className="data-list-total__sparkline" />
        </div>
        <div className="top-countries__graphs">
          <div
            className="top-countries__graphs--defence"
            style={{
              width: Math.round(defence / total * 100) + '%',
            }}
          />
          <div
            className="top-countries__graphs--civilian"
            style={{
              width: Math.round(civilian / total * 100) + '%',
            }}
          />
        </div>
      </div>
    );
  }
}

DataListTotal.propTypes = {
  total: PropTypes.number.isRequired,
};

export default DataListTotal;
