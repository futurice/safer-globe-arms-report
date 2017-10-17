import React, { Component } from 'react';
import CountryDataList from './CountryDataList';
import TopFiveCountries from './TopFiveCountries';
// import RadioButton from './forms/RadioButton';
// import SelectMenu from './forms/SelectMenu';
import DataMap from './DataMap';
import DataTimeline from './DataTimeline';
import MapLegends from './MapLegends';
// import StoryPreview from './StoryPreview';
import { csv } from 'd3-request';
import intl from 'react-intl-universal';
import dataSheet from './../data/data6.json';
import './../styles/components/DataSection.css';
import './../styles/components/DataStats.css';
import './../styles/icons.css';
import './../styles/components/Note.css';
import { saveSvgAsPng } from 'save-svg-as-png';

const svg = require('./../assets/reset-icon.svg');
const svgFinland = require('./../assets/finland-icon.svg');
const svgDownload = require('./../assets/download-map-icon.svg');

/*
  This Data component controls the full Data page. This can be seen in the router in index.js

  This component loads the data for GPI and SaferGlobe in the componentWillMount lifecycle hook

  The default activeYear is set to 2016. But upon clicking on a timeline item, the updateGPIYear method is called.
  This method updates this component's state with the selected year and that change is then passed down to child components
  and re-rendered

  For example, whenever a year other than 2016 is clicked, say 2015, the state.activeYear value is updated, and then the
  <DataMap> component is re-rendered with the updated state

  The countries for now are hardcoded but I intend those to ultimately load from a json file

  This component also sorts the top five lists for total, defence, and civilian spending as well as formats the Euro values
  See: sortTopLists() and formatEuros();

*/

function compare(a, b) {
  if (a.text < b.text) {
    return -1;
  }
  if (a.text > b.text) {
    return 1;
  }
  return 0;
}

function accumulateTotal(data, type, yrs) {
  let total = 0;
  if (type === 'Total') {
    data.forEach(d => {
      total =
        total +
        d.properties.data[yrs].CivilianArmsTotal +
        d.properties.data[yrs].MilataryMaterielTotal;
    });
  } else {
    data.forEach(d => {
      total = total + d.properties.data[yrs][type];
    });
  }
  return total;
}

class Data extends Component {
  constructor() {
    super();

    this.handleDownloadClick = this.handleDownloadClick.bind(this);

    const activeYear = 2015;

    this.state = {
      gpiData: null,
      activeYear: parseInt(
        Object.keys(
          dataSheet.objects.countries.geometries[0].properties.data,
        ).slice(-1)[0],
        10,
      ),
      countryData: dataSheet.objects.countries.geometries,
      countryShapeAndData: dataSheet,
      language: intl.options.currentLocale.includes('fi') ? 'FI' : 'EN',
      totals: {
        name: `${intl.get('WORLD')}`,
        total: {
          value: accumulateTotal(
            dataSheet.objects.countries.geometries,
            'Total',
            Object.keys(
              dataSheet.objects.countries.geometries[0].properties.data,
            ).slice(-1)[0],
          ),
        },
        defence: {
          value: accumulateTotal(
            dataSheet.objects.countries.geometries,
            'MilataryMaterielTotal',
            Object.keys(
              dataSheet.objects.countries.geometries[0].properties.data,
            ).slice(-1)[0],
          ),
        },
        civilian: {
          value: accumulateTotal(
            dataSheet.objects.countries.geometries,
            'CivilianArmsTotal',
            Object.keys(
              dataSheet.objects.countries.geometries[0].properties.data,
            ).slice(-1)[0],
          ),
        },
      },
    };

    this.updateGPIYear = this.updateGPIYear.bind(this);
    this.sortTopLists = this.sortTopLists.bind(this);
    this.buildTopLists = this.buildTopLists.bind(this);
    this.accumulateTotal = this.accumulateTotal.bind(this);
  }

  handleDownloadClick() {
    saveSvgAsPng(
      document.getElementsByClassName('svg-map')[0],
      `Suomen-asevienti-kartta-${this.state.activeYear}.png`,
    );
  }

  updateGPIYear(newGPIYear) {
    this.setState({ activeYear: newGPIYear });
  }

  sortTopLists(type, count = 5, yrs = '2015') {
    // Once we have yearly data, we will need to filter this further by the activeYear
    let data = this.state.countryData;
    let sorted = data.sort((a, b) => {
      return Number(
        a.properties.data[yrs].CivilianArmsTotal +
          a.properties.data[yrs].MilataryMaterielTotal,
      ) <
        Number(
          b.properties.data[yrs].CivilianArmsTotal +
            b.properties.data[yrs].MilataryMaterielTotal,
        )
        ? 1
        : -1;
    });
    return this.buildTopLists(sorted, type, count);
  }

  buildTopLists(data, type, count = 5) {
    const listItems = Object.keys(data.slice(0, count)).map(country => {
      console.log(data);
      return 'data[country]';
    });

    /*.map(country => (
      <li key={data[country].Countries}>
        {data[country].Countries}
        <span>- {formatEuros(data[country][type])}M€</span>
      </li>
    ));*/

    return listItems;
  }

  accumulateTotal(type, yrs = toString(this.state.activeYear)) {
    let total = 0;
    if (type === 'Total') {
      this.state.countryData.forEach(d => {
        total =
          total +
          d.properties.data[yrs].CivilianArmsTotal +
          d.properties.data[yrs].MilataryMaterielTotal;
      });
    } else {
      this.state.countryData.forEach(d => {
        total = total + d.properties.data[yrs][type];
      });
    }
    return total;
  }

  displayActiveCountry(selectedCountry) {
    this.setState({ selectedCountry });
  }

  render() {
    let sortedListTotal = null;
    sortedListTotal = this.sortTopLists('Total');
    return (
      <section
        className="data-section-container"
        style={{ overflow: 'hidden' }}
      >
        <section className="data-map-container flex-container-column">
          <div style={{ height: '100%' }} className="flex-container-column">
            <section className="flex-one country-data-container">
              {this.state.selectedCountry ? (
                <CountryDataList country={this.state.selectedCountry} />
              ) : (
                <TopFiveCountries
                  year={this.state.activeYear}
                  countries={sortedListTotal}
                  totals={this.state.totals}
                />
              )}
            </section>
            <section className="flex-five map-container">
              <DataMap
                displayData={this.displayActiveCountry.bind(this)}
                gpiYear={this.state.activeYear}
                mapData={this.state.countryShapeAndData}
                language={this.state.language}
                history={this.props.history}
              />
            </section>
            <div className="map-container__reset box-shadow">
              <img
                src={svg}
                className="reset-icon"
                alt="Reset Icon"
                title="Fit to Screen"
              />
            </div>
            <div className="map-container__finland box-shadow">
              <img
                src={svgFinland}
                className="finland-icon"
                alt="Select Finland"
                title="Select Finland"
              />
            </div>
            <div className="map-container__download box-shadow">
              <img
                src={svgDownload}
                className="download"
                alt="Download"
                title="Download"
                onClick={this.handleDownloadClick}
              />
            </div>
            <MapLegends />
            <div
              className="footnote"
              dangerouslySetInnerHTML={{ __html: intl.get('NOTE') }}
            />
          </div>
          <DataTimeline
            updateGPIYear={this.updateGPIYear}
            startYear={
              Object.keys(this.state.countryData[0].properties.data)[0]
            }
            endYear={
              Object.keys(this.state.countryData[0].properties.data).slice(
                -1,
              )[0]
            }
          />
        </section>
      </section>
    );
  }
}

export default Data;
