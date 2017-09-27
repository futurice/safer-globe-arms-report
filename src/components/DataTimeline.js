import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../styles/components/DataTimeline.css';
import saferGlobeJson from './../data/data.json';
import * as d3 from 'd3';

const playSvg = require('./../assets/play-icon.svg');
const pauseSvg = require('./../assets/pause-icon.svg');

/*
  This component builds the timeline that sits at the bottom of the screen on the data page.

  It received one prop from the parent <Data> component. It is required and is called updateGPIYear. (See Proptypes at the bottom)
  This prop is a method which exists on the parent <Data> component that we pass down to allow the timeline the ability to update
  the gpiYear on the parent component.

  This component contains a method called processNewGPIYear() which updates its own state before updating the parent state via the props method
*/

class DataTimeline extends Component {
  constructor(props) {
    super(props);

    const startYear = 2003; //parseInt(d3.keys(saferGlobeJson[0].years)[0], 10);
    const endYear =
      parseInt(d3.keys(saferGlobeJson[0].years).slice(-2)[0], 10) + 1; // +1 fixes calculation to add defined year in the list too

    this.state = {
      activeYear: endYear - 1,
      years: Array.from(
        {
          length: endYear - startYear,
        },
        (v, i) => startYear + i,
      ),
      play: false,
    };

    this.processNewGPIYear = this.processNewGPIYear.bind(this);
  }

  processNewGPIYear(year) {
    this.setState({ activeYear: year });
    this.setState({ play: false });
    this.props.updateGPIYear(year);
  }

  processPlay(clck) {
    this.setState({ play: clck });
  }
  render() {
    return (
      <div className="flex-container flex-spread at-flex-end">
        <div
          className={`play-button ${this.state.play === true
            ? 'active-play'
            : ''}`}
          onClick={() => {
            this.processPlay(!this.state.play);
          }}
        >
          <img
            src={this.state.play === true ? pauseSvg : playSvg}
            alt={this.state.play === true ? 'Pause Icon' : 'Play Icon'}
          />
        </div>
        {this.state.years.map((year, i) => (
          <div
            key={i}
            className={`timeline-item ${year} ${this.state.activeYear === year
              ? 'active'
              : ''}`}
            id={year}
            onClick={() => {
              this.processNewGPIYear(year);
            }}
          >
            <span className="timeline-item-year">{year}</span>
          </div>
        ))}
      </div>
    );
  }
}

DataTimeline.propTypes = {
  updateGPIYear: PropTypes.func.isRequired,
};

export default DataTimeline;
