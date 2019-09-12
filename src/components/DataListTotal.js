import React, { Component } from 'react';
//import TopCountryList from './TopCountryList'
//import AreaGraph from './AreaGraph';
import formatEuros from '../utils/formatEuros';

import './../styles/components/DataListTotal.css';

class DataListTotal extends Component {
  render() {
    const { total, defence, civilian, year, name } = this.props;
    return (
      <div>
        <div className="flex-container-row">
          <div className="data-list-total__year">{year}</div>
        </div>

        <div className="flex-container-row">
          <div className="data-list-total__name">{name}</div>
          <div
            className="data-list-total__value"
            style={{
              color: this.props.totalColor,
            }}
          >
            {formatEuros(total)}
          </div>
        </div>

        <div className="top-countries__graphs">
          <div
            className="top-countries__graphs--civilian"
            style={{
              width: Math.round((civilian / total) * 100) + '%',
              backgroundColor: this.props.civilianColor,
            }}
          />
          <div
            className="top-countries__graphs--defence"
            style={{
              width: Math.round((defence / total) * 100) + '%',
              backgroundColor: this.props.defenceColor,
            }}
          />
        </div>
      </div>
    );
  }
}

export default DataListTotal;
