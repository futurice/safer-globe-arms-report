import React, { Component } from 'react';
import PropTypes from 'prop-types';

import formatEuros from '../utils/formatEuros';

import './../styles/components/DataListTotal.css';

class DataListTotal extends Component {
  render() {
    const { total, defence, civilian, year, name } = this.props;

    return (
      <div>
        <div className="flex-container-row">
          <div className="data-list-total__year">
            {year}
          </div>
          <div className="data-list-total__sparkline" />
        </div>

        <div className="flex-container-row">
          <div className="data-list-total__name">
            {name}
          </div>
          <div className="data-list-total__value">
            {formatEuros(total)}
          </div>
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
  year: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  defence: PropTypes.number.isRequired,
  civilian: PropTypes.number.isRequired,
};

export default DataListTotal;
