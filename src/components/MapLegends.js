import React, { Component } from 'react';
import intl from 'react-intl-universal';

import './../styles/components/MapLegends.css';

export default class Maplegends extends Component {
  constructor(props) {
    super(props);

    this.colorList = ['#C6E9F0', '#A7D3E5', '#7FA2CE', '#7A6CA8', '#7D2F6A'];
  }

  render() {
    return (
      <div className="map-legends box-shadow">
        <div className="label">GPI</div>
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
