import React, { Component } from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import Divider from 'material-ui/Divider';

import DataListTabs from './DataListTabs';
import DataListTotal from './DataListTotal';
import formatEuros from '../utils/formatEuros';

import './../styles/components/CountryDataList.css';
import './../styles/components/TopFiveCountries.css';

const styles = {
  divider: {
    margin: '10px -1rem 16px -1rem',
    clear: 'both',
  },
};

class TopFiveCountries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'total',
    };
  }

  handleTabClick(value) {
    this.setState({ selected: value });
  }

  render() {
    const { countries, totals } = this.props;
    const baseNum = countries.length ? countries[0].Total : 0;
    const total = totals[this.state.selected].value;

    return (
      <div>
        <div className="country-data-list__title">
          {intl.get('FINNISH_ARMS_EXPORT')}
        </div>
        <DataListTabs onClick={this.handleTabClick.bind(this)} />
        <Divider style={styles.divider} />
        <h3 className="CountryName">
          {totals.name}
        </h3>
        <DataListTotal
          total={total}
          civilian={totals.civilian.value}
          defence={totals.defence.value}
        />
        <Divider style={styles.divider} />
        <div className="top-countries">
          <h3>
            {intl.get('TOP5COUNTRIES')}
          </h3>
          {countries.map((data, i) =>
            <div key={i} className="top-countries__country">
              <div className="top-countries__name">
                <span className="top-countries__name--wrapper">
                  <span>
                    {i + 1}
                  </span>
                  {data.Countries}
                </span>
                <span className="top-countries__name--sum">
                  {formatEuros(data.Total)}
                </span>
              </div>
              <div className="top-countries__graphs">
                <div
                  className="top-countries__graphs--defence"
                  style={{
                    width:
                      Math.round(data.Defence_Materiel / baseNum * 100) + '%',
                  }}
                />
                <div
                  className="top-countries__graphs--civilian"
                  style={{
                    width: Math.round(data.Civilian_Arms / baseNum * 100) + '%',
                  }}
                />
              </div>
            </div>,
          )}
        </div>
      </div>
    );
  }
}

TopFiveCountries.propTypes = {
  countries: PropTypes.array.isRequired,
  totals: PropTypes.object.isRequired,
};

export default TopFiveCountries;
