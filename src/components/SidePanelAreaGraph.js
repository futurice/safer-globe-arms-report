import React, { Component } from 'react';
import AreaGraph from './AreaGraph';
import './../styles/components/TopFiveCountries.css';

class CountryDataList extends Component {
  render() {
    return (
      <div>
        <div className="data-list-total__name sideBartitle">
          <div>{this.props.selectedCountryName[this.props.language]}</div>
          <div>{this.props.selectedYear}</div>
        </div>
        <AreaGraph
          data={this.props.graphData}
          checked={this.props.checked}
          selectedYear={this.props.selectedYear}
          width={320}
          height={100}
          translate={{
            top: 10,
            left: 30,
            right: 0,
            bottom: 20,
          }}
          civilianColor={this.props.civilianColor}
          defenceColor={this.props.defenceColor}
          changeYear={this.props.changeYear}
          changeActiveYear={this.props.changeActiveYear}
          resetYear={this.props.resetYear}
        />
      </div>
    );
  }
}

export default CountryDataList;
