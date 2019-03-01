import React, { Component } from 'react';
import * as d3 from 'd3';
import formatEuros from '../utils/formatEuros';
import intl from 'react-intl-universal';
import './../styles/components/CountryDetails.css';

class TopFiveCountries extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.section = {
      EN: {
        TotalCountry: 'arms',
        CivilianArmsTotal: 'civilian arms',
        CountryMilatary: 'military material',
      },
      FI: {
        TotalCountry: 'yhteensä aseita',
        CivilianArmsTotal: 'siviiliaseita',
        CountryMilatary: 'sotatuotteita',
      },
    };
    this.finnish = {
      TotalCountry: 'aseiden',
      CivilianArmsTotal: 'siviiliaseiden',
      CountryMilatary: 'sotatuotteiden',
    };
    this.extension = ['', 'nd', 'rd'];
    this.color = {
      CivilianArmsTotal: this.props.civilianColor,
      CountryMilatary: this.props.defenceColor,
    };
  }

  render() {
    this.data.sort((x, y) =>
      d3.descending(
        x.properties.data[this.props.selectedYear][this.props.checked],
        y.properties.data[this.props.selectedYear][this.props.checked],
      ),
    );
    const noOfCountries = this.data.filter(
      d => d.properties.data[this.props.selectedYear][this.props.checked] > 0,
    ).length;
    let text;
    if (this.props.countryData[this.props.checked] > 0) {
      text = (
        <div className="countryText">
          <div>
            In total Finland exported {this.section['EN'][this.props.checked]}{' '}
            worth{' '}
            <span className="bold">{`${formatEuros(this.props.value)}`}</span>{' '}
            to <span className="bold">{`${noOfCountries} countries`}</span>
          </div>
        </div>
      );
    }
    if (this.props.language === 'FI') {
      text = (
        <div className="countryText">
          <div>
            Suomi vei {this.section['FI'][this.props.checked]}{' '}
            <span className="bold">{`${formatEuros(this.props.value)}`}</span>{' '}
            arvosta <span className="bold">{`${noOfCountries} maahan`}</span>
          </div>
        </div>
      );
    }

    let table,
      tableRows = [
        { value: 'CivilianArmsTotal', title: 'CIVILIAN' },
        { value: 'CountryMilatary', title: 'DEFENCE' },
        { value: 'TotalCountry', title: 'TOTAL' },
      ];

    if (this.props.checked === 'CivilianArmsTotal') {
      tableRows = [{ value: 'CivilianArmsTotal', title: 'CIVILIAN' }];
    }
    if (this.props.checked === 'CountryMilatary') {
      tableRows = [{ value: 'CountryMilatary', title: 'DEFENCE' }];
    }

    if (this.props.countryData[this.props.checked] === 0) table = <div />;
    else {
      let rows = tableRows.map((d, i) => {
        return (
          <div className="tableRow" key={i}>
            <div>{intl.get(d.title)}</div>
            <div
              className={`${d.value} bold tableValue`}
              style={{ color: this.color[d.value] }}
            >
              {`${formatEuros(this.props.countryData[d.value])}`}
            </div>
          </div>
        );
      });
      table = <div className="countryTable">{rows}</div>;
    }
    return (
      <div>
        {text}
        {table}
      </div>
    );
  }
}

export default TopFiveCountries;
