import React, { Component } from 'react';
import intl from 'react-intl-universal';

import './../styles/components/MapLegends.css';

export default class Maplegends extends Component {
  constructor(props) {
    super(props);

    this.colorList = ['#55d48d', '#00b099', '#008a93', '#316179', '#453c51'];
  }

  render() {
    return (
      <div className="map-legends box-shadow">
        <div className="GPI-head">
          <a
            href="http://visionofhumanity.org/indexes/global-peace-index/"
            target="_blank"
            style={{ color: '#fff' }}
          >
            {intl.get('GPI')}
          </a>
        </div>
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
              <li style={{ background: '#333333' }} />
            </ul>
            <span>
              {intl.get('NOT_AVAILABLE')}
            </span>
          </div>
        </div>
        <hr className="divider" />
        <div className="GPI-head">
          {intl.get('HOWTOREAD')}
          <span className="sub-text">
            {intl.get('HOWTOREADTEXT')}
          </span>
        </div>
      </div>
    );
  }
}
