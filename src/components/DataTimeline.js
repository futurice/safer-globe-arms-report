import React, {Component} from 'react';
import './../styles/components/DataTimeline.css';

class DataTimeline extends Component {
  render() {
    return (
      <div className="flex-container flex-spread at-flex-end">
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">Play</span>
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
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2008</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2009</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2010</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2011</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2012</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2013</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2014</span>
        </div>
        <div className="timeline-item">
          <div className="peace-index-indicator">&nbsp;</div>
          <span className="timeline-item-year">2015</span>
        </div>
        <div className="timeline-item active">
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

export default DataTimeline;
