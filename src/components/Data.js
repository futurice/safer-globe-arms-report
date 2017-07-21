import React, {Component} from 'react';
import CountryDataList from './CountryDataList';
import RadioButton from './forms/RadioButton';
import SelectMenu from './forms/SelectMenu';
import DataMap from './DataMap';
import DataTimeline from './DataTimeline';
import StoryPreview from './StoryPreview';
import {csv} from 'd3-request';

import output from './../data/output-v4.json';
import gpi from './../data/gpi_2008-2016_v1.csv';
import saferGlobe from './../data/safer-globe.csv';

import './../styles/components/DataSection.css';
import './../styles/components/DataStats.css';

class Data extends Component {
  constructor() {
    super();
    this.updateGPIYear = this.updateGPIYear.bind(this);
    this.sortTopLists = this.sortTopLists.bind(this);
    this.buildTopLists = this.buildTopLists.bind(this);
    this.formatEuros = this.formatEuros.bind(this);

    this.state = {
      countries: [
        {value: 'usa', text: 'United States of America'},
        {value: 'fra', text: 'France'},
        {value: 'swe', text: 'Sweden'},
      ],
      countryData: output,
      gpiData: null,
      activeYear: 2016,
      saferGlobeData: null,
    };
  }

  componentWillMount() {
    csv(gpi, (error, data) => {
      if (error) {
        this.setState({loadError: true});
      }
      this.setState({gpiData: data});
    });
    csv(saferGlobe, (error, data) => {
      if (error) {
        this.setState({loadError: true});
      }
      this.setState({saferGlobeData: data});
    });
  }

  updateGPIYear(newGPIYear) {
    let activeYear = this.state.activeYear;
    activeYear = newGPIYear;
    this.setState({activeYear});
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
    const listItems = Object.keys(data.splice(0, count)).map(country => (
      <li key={data[country].Countries}>
        {data[country].Countries}
        <span>- {this.formatEuros(data[country][type])}M€</span>
      </li>
    ));

    return listItems;
  }

  formatEuros(value) {
    // This is disgusting and needs to be optimized
    // ALL THE METHODS!!!

    return value
      .split('')
      .reverse()
      .join('')
      .replace(/(.{3})/g, '$1 ')
      .split('')
      .reverse()
      .join('');
  }

  render() {
    let sortedListTotal = null;
    let sortedListDefence = null;
    let sortedListCivilian = null;
    let accumulatedTotal = 0;
    let accumulatedDefence = 0;
    let accumulatedCivilian = 0;

    if (this.state.saferGlobeData) {
      sortedListTotal = this.sortTopLists('Total');
      sortedListDefence = this.sortTopLists('Defence_Materiel');
      sortedListCivilian = this.sortTopLists('Civilian_Arms');
    }
    return (
      <section className="data-section-container">
        <section className="data-map-container flex-column-container">
          <div className="flex-container">
            <section className="flex-one">
              <h3>United States of America</h3>
              <CountryDataList />
            </section>
            <section className="flex-four map-container">
              <DataMap gpiYear={this.state.activeYear} />
            </section>
            <section className="flex-one">
              <form>
                <RadioButton
                  id="filter-for-total"
                  name="filter-type"
                  label="Total"
                  value="Total"
                  helpIcon={true}
                  checked={true}
                />
                <p className="secondary-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <RadioButton
                  id="filter-for-defence"
                  name="filter-type"
                  label="Defence"
                  value="Defence_Materiel"
                  helpIcon={true}
                />
                <p className="secondary-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <RadioButton
                  id="filter-for-civilian"
                  name="filter-type"
                  label="Civilian"
                  value="Civilian_Arms"
                  helpIcon={true}
                />
                <p className="secondary-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <SelectMenu
                  id="filter-for-country"
                  options={this.state.countries}
                  defaultOption="-- Search by Country --"
                  label="Search by Country"
                />
              </form>
            </section>
          </div>
          <DataTimeline updateGPIYear={this.updateGPIYear} />
        </section>
        <section className="data-stats-container">
          <h2 className="has-spacer">{this.state.activeYear} Statistics</h2>
          <section className="stats-container flex-container">
            <section className="stats-item">
              <span className="stats-headline">Top Total</span>
              <ol className="stats-list has-spacer">
                {sortedListTotal}
              </ol>

              <div className="flex-container rank-container">
                <div className="ranking-value">
                  <span className="rank-headline is-block">
                    Total:
                    {accumulatedTotal}M€
                  </span>
                </div>
                <div className="ranking-value">
                  <span className="rank-headline is-block">Rank: 2nd*</span>
                </div>
              </div>

            </section>
            <section className="stats-item">
              <span className="stats-headline">Top Defence</span>
              <ol className="stats-list has-spacer">
                {sortedListDefence}
              </ol>

              <div className="flex-container rank-container">
                <div className="ranking-value">
                  <span className="rank-headline is-block">
                    Total:
                    {accumulatedDefence}M€
                  </span>
                </div>
                <div className="ranking-value">
                  <span className="rank-headline is-block">Rank: 2nd*</span>
                </div>
              </div>

            </section>
            <section className="stats-item">
              <span className="stats-headline">Top Civilian</span>
              <ol className="stats-list has-spacer">
                {sortedListCivilian}
              </ol>

              <div className="flex-container rank-container">
                <div className="ranking-value">
                  <span className="rank-headline is-block">
                    Total:
                    {accumulatedCivilian}M€
                  </span>
                </div>
                <div className="ranking-value">
                  <span className="rank-headline is-block">Rank: 2nd*</span>
                </div>
              </div>

            </section>
          </section>
          <cite>* Rank is based on totals from 2008 - 2016</cite>
        </section>
        <section className="data-stories-container">
          <h2 className="has-spacer">{this.state.activeYear} Stories</h2>

          {/* these stories will ultimately come from a JSON file */}

          <StoryPreview
            title="Misesn Lilleyawn utn Wiahent"
            preview="In accumsan ullamcorper facilisis. Duis vel placerat nulla. Duis vel quam eu turpis consectetur maximus vitae eu nulla. Nullam non bibendum ante, sed vulputate libero. Suspendisse et arcu et felis scelerisque mollis vel at dolor. Curabitur vulputate tellus vitae dapibus maximus. Etiam condimentum nisl maximus, eleifend ex id, porta nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse at neque pharetra, rutrum risus non, condimentum velit. Suspendisse sagittis metus eu arcu pulvinar condimentum."
            date="27.11.2016"
            image="https://www.walldevil.com/wallpapers/a86/wallpaper-gun-germany-outfitting-bundeswehr-soldier-assault-machine-rifle-wallpapers-archives.jpg"
          />
          <StoryPreview
            title="Misesn Lilleyawn utn Wiahent"
            preview="In accumsan ullamcorper facilisis. Duis vel placerat nulla. Duis vel quam eu turpis consectetur maximus vitae eu nulla. Nullam non bibendum ante, sed vulputate libero. Suspendisse et arcu et felis scelerisque mollis vel at dolor. Curabitur vulputate tellus vitae dapibus maximus. Etiam condimentum nisl maximus, eleifend ex id, porta nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse at neque pharetra, rutrum risus non, condimentum velit. Suspendisse sagittis metus eu arcu pulvinar condimentum."
            date="27.11.2016"
            image="http://www.cyborgdb.org/images/boe3.jpg"
          />
          <StoryPreview
            title="Misesn Lilleyawn utn Wiahent"
            preview="In accumsan ullamcorper facilisis. Duis vel placerat nulla. Duis vel quam eu turpis consectetur maximus vitae eu nulla. Nullam non bibendum ante, sed vulputate libero. Suspendisse et arcu et felis scelerisque mollis vel at dolor. Curabitur vulputate tellus vitae dapibus maximus. Etiam condimentum nisl maximus, eleifend ex id, porta nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse at neque pharetra, rutrum risus non, condimentum velit. Suspendisse sagittis metus eu arcu pulvinar condimentum."
            date="27.11.2016"
            image="http://one-europe.info/user/files/Hanna/Global%20Peace%20Index.jpg"
          />
        </section>
      </section>
    );
  }
}

export default Data;
