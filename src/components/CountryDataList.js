import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import intl from 'react-intl-universal';
import { NavLink } from 'react-router-dom';

import DataListTabs from './DataListTabs';
import DataListTotal from './DataListTotal';

import './../styles/components/CountryDataList.css';

/*
  This component is used to build and dispay the selected country's stats (the left column) on the data page

  The information is currently hardcoded bewcause I am not sure how we plan on selecting a country.
  I don't feel this data should only exist behind a roll over.

  This component could be easily modularized and re-usable by doing the following:

  Whenever calling this component, pass it a prop called 'country' which can be an object that looks like this:

  country = {
    name: 'United States of America',
    total: {
      value: 29.5M€,
      rank: '1st'
    },
    defence: {
      value: 29.5M€,
      rank: '2nd'
    },
    civilian: {
      value: 29.5M€,
      rank: '1st'
    }
  }

§Then those values could be dropped into this component by using {this.props.country.total.value} instead of where 29,5M€ is hardcoded below


let country = {
  'name': 'United States of America',
  'total': {
    'value': '29.5M€',
    'rank': '1st'
  },
  'defence': {
    'value': '29.5M€',
    'rank': '2nd'
  },
  'civilian': {
    'value': '29.5M€',
    'rank': '1st'
  }
}
*/

class CountryDataList extends Component {
  renderRemakrs() {
    if (!this.props.country.comments || !this.props.country.comments.length) {
      return null;
    }

    return (
      <div className="remarks">
        <div className="remarks-title">
          {intl.get('REMARKS')}
        </div>

        <ul>
          {this.props.country.comments.map((com, i) => {
            return this.props.activeTab === 'total' ||
            this.props.activeTab === com.type
              ? <li key={i}>
                  {com.text}
                </li>
              : null;
          })}
        </ul>
      </div>
    );
  }

  render() {
    const { country, year } = this.props;

    return (
      <div className="flex-container-column">
        <h1>
          <span className="is-strong">Finnish Arms Export</span>
        </h1>
        <DataListTabs onClick={this.props.selectTab} />
        <Divider className="divider" />
        <DataListTotal
          name={country.name}
          year={year}
          total={country.total.value}
          civilian={country.civilian.value}
          defence={country.defence.value}
        />
        <Divider className="divider" />

        {this.renderRemakrs()}

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
  activeTab: PropTypes.string.isRequired,
  selectTab: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
};

export default CountryDataList;
