import React, {Component} from 'react';
import CountryDataList from './CountryDataList';
import RadioButton from './forms/RadioButton';
import SelectMenu from './forms/SelectMenu';
import DataMap from './DataMap';
import DataTimeline from './DataTimeline';

import './../styles/components/DataSection.css';
import './../styles/components/DataStats.css';

class Data extends Component {
  render() {
    const countries = [
      {value: 'usa', text: 'United States of America'},
      {value: 'fra', text: 'France'},
      {value: 'swe', text: 'Sweden'},
    ];
    const years = [
      {value: 2016, text: 2016},
      {value: 2015, text: 2015},
      {value: 2014, text: 2014},
    ];

    return (
      <section className="data-section-container">
        <section className="data-map-container flex-column-container">
          <div className="flex-container">
            <section className="flex-one">
              <h3>United States of America</h3>
              <CountryDataList />
            </section>
            <section className="flex-three">
              <DataMap />
            </section>
            <section className="flex-one">
              <form>
                <RadioButton
                  id="filter-for-total"
                  name="filter-type"
                  label="Total"
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
                  helpIcon={true}
                />
                <p className="secondary-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <RadioButton
                  id="filter-for-civilian"
                  name="filter-type"
                  label="Civilian"
                  helpIcon={true}
                />
                <p className="secondary-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <SelectMenu
                  id="filter-for-year"
                  options={years}
                  defaultOption="-- Filter by Year --"
                  label="Filter by Year"
                />
                <SelectMenu
                  id="filter-for-country"
                  options={countries}
                  defaultOption="-- Filter by Country --"
                  label="Filter by Country"
                />
              </form>
            </section>
          </div>
          <DataTimeline />
        </section>
        <section className="data-stats-container">
          <h2 className="has-spacer">2016 Statistics</h2>
          <section className="stats-container flex-container">
            <section className="stats-item">
              <span className="stats-headline">Top Total</span>
              <ol className="stats-list has-spacer">
                <li>United States of America <span>- 523M€</span></li>
                <li>France <span>- 123M€</span></li>
                <li>Sweden <span>- 75M€</span></li>
                <li>Russia <span>- 65M€</span></li>
                <li>China <span>- 52M€</span></li>
              </ol>

              <div className="flex-container rank-container">
                <div className="ranking-value">
                  <span className="rank-headline is-block">Total: 1,523M€</span>
                </div>
                <div className="ranking-value">
                  <span className="rank-headline is-block">Rank: 2nd*</span>
                </div>
              </div>

            </section>
            <section className="stats-item">
              <span className="stats-headline">Top Defence</span>
              <ol className="stats-list has-spacer">
                <li>United States of America <span>- 523M€</span></li>
                <li>France <span>- 123M€</span></li>
                <li>Sweden <span>- 75M€</span></li>
                <li>Russia <span>- 65M€</span></li>
                <li>China <span>- 52M€</span></li>
              </ol>

              <div className="flex-container rank-container">
                <div className="ranking-value">
                  <span className="rank-headline is-block">Total: 1,523M€</span>
                </div>
                <div className="ranking-value">
                  <span className="rank-headline is-block">Rank: 2nd*</span>
                </div>
              </div>

            </section>
            <section className="stats-item">
              <span className="stats-headline">Top Civilian</span>
              <ol className="stats-list has-spacer">
                <li>United States of America <span>- 523M€</span></li>
                <li>France <span>- 123M€</span></li>
                <li>Sweden <span>- 75M€</span></li>
                <li>Russia <span>- 65M€</span></li>
                <li>China <span>- 52M€</span></li>
              </ol>

              <div className="flex-container rank-container">
                <div className="ranking-value">
                  <span className="rank-headline is-block">Total: 1,523M€</span>
                </div>
                <div className="ranking-value">
                  <span className="rank-headline is-block">Rank: 2nd*</span>
                </div>
              </div>

            </section>
          </section>
          <cite>* Rank ia based on totals from 2008 - 2016</cite>
        </section>
        <section className="data-stories-container">
          <h2 className="has-spacer">Stories</h2>
        </section>
      </section>
    );
  }
}

export default Data;
