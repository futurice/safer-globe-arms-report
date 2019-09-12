import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import formatEuros from '../utils/formatEuros';
import intl from 'react-intl-universal';
import Divider from 'material-ui/Divider';
import * as d3 from 'd3';
import ArticleList from './ArticleList';

import './../styles/components/CountryDataList.css';
import './../styles/components/TopFiveCountries.css';

class TopFiveCountries extends Component {
  constructor(props) {
    super(props);
    this.list = undefined;
    this.data = this.props.data;
    this.scale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range([0, 100]);
  }
  click = () => {
    if (this.props.noOfCountriesButton === 'SHOWALLCOUNTRIES')
      this.props.changeNoOfCountries('SHOWTOP5');
    else this.props.changeNoOfCountries('SHOWALLCOUNTRIES');
  };
  render() {
    this.data.sort((x, y) =>
      d3.descending(
        x.properties.data[this.props.selectedYear][this.props.checked],
        y.properties.data[this.props.selectedYear][this.props.checked],
      ),
    );
    let articleList = d3
      .nest()
      .key(d => d.ID)
      .entries(
        this.props.articleList.sort((x, y) => d3.descending(x.Year, y.Year)),
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
    let noOfCountries = 5;
    if (this.props.noOfCountriesButton === 'SHOWTOP5')
      noOfCountries = this.data.filter(
        d => d.properties.data[this.props.selectedYear][this.props.checked] > 0,
      ).length;
    this.list = this.data.filter((d, i) => i < noOfCountries).map((d, i) => {
      let civWid = this.scale(
          d.properties.data[this.props.selectedYear]['CivilianArmsTotal'],
        ),
        defWid = this.scale(
          d.properties.data[this.props.selectedYear]['CountryMilatary'],
        );
      if (this.props.checked === 'CivilianArmsTotal') defWid = 0;
      if (this.props.checked === 'CountryMilatary') civWid = 0;
      return (
        <div key={i} className="top-countries__country">
          <div className="top-countries__name">
            <span className="top-countries__name--wrapper">
              <div className={'top-countries__name'}>
                {`${i + 1}  ${d.properties.CountryName[this.props.language]}`}
              </div>
            </span>
            <span className={'top-countries__name--sum'}>
              {formatEuros(
                d.properties.data[this.props.selectedYear][this.props.checked],
              )}
            </span>
          </div>
          <div className="top-countries__graphs">
            <div
              className="top-countries__graphs--civilian"
              style={{
                width: `${civWid}%`,
                backgroundColor: this.props.civilianColor,
              }}
            />
            <div
              className="top-countries__graphs--defence"
              style={{
                width: `${defWid}%`,
                backgroundColor: this.props.defenceColor,
              }}
            />
          </div>
        </div>
      );
    });
    let countryList;
    if (this.props.chartSelected !== 'barChart') {
      countryList = (
        <div>
          <div className="top-countries__title bold">
            <div>
              {intl.get('TOP5COUNTRIES')} {this.props.selectedYear}
            </div>
            <button className="show-all-button" onClick={this.click}>
              {intl.get(this.props.noOfCountriesButton)}
            </button>
          </div>
          {this.list}
          <Divider className="divider" />
        </div>
      );
    }
    return (
      <div>
        {countryList}
        <div className="bold">{intl.get('ALL_ARTICLES')}</div>
        {articles}
      </div>
    );
  }
}

export default TopFiveCountries;
