import React, { Component } from 'react';
import intl from 'react-intl-universal';

import './../styles/components/MapLegends.css';

export default class Maplegends extends Component {
  constructor(props) {
    super(props);

    this.colorList = ['#e7e7bf', '#fed199', '#e9a57a', '#cd7d6b', '#a75a61'];
  }

  render() {
    return (
      <div className="map-legends box-shadow">
        <div className="flex-container-row">
          <div className="flex-column-column">
            <ul>
              {this.colorList.map((color, i) => {
                return <li key={i} style={{ background: color }} />;
              })}
            </ul>
            <div
              className="flex-container-row"
              style={{ justifyContent: 'space-between' }}
            >
              <span>
                {intl.get('PEACEFUL')}
              </span>
              <span>
                {intl.get('RESTLESS')}
              </span>
            </div>
          </div>
          <div className="flex-column-column" style={{ marginLeft: '12px' }}>
            <ul>
              <li style={{ background: '#dddddd' }} />
            </ul>
            <span>
              {intl.get('NOT_AVAILABLE')}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
