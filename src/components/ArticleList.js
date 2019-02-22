import React, { Component } from 'react';

import './../styles/components/ArticleList.css';

class TopFiveCountries extends Component {
  handleBulletPointClick = () => {
    const { history } = this.props;
    history.push(`/articles/${this.props.data[0].ID}`, { modal: true });
  };
  render() {
    let year = [],
      countryFI = [],
      countryEN = [],
      type = [];
    this.props.data.forEach(d => {
      if (year.indexOf(d.Year) === -1) year.push(d.Year);
      if (type.indexOf(d.Type) === -1) type.push(d.Type);
      if (countryEN.indexOf(d.CountryEN) === -1) {
        countryEN.push(d.CountryEN);
        countryFI.push(d.CountryFI);
      }
    });
    let yearTags = year.map((d, i) => {
      return (
        <div className="tags" key={i}>
          {d}
        </div>
      );
    });
    let countryTags;
    if (this.props.language === 'EN')
      countryTags = countryEN.map((d, i) => {
        return (
          <div className="tags" key={i}>
            {d}
          </div>
        );
      });
    else
      countryTags = countryFI.map((d, i) => {
        return (
          <div className="tags" key={i}>
            {d}
          </div>
        );
      });
    let typeTags = type.map((d, i) => {
      return (
        <div className="tags" key={i}>
          {d}
        </div>
      );
    });
    return (
      <div className="articleItem" onClick={this.handleBulletPointClick}>
        <div className="tagList">
          {yearTags}
          {countryTags}
          {typeTags}
        </div>
        <div className="articleTitle">
          {this.props.data[0][this.props.language]}
        </div>
        <div className="articlesubText">Read More</div>
      </div>
    );
  }
}

export default TopFiveCountries;
