import React, { Component } from 'react';
import { descending } from 'd3-array';
import formatEuros from '../utils/formatEuros';
import Divider from 'material-ui/Divider';
import intl from 'react-intl-universal';
import './../styles/components/CountryDetails.css';
import * as d3 from 'd3';
import ArticleList from './ArticleList';

class TopFiveCountries extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
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
    this.extension = ['', 'nd', 'rd'];
    this.color = {
      CivilianArmsTotal: this.props.civilianColor,
      CountryMilatary: this.props.defenceColor,
    };
  }

  render() {
    this.data.sort((x, y) =>
      descending(
        x.properties.data[this.props.selectedYear][this.props.checked],
        y.properties.data[this.props.selectedYear][this.props.checked],
      ),
    );
    let countryList = this.data.map(d => d.properties.name);
    let value = countryList.indexOf(this.props.selectedCountry);
    let percent = (
      (this.props.countryData[this.props.checked] * 100) /
      this.props.worldData
    ).toFixed(2);
    let text;
    if (this.props.countryData[this.props.checked] > 0) {
      let ext = value > 2 ? 'th' : this.extension[value];
      text =
        value > 0 ? (
          <div className="countryText">
            <div>
              <span className="bold">{`${
                this.props.selectedCountryName['EN']
              }`}</span>{' '}
              imported{' '}
              <span className="bold">{`${formatEuros(this.props.value)}`}</span>{' '}
              worth of {this.section[this.props.checked]} from Finland (
              <span className="bold">{`${percent}%`}</span> of all Finnish{' '}
              {this.section[this.props.checked]} arms export) in{' '}
              <span className="bold">{`${this.props.selectedYear}`}</span>
            </div>
            <br />
            <div>
              <span className="bold">{`${
                this.props.selectedCountryName['EN']
              }`}</span>{' '}
              was the <span className="bold">{`${value + 1}${ext}`}</span>{' '}
              largest {this.section[this.props.checked]} importer from Finland
              in <span className="bold">{this.props.selectedYear}</span>
            </div>
          </div>
        ) : (
          <div className="countryText">
            <div>
              <span className="bold">{`${
                this.props.selectedCountryName['EN']
              }`}</span>{' '}
              imported{' '}
              <span className="bold">{`${formatEuros(this.props.value)}`}</span>{' '}
              worth of {this.section[this.props.checked]} from Finland (
              <span className="bold">{`${percent}%`}</span> of all Finnish{' '}
              {this.section[this.props.checked]} arms export) in{' '}
              <span className="bold">{`${this.props.selectedYear}`}</span>
            </div>
            <br />
            <div>
              <span className="bold">{`${
                this.props.selectedCountryName['EN']
              }`}</span>{' '}
              was the <span className="bold">largest</span>{' '}
              {this.section[this.props.checked]} importer from Finland in{' '}
              <span className="bold">{this.props.selectedYear}</span>
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
      if (this.props.countryData[this.props.checked] > 0) {
        text =
          value > 0 ? (
            <div className="countryText">
              <div>
                <span className="bold">{`${
                  this.props.selectedCountryName['EN']
                }`}</span>{' '}
                imported{' '}
                <span className="bold">{`${formatEuros(
                  this.props.value,
                )}`}</span>{' '}
                worth of {this.section[this.props.checked]} from Finland (
                <span className="bold">{`${percent}%`}</span> of all Finnish{' '}
                {this.section[this.props.checked]} arms export) in{' '}
                <span className="bold">{`${this.props.selectedYear}`}</span>
              </div>
              <br />
              <div>
                <span className="bold">{`${
                  this.props.selectedCountryName['FI']
                }`}</span>{' '}
                oli <span className="bold">{`${value + 1}.`}</span> suurin{' '}
                {this.finnish[this.props.checked]} tuoja Suomesta vuonna{' '}
                <span className="bold">{this.props.selectedYear}</span> (
                <span className="bold">{`${percent}%`}</span> Suomen{' '}
                {this.finnish[this.props.checked]} viennistä)
              </div>
            </div>
          ) : (
            <div className="countryText">
              <div>
                <span className="bold">{`${
                  this.props.selectedCountryName['EN']
                }`}</span>{' '}
                imported{' '}
                <span className="bold">{`${formatEuros(
                  this.props.value,
                )}`}</span>{' '}
                worth of {this.section[this.props.checked]} from Finland (
                <span className="bold">{`${percent}%`}</span> of all Finnish{' '}
                {this.section[this.props.checked]} arms export) in{' '}
                <span className="bold">{`${this.props.selectedYear}`}</span>
              </div>
              <br />
              <div>
                <span className="bold">{`${
                  this.props.selectedCountryName['FI']
                }`}</span>{' '}
                oli <span className="bold">suurin</span>{' '}
                {this.finnish[this.props.checked]} tuoja Suomesta vuonna{' '}
                <span className="bold">{this.props.selectedYear}</span> (
                <span className="bold">{`${percent}%`}</span> Suomen{' '}
                {this.finnish[this.props.checked]} viennistä)
              </div>
            </div>
          );
      } else
        text = (
          <div className="countryText">
            <span className="bold">{`${
              this.props.selectedCountryName['FI']
            }`}</span>{' '}
            did not import any {this.finnish[this.props.checked]} tuoja Suomesta
            vuonna <span className="bold">{this.props.selectedYear}</span>
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

    let articleList = d3
      .nest()
      .key(d => d.ID)
      .entries(
        this.props.articleList
          .filter(d => d.Country === this.props.selectedCountry)
          .sort((x, y) => descending(x.Year, y.Year)),
      );
    let articles = articleList.map((d, i) => {
      return (
        <ArticleList
          key={i}
          data={d.values}
          language={this.props.language}
          history={this.props.history}
        />
      );
    });

    if (articleList.length === 0) {
      articles = (
        <div
          className="articlesubText"
          style={{ marginTop: '10px', marginBottom: '10px' }}
        >
          No articles available
        </div>
      );
    }

    return (
      <div>
        {text}
        {table}
        <Divider className="divider" />
        <div className="bold">{intl.get('ALL_ARTICLES')}</div>
        {articles}
      </div>
    );
  }
}

export default TopFiveCountries;
