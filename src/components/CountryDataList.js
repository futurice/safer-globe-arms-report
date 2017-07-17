import React, {Component} from 'react';
import Button from './Button';

import './../styles/components/CountryDataList.css';

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
