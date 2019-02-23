import React, { Component } from 'react';
import './../styles/components/DataTimeline.css';
import { selectAll } from 'd3-selection';
require('d3-selection-multi');
const playSvg = require('./../assets/play-icon.svg');
const pauseSvg = require('./../assets/pause-icon.svg');

class DataTimeline extends Component {
  constructor(props) {
    super(props);
    const startYear = parseInt(this.props.startYear, 10); //parseInt(d3.keys(saferGlobeJson[0].years)[0], 10);
    const endYear = parseInt(this.props.endYear, 10) + 1; // +1 fixes calculation to add defined year in the list too

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
    this.playAnimation = undefined;
  }

  componentDidMount() {
    let node = selectAll('.timeline'),
      data = this.state.years;
    node
      .selectAll('.timeline-item')
      .data(data)
      .enter()
      .append('div')
      .attrs({
        class: d => {
          if (d === this.props.activeYear) {
            return 'timeline-item activeTab';
          } else return 'timeline-item';
        },
      })
      .html(d => d)
      .on('mouseover', this.updateMap)
      .on('click', this.mouseClick);
    node.on('mouseout', this.mouseOut);
  }

  componentDidUpdate() {
    let node = selectAll('.timeline');
    node.selectAll('.timeline-item').attrs({
      class: d => {
        if (d.toString(10) === this.props.activeYear.toString(10))
          return 'timeline-item activeTab';
        else return 'timeline-item';
      },
    });
  }

  updateMap = year => {
    this.props.changeYear(year);
  };

  mouseClick = year => {
    this.props.changeActiveYear(year);
  };

  mouseOut = () => {
    this.props.resetYear();
  };

  play = () => {
    if (
      parseInt(this.props.activeYear, 10) >= parseInt(this.props.endYear, 10)
    ) {
      this.props.changeActiveYear(parseInt(this.props.startYear, 10));
      this.props.changeYear(parseInt(this.props.startYear, 10));
    } else {
      this.props.changeActiveYear(parseInt(this.props.activeYear, 10) + 1);
      this.props.changeYear(parseInt(this.props.activeYear, 10));
    }
  };

  handleClick = e => {
    let play = !this.state.play;
    if (!this.state.play) {
      this.playAnimation = setInterval(this.play, 2000);
    } else {
      clearInterval(this.playAnimation);
    }
    this.setState({
      play: play,
    });
  };

  render() {
    return (
      <div
        className="flex-container flex-spread at-flex-end timeline"
        ref={node => (this.node = node)}
      >
        <button
          className={`play-button ${
            this.state.play === true ? 'active-play' : ''
          }`}
          onClick={e => this.handleClick(e)}
        >
          <img
            src={this.state.play === true ? pauseSvg : playSvg}
            alt={this.state.play === true ? 'Pause Icon' : 'Play Icon'}
          />
        </button>
      </div>
    );
  }
}

export default DataTimeline;
