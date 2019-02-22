import React, { Component } from 'react';
import { descending } from 'd3-array';
import formatEuros from '../utils/formatEuros';
import './../styles/components/CountryDetails.css';
import Divider from 'material-ui/Divider';

class TopFiveCountries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.countryData,
    };
    this.section = {
      TotalCountry: 'total arms',
      CivilianArmsTotal: 'civilian arms',
      CountryMilatary: 'military arms',
    };
    this.finnish = {
      TotalCountry: 'aseiden',
      CivilianArmsTotal: 'siviiliaseiden',
      CountryMilatary: 'sotatuotteiden',
    };
    this.title = {
      FI: 'Maat, joissa tehtävät suoritettiin',
      EN: 'Countries where missions took place',
    };
    this.extension = ['', 'nd', 'rd'];
  }

  render() {
    let data = this.props.operations.data[this.props.selectedYear];
    data.Countries.sort((x, y) => descending(x.value, y.value));

    let text;
    if (data[this.props.checked] > 0) {
      text = (
        <div className="countryText">
          <div>
            <span className="bold">{`${
              this.props.selectedCountryName['EN']
            }`}</span>{' '}
            imported{' '}
            <span className="bold">{`${formatEuros(
              data[this.props.checked],
            )}`}</span>{' '}
            worth of {this.section[this.props.checked]} from Finland in{' '}
            <span className="bold">{`${this.props.selectedYear}`}</span>
          </div>
        </div>
      );
    } else
      text = (
        <div className="countryText">
          <span className="bold">{`${
            this.props.selectedCountryName['EN']
          }`}</span>{' '}
          did not import any {this.section[this.props.checked]} from Finland in{' '}
          <span className="bold">{this.props.selectedYear}</span>
        </div>
      );
    if (this.props.language === 'FI') {
      if (data[this.props.checked] > 0) {
        text = (
          <div className="countryText">
            <div>
              <span className="bold">{`${
                this.props.selectedCountryName['FI']
              }`}</span>{' '}
              imported{' '}
              <span className="bold">{`${formatEuros(
                data[this.props.checked],
              )}`}</span>{' '}
              worth of {this.section[this.props.checked]} from Finland in{' '}
              <span className="bold">{`${this.props.selectedYear}`}</span>
            </div>
          </div>
        );
      } else
        text = (
          <div className="countryText">
            <span className="bold">{`${
              this.props.selectedCountryName['FI']
            }`}</span>{' '}
            did not import any {this.section[this.props.checked]} from Finland
            in <span className="bold">{this.props.selectedYear}</span>
          </div>
        );
    }

    let list = data.Countries.map((d, i) => {
      if (this.props.checked === 'CivilianArmsTotal') return null;
      else
        return (
          <div key={i} className="top-countries__country">
            <div className="top-countries__name">
              <span className="top-countries__name--wrapper">
                <div className={'top-countries__name'}>
                  {`${i + 1}  ${d.CountryName[this.props.language]}`}
                </div>
              </span>
              <span className={'top-countries__name--sum'}>
                {formatEuros(d.value)}
              </span>
            </div>
            <div className="top-countries__graphs">
              <div
                className="top-countries__graphs--civilian"
                style={{
                  width: `0%`,
                  backgroundColor: this.props.civilianColor,
                }}
              />
              <div
                className="top-countries__graphs--defence"
                style={{
                  width: `${(d.value * 100) / data.TotalCountry}%`,
                  backgroundColor: this.props.defenceColor,
                }}
              />
            </div>
          </div>
        );
    });
    return (
      <div>
        <div className={'titleIntl'}>
          {text}
          <Divider className="divider" />
          {this.title[this.props.language]}
        </div>
        {list}
      </div>
    );
  }
}

export default TopFiveCountries;
