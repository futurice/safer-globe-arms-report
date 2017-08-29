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
import { CSVLink } from 'react-csv';
import intl from 'react-intl-universal';
import Button from 'material-ui/Button';

import output from './../data/output-v4.json';
import gpi from './../data/gpi_2008-2016_v1.csv';
import saferGlobe from './../data/safer-globe.csv';

import './../styles/components/DataSection.css';
import './../styles/components/DataStats.css';
import './../styles/icons.css';

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

function accumulateTotal(data, type) {
  let total = data.reduce((sum, value) => {
    return Number(value[type]) + sum;
  }, 0);

  return total;
}

class Data extends Component {
  constructor() {
    super();

    const activeYear = 2016;

    this.state = {
      countries: [],
      countryData: output,
      gpiData: null,
      activeYear: activeYear,
      saferGlobeData: [],
      totals: {
        name: `${intl.get('TOTALS')} - ${activeYear}`,
        total: {
          value: 0,
        },
        defence: {
          value: 0,
        },
        civilian: {
          value: 0,
        },
      },
    };

    this.updateGPIYear = this.updateGPIYear.bind(this);
    this.sortTopLists = this.sortTopLists.bind(this);
    this.buildTopLists = this.buildTopLists.bind(this);
    this.accumulateTotal = this.accumulateTotal.bind(this);
  }

  componentWillMount() {
    csv(gpi, (error, data) => {
      if (error) {
        this.setState({ loadError: true });
      }
      this.setState({ gpiData: data });
    });

    csv(saferGlobe, (error, data) => {
      if (error) {
        this.setState({ loadError: true });
      }

      const countryList = data
        .filter(x => parseInt(x.Total, 10) !== 0)
        .map(y => {
          return {
            value: y.Countries,
            text: y.Countries,
          };
        });

      this.setState({
        saferGlobeData: data,
        countries: countryList.sort(compare),
        totals: {
          name: `${this.state.activeYear} | ${intl.get('WORLD')}`,
          total: {
            value: accumulateTotal(data, 'Total'),
          },
          defence: {
            value: accumulateTotal(data, 'Defence_Materiel'),
          },
          civilian: {
            value: accumulateTotal(data, 'Civilian_Arms'),
          },
        },
      });
    });
  }

  updateGPIYear(newGPIYear) {
    this.setState({ activeYear: newGPIYear });
  }

  sortTopLists(type, count = 5) {
    // Once we have yearly data, we will need to filter this further by the activeYear
    let data = this.state.saferGlobeData;
    let sorted = data.sort((a, b) => {
      return Number(a[type]) < Number(b[type]) ? 1 : -1;
    });
    return this.buildTopLists(sorted, type, count);
  }

  buildTopLists(data, type, count = 5) {
    const listItems = Object.keys(data.slice(0, count)).map(country => {
      return data[country];
    });

    /*.map(country => (
      <li key={data[country].Countries}>
        {data[country].Countries}
        <span>- {formatEuros(data[country][type])}M€</span>
      </li>
    ));*/

    return listItems;
  }

  accumulateTotal(type) {
    let total = 0;

    this.state.saferGlobeData.forEach(country => {
      total += Number(country[type]);
    });

    return total;
  }

  displayActiveCountry(selectedCountry) {
    this.setState({ selectedCountry });
  }

  render() {
    let sortedListTotal = null;
    //let sortedListDefence = null;
    //let sortedListCivilian = null;
    //let accumulatedTotal = 0;
    //let accumulatedDefence = 0;
    //let accumulatedCivilian = 0;

    if (this.state.saferGlobeData) {
      sortedListTotal = this.sortTopLists('Total');
      //sortedListDefence = this.sortTopLists('Defence_Materiel');
      //sortedListCivilian = this.sortTopLists('Civilian_Arms');
      //accumulatedTotal = this.accumulateTotal('Total');
      //accumulatedDefence = this.accumulateTotal('Defence_Materiel');
      //accumulatedCivilian = this.accumulateTotal('Civilian_Arms');
    }

    return (
      <section
        className="data-section-container"
        style={{ overflow: 'hidden' }}
      >
        <section className="data-map-container flex-container-column">
          <div style={{ height: '100%' }} className="flex-container-column">
            <section className="flex-one country-data-container">
              {this.state.selectedCountry
                ? <CountryDataList country={this.state.selectedCountry} />
                : <TopFiveCountries
                    year={this.state.activeYear}
                    countries={sortedListTotal}
                    totals={this.state.totals}
                  />}
              <CSVLink
                data={this.state.saferGlobeData}
                filename={'data-dump.csv'}
              >
                {intl.get('DOWNLOAD_DATA')}
              </CSVLink>
            </section>
            <section className="flex-five map-container">
              <DataMap
                displayData={this.displayActiveCountry.bind(this)}
                gpiYear={this.state.activeYear}
              />
            </section>
            <Button raised className="map-container__reset">
              {intl.get('RESET_ZOOM')}
            </Button>
            <MapLegends />
          </div>
          <DataTimeline updateGPIYear={this.updateGPIYear} />
        </section>
      </section>
    );
  }
}

export default Data;
