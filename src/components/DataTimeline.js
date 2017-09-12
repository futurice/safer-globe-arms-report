import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../styles/components/DataTimeline.css';

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

    const startYear = 2005;
    const endYear = 2016 + 1; // +1 fixes calculation to add defined year in the list too

    this.state = {
      activeYear: 2016,
      years: Array.from(
        {
          length: endYear - startYear,
        },
        (v, i) => startYear + i,
      ),
    };

    this.processNewGPIYear = this.processNewGPIYear.bind(this);
  }

  processNewGPIYear(year) {
    this.setState({ activeYear: year });
    this.props.updateGPIYear(year);
  }

  render() {
    return (
      <div className="flex-container flex-spread at-flex-end">
        {this.state.years.map((year, i) =>
          <div
            key={i}
            className={`timeline-item ${this.state.activeYear === year
              ? 'active'
              : ''}`}
            onClick={() => {
              this.processNewGPIYear(year);
            }}
          >
            <span className="timeline-item-year">
              {year}
            </span>
          </div>,
        )}
      </div>
    );
  }
}

DataTimeline.propTypes = {
  updateGPIYear: PropTypes.func.isRequired,
};

export default DataTimeline;
