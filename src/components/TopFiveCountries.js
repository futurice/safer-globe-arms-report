import React, { Component } from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import Divider from 'material-ui/Divider';

import DataListTabs from './DataListTabs';
import DataListTotal from './DataListTotal';
import formatEuros from '../utils/formatEuros';

import './../styles/components/CountryDataList.css';
import './../styles/components/TopFiveCountries.css';

class TopFiveCountries extends Component {
  render() {
    const { countries, totals, year } = this.props;
    const baseNum = countries.length ? countries[0].Total : 0;
    const total = totals[this.props.activeTab].value;

    return (
      <div>
        <div className="country-data-list__title">
          {intl.get('FINNISH_ARMS_EXPORT')}
        </div>
        <DataListTabs onClick={this.props.selectTab} />
        <Divider className="divider" />
        <DataListTotal
          year={year}
          name={totals.name}
          total={total}
          civilian={totals.civilian.value}
          defence={totals.defence.value}
        />
        <div className="time-series-graph" />
        <Divider className="divider" />
        <div className="top-countries">
          <div className="top-countries__title">
            {intl.get('TOP5COUNTRIES')}
          </div>
          {countries.map((data, i) =>
            <div key={i} className="top-countries__country">
              <div className="top-countries__name">
                <span className="top-countries__name--wrapper">
                  <span>
                    {i + 1}
                  </span>
                  <span>
                    {data.Countries}
                  </span>
                </span>
                <span className="top-countries__name--sum">
                  {formatEuros(data.Total)}
                </span>
              </div>
              <div className="top-countries__graphs">
                <div
                  className="top-countries__graphs--civilian"
                  id={'top-countries__graphs--civilian' + (i + 1)}
                  style={{
                    width: Math.round(data.Civilian_Arms / baseNum * 100) + '%',
                  }}
                />
                <div
                  className="top-countries__graphs--defence"
                  id={'top-countries__graphs--defence' + (i + 1)}
                  style={{
                    width:
                      Math.round(data.Defence_Materiel / baseNum * 100) + '%',
                  }}
                />
              </div>
            </div>,
          )}
        </div>
        <div
          className="country-bullet-point"
          style={{
            display: 'none',
          }}
        >
          <div className="country-rank">
            {'Rank - 0'}
          </div>
          <div className="key-points">
            {'Hello World'}
          </div>
        </div>
      </div>
    );
  }
}

TopFiveCountries.propTypes = {
  countries: PropTypes.array.isRequired,
  totals: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
  selectTab: PropTypes.func.isRequired,
};

export default TopFiveCountries;
