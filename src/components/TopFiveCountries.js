import React, { Component } from 'react';
import { descending } from 'd3-array';
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

  render() {
    this.data.sort((x, y) =>
      descending(
        x.properties.data[this.props.selectedYear][this.props.checked],
        y.properties.data[this.props.selectedYear][this.props.checked],
      ),
    );
    let articleList = d3
      .nest()
      .key(d => d.ID)
      .entries(
        this.props.articleList.sort((x, y) => descending(x.Year, y.Year)),
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
    this.list = this.data.filter((d, i) => i < 5).map((d, i) => {
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
    return (
      <div>
        <div className="top-countries__title bold">
          {intl.get('TOP5COUNTRIES')}
        </div>
        {this.list}
        <Divider className="divider" />
        <div className="bold">{intl.get('ALL_ARTICLES')}</div>
        {articles}
      </div>
    );
  }
}

export default TopFiveCountries;
