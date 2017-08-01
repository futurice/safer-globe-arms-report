import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RadioButton from './forms/RadioButton';
// import Button from './Button';

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
*/

class CountryDataList extends Component {
  render() {
    const {country} = this.props;
    return (
      <div>
        <h3>{country.name}</h3>
        <RadioButton
          checked={true}
          id="total"
          name="countryList"
          value="total"
          label="total"
        />
        <RadioButton
          id="defence"
          name="countryList"
          value="defence"
          label="defence"
        />
        <RadioButton
          id="civilian"
          name="countryList"
          value="civilian"
          label="civilian"
        />
        <ul className="country-data-list no-bullets">
          <li className="has-spacer">
            <div id="totalSparkLine">
              <span className="is-block">
                <span className="is-strong">Total:</span> {country.total.value}
              </span>
              <span className="is-block">
                <span className="is-strong">Ranking:</span> {country.total.rank}
              </span>
            </div>
          </li>
          <li className="has-spacer">
            <div id="defenceSparkLine">
              <span className="is-block">
                <span className="is-strong">Defence:</span>
                {country.defence.value}
              </span>
              <span className="is-block">
                <span className="is-strong">Ranking:</span>
                {country.defence.rank}
              </span>
            </div>
          </li>
          <li className="has-spacer">
            <div id="civilianSparkLine">
              <span className="is-block">
                <span className="is-strong">Civilian:</span>
                {country.civilian.value}
              </span>
              <span className="is-block">
                <span className="is-strong">Ranking:</span>
                {country.civilian.rank}
              </span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

CountryDataList.propTypes = {
  country: PropTypes.object.isRequired,
};

export default CountryDataList;
