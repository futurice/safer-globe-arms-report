import React, { Component } from 'react';
import intl from 'react-intl-universal';

import './../styles/components/MapLegends.css';

export default class Maplegends extends Component {
  constructor(props) {
    super(props);

    this.colorList = ['#7D2F6A', '#7A6CA8', '#7FA2CE', '#A7D3E5', '#C6E9F0'];
  }

  render() {
    return (
      <div className="map-legends">
        <strong>Key</strong>
        <ul>
          {this.colorList.map((color, i) => {
            return <li key={i} style={{ background: color }} />;
          })}
        </ul>
      </div>
    );
  }
}
