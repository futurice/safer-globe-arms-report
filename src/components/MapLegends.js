import React, { Component } from 'react';
import intl from 'react-intl-universal';

import './../styles/components/MapLegends.css';

export default class Maplegends extends Component {
  constructor(props) {
    super(props);

    this.colorList = ['#D5E1EC', '#B7BFD6', '#9F9CC1', '#89659F', '#82197C'];
  }

  render() {
    return (
      <div className="map-legends box-shadow">
        <div className="GPI-head">{intl.get('GPI')}</div>
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
              <span>{intl.get('PEACEFUL')}</span>
              <span>{intl.get('RESTLESS')}</span>
            </div>
          </div>
          <div className="flex-column-column" style={{ marginLeft: '12px' }}>
            <ul>
              <li style={{ background: '#dddddd' }} />
            </ul>
            <span>{intl.get('NOT_AVAILABLE')}</span>
          </div>
        </div>
      </div>
    );
  }
}
