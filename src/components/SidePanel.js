import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import intl from 'react-intl-universal';
import RadioButton from './forms/RadioButton';
import SidePanelAreaGraph from './SidePanelAreaGraph';
import TopFiveCountries from './TopFiveCountries';
import CountryDetails from './CountryDetails';
import WorldDetails from './WorldDetails';
import IntlMissionsList from './IntlMissionsList';

import './../styles/components/CountryDataList.css';

class CountryDataList extends Component {
  constructor(props) {
    super(props);
    this.worldData = {};
    this.state = {
      checked: 'TotalCountry',
      noOfCountriesButton: 'SHOWALLCOUNTRIES',
    };
  }
  handleClick = value => {
    let civPercent;
    switch (value) {
      case 'TotalCountry':
        civPercent =
          (this.props.countrySelectedData[this.props.selectedYear][
            'CivilianArmsTotal'
          ] *
            100) /
          this.props.countrySelectedData[this.props.selectedYear][
            'TotalCountry'
          ];
        break;
      case 'CivilianArmsTotal':
        civPercent = 100;
        break;
      case 'CountryMilatary':
        civPercent = 0;
        break;
      default:
        civPercent = 0;
        break;
    }
    this.setState({
      checked: value,
      value: this.props.countrySelectedData[this.props.selectedYear][value],
      civPercent: civPercent,
    });
    this.props.checkedChange(value);
  };

  changeNoOfCountries = d => {
    this.setState({
      noOfCountriesButton: d,
    });
  };
  render() {
    let lastSection = (
      <CountryDetails
        data={this.props.data}
        checked={this.state.checked}
        selectedYear={this.props.selectedYear}
        selectedCountry={this.props.countrySelected}
        countryData={this.props.countrySelectedData[this.props.selectedYear]}
        worldData={
          this.props.worldData[this.props.selectedYear][this.state.checked]
        }
        value={
          this.props.countrySelectedData[this.props.selectedYear][
            this.state.checked
          ]
        }
        articleList={this.props.articleList}
        language={this.props.language}
        selectedCountryName={this.props.countrySelectedName}
        defenceColor={this.props.defenceColor}
        civilianColor={this.props.civilianColor}
        totalColor={this.props.totalColor}
        history={this.props.history}
        baseNum={
          this.props.countrySelectedData[this.props.selectedYear][
            this.state.checked
          ]
        }
      />
    );
    if (this.props.countrySelected === 'World')
      lastSection = (
        <div>
          <WorldDetails
            data={this.props.data}
            checked={this.state.checked}
            selectedYear={this.props.selectedYear}
            selectedCountry={this.props.countrySelected}
            countryData={
              this.props.countrySelectedData[this.props.selectedYear]
            }
            worldData={
              this.props.worldData[this.props.selectedYear][this.state.checked]
            }
            value={
              this.props.countrySelectedData[this.props.selectedYear][
                this.state.checked
              ]
            }
            articleList={this.props.articleList}
            language={this.props.language}
            selectedCountryName={this.props.countrySelectedName}
            defenceColor={this.props.defenceColor}
            civilianColor={this.props.civilianColor}
            totalColor={this.props.totalColor}
            history={this.props.history}
            baseNum={
              this.props.countrySelectedData[this.props.selectedYear][
                this.state.checked
              ]
            }
          />
          <TopFiveCountries
            data={this.props.data}
            baseNum={
              this.props.countrySelectedData[this.props.selectedYear][
                this.state.checked
              ]
            }
            changeNoOfCountries={this.changeNoOfCountries}
            noOfCountriesButton={this.state.noOfCountriesButton}
            checked={this.state.checked}
            selectedYear={this.props.selectedYear}
            articleList={this.props.articleList}
            language={this.props.language}
            defenceColor={this.props.defenceColor}
            civilianColor={this.props.civilianColor}
            totalColor={this.props.totalColor}
            history={this.props.history}
            maxValue={this.props.maxValue}
          />
        </div>
      );
    if (this.props.countrySelected === 'Intl.Operations')
      lastSection = (
        <IntlMissionsList
          data={this.props.data}
          checked={this.state.checked}
          selectedYear={this.props.selectedYear}
          selectedCountry={this.props.countrySelected}
          countryData={this.props.countrySelectedData[this.props.selectedYear]}
          worldData={
            this.props.worldData[this.props.selectedYear][this.state.checked]
          }
          selectedCountryName={this.props.countrySelectedName}
          language={this.props.language}
          operations={this.props.peaceOperations}
          defenceColor={this.props.defenceColor}
          civilianColor={this.props.civilianColor}
          totalColor={this.props.totalColor}
        />
      );
    return (
      <div>
        <h1>
          <span className="is-strong">
            Finnish Arms Export {this.props.selectedYear}
          </span>
        </h1>
        <div>
          <RadioButton
            checked={this.state.checked === 'TotalCountry'}
            id="total"
            name="countryList"
            value="TotalCountry"
            label={intl.get('TOTAL')}
            onClick={this.handleClick}
          />
          <RadioButton
            checked={this.state.checked === 'CivilianArmsTotal'}
            id="civilian"
            name="countryList"
            value="CivilianArmsTotal"
            label={intl.get('CIVILIAN')}
            onClick={this.handleClick}
          />
          <RadioButton
            checked={this.state.checked === 'CountryMilatary'}
            id="defence"
            name="countryList"
            value="CountryMilatary"
            label={intl.get('DEFENCE')}
            onClick={this.handleClick}
          />
        </div>
        <Divider className="divider" />
        <SidePanelAreaGraph
          selectedYear={this.props.selectedYear}
          selectedCountry={this.props.countrySelected}
          selectedCountryName={this.props.countrySelectedName}
          value={
            this.props.countrySelectedData[this.props.selectedYear][
              this.state.checked
            ]
          }
          civPercent={
            (this.props.countrySelectedData[this.props.selectedYear][
              'CivilianArmsTotal'
            ] *
              100) /
            this.props.countrySelectedData[this.props.selectedYear][
              this.state.checked
            ]
          }
          graphData={this.props.countrySelectedData}
          checked={this.state.checked}
          language={this.props.language}
          defenceColor={this.props.defenceColor}
          civilianColor={this.props.civilianColor}
          totalColor={this.state.totalColor}
          changeYear={this.props.changeYear}
          changeActiveYear={this.props.changeActiveYear}
          resetYear={this.props.resetYear}
        />
        {lastSection}
      </div>
    );
  }
}

export default CountryDataList;
