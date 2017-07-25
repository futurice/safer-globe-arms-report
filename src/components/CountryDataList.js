import React, {Component} from 'react';
import Button from './Button';

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
    return (
      <ul className="country-data-list no-bullets">
        <li className="has-spacer">
          <span className="is-block">
            <span className="is-strong">Total:</span> 29,5M€
          </span>
          <span className="is-block">
            <span className="is-strong">Ranking:</span> 3rd
          </span>
        </li>
        <li className="has-spacer">
          <span className="is-block">
            <span className="is-strong">Defence:</span> 2,2M€
          </span>
          <span className="is-block">
            <span className="is-strong">Ranking:</span> 26th
          </span>
        </li>
        <li className="has-spacer">
          <span className="is-block">
            <span className="is-strong">Civilian:</span> 27,3M€
          </span>
          <span className="is-block">
            <span className="is-strong">Ranking:</span> 1st
          </span>
        </li>
        <li>
          <Button text="Download Data" type="primary" />
        </li>
      </ul>
    );
  }
}

export default CountryDataList;
