import React, { Component } from 'react';
import intl from 'react-intl-universal';
import Switch from 'material-ui/Switch';

import './../styles/components/MapLegends.css';

export default class Maplegends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GPIColorize: true,
    };
    this.colorDefault = this.props.colorList[0];
    this.colorList = [
      this.props.colorList[1],
      this.props.colorList[2],
      this.props.colorList[3],
      this.props.colorList[4],
      this.props.colorList[5],
    ];
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    this.props.colorize(event.target.checked);
  };
  render() {
    return (
      <div
        className={
          this.props.barDiv === 'inactiveChartDiv'
            ? 'map-legends box-shadow'
            : 'map-legends box-shadow hiddenDiv'
        }
      >
        <div className="GPI-head">
          <a
            href="http://visionofhumanity.org/indexes/global-peace-index/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {intl.get('GPI')}
          </a>
          <Switch
            checked={this.state.GPIColorize}
            value="GPIColorize"
            onChange={this.handleChange('GPIColorize')}
            color="primary"
          />
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
              <span>{intl.get('PEACEFUL')}</span>
              <span>{intl.get('RESTLESS')}</span>
            </div>
          </div>
          <div className="flex-column-column" style={{ marginLeft: '12px' }}>
            <ul>
              <li style={{ background: this.colorDefault }} />
            </ul>
            <span>{intl.get('NOT_AVAILABLE')}</span>
          </div>
        </div>
      </div>
    );
  }
}
