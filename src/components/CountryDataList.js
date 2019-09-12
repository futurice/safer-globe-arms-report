import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import intl from 'react-intl-universal';
import { NavLink } from 'react-router-dom';

import DataListTabs from './DataListTabs';

import './../styles/components/CountryDataList.css';

class CountryDataList extends Component {
  tabChange = value => {};
  render() {
    const { country } = this.props;

    return (
      <div>
        <h1>
          <span className="is-strong">Finnish Arms Export</span>
        </h1>
        <DataListTabs />
        <Divider className="divider" />
        <Divider className="divider" />
        <div className="remarks">{intl.get('REMARKS')}</div>
        <ul>
          <li />
        </ul>

        <div className="all-country-articles">
          <NavLink to={`stories/?country=${country.name}`}>
            {intl.get('ALL_COUNTRY_ARTICLES', { countryName: country.name })}
          </NavLink>
        </div>
      </div>
    );
  }
}

CountryDataList.propTypes = {
  country: PropTypes.object.isRequired,
  topFive: PropTypes.array.isRequired,
};

export default CountryDataList;
