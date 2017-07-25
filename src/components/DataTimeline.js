import React, {Component} from 'react';
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
  constructor() {
    super();
    this.state = {
      activeYear: 2016,
    };

    this.processNewGPIYear = this.processNewGPIYear.bind(this);
  }

  processNewGPIYear(year) {
    this.setState({activeYear: year});
    this.props.updateGPIYear(year);
  }

  render() {
    return (
      <div className="flex-container flex-spread at-flex-end">
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <svg className="icon-play" id="icn-play" viewBox="0 0 26 26">
            <path d="M10,19V7l9,6L10,19z" />
          </svg>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2005</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2006</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2007</span>
        </div>
        <div
          className={`timeline-item ${this.state.activeYear === 2008 ? 'active' : ''}`}
          onClick={() => {
            this.processNewGPIYear(2008);
          }}>
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2008</span>
        </div>
        <div
          className={`timeline-item ${this.state.activeYear === 2009 ? 'active' : ''}`}
          onClick={() => {
            this.processNewGPIYear(2009);
          }}>
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2009</span>
        </div>
        <div
          className={`timeline-item ${this.state.activeYear === 2010 ? 'active' : ''}`}
          onClick={() => {
            this.processNewGPIYear(2010);
          }}>
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2010</span>
        </div>
        <div
          className={`timeline-item ${this.state.activeYear === 2011 ? 'active' : ''}`}
          onClick={() => {
            this.processNewGPIYear(2011);
          }}>
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2011</span>
        </div>
        <div
          className={`timeline-item ${this.state.activeYear === 2012 ? 'active' : ''}`}
          onClick={() => {
            this.processNewGPIYear(2012);
          }}>
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2012</span>
        </div>
        <div
          className={`timeline-item ${this.state.activeYear === 2013 ? 'active' : ''}`}
          onClick={() => {
            this.processNewGPIYear(2013);
          }}>
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2013</span>
        </div>
        <div
          className={`timeline-item ${this.state.activeYear === 2014 ? 'active' : ''}`}
          onClick={() => {
            this.processNewGPIYear(2014);
          }}>
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2014</span>
        </div>
        <div
          className={`timeline-item ${this.state.activeYear === 2015 ? 'active' : ''}`}
          onClick={() => {
            this.processNewGPIYear(2015);
          }}>
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2015</span>
        </div>
        <div
          className={`timeline-item ${this.state.activeYear === 2016 ? 'active' : ''}`}
          onClick={() => {
            this.processNewGPIYear(2016);
          }}>
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2016</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2017</span>
        </div>
      </div>
    );
  }
}

DataTimeline.propTypes = {
  updateGPIYear: PropTypes.func.isRequired,
};

export default DataTimeline;
