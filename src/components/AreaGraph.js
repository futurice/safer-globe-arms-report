import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { format } from 'd3-format';
require('d3-selection-multi');

class DataMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      civilianColor: this.props.civilianColor,
      defenceColor: this.props.defenceColor,
    };
    this.data = [];
  }
  componentWillMount() {
    let keys = Object.keys(this.props.data),
      data = [];
    keys.forEach(d => {
      data.push({});
      data[data.length - 1]['Year'] = d;
      data[data.length - 1]['CivilianArmsTotal'] = this.props.data[d][
        'CivilianArmsTotal'
      ];
      data[data.length - 1]['CountryMilatary'] = this.props.data[d][
        'CountryMilatary'
      ];
      data[data.length - 1]['TotalCountry'] = this.props.data[d][
        'TotalCountry'
      ];
    });
    this.data = data;
  }

  componentDidMount() {
    this.drawGraph();
  }
  componentDidUpdate() {
    this.updateData();
    this.drawGraph();
  }
  updateData = () => {
    let keys = Object.keys(this.props.data),
      data = [];
    keys.forEach(d => {
      data.push({});
      data[data.length - 1]['Year'] = d;
      data[data.length - 1]['CivilianArmsTotal'] = this.props.data[d][
        'CivilianArmsTotal'
      ];
      data[data.length - 1]['CountryMilatary'] = this.props.data[d][
        'CountryMilatary'
      ];
      data[data.length - 1]['TotalCountry'] = this.props.data[d][
        'TotalCountry'
      ];
    });
    this.data = data;
  };
  drawGraph = () => {
    select('.areaGraph').remove();

    const svg = select(this.svg)
      .append('g')
      .attrs({
        class: 'areaGraph',
        transform: `translate(${this.props.translate.left},${
          this.props.translate.top
        })`,
      });

    const width =
        this.props.width -
        this.props.translate.left -
        this.props.translate.right,
      height =
        this.props.height -
        this.props.translate.top -
        this.props.translate.bottom;

    let xScale = scaleBand()
      .domain(this.data.map(d => d.Year))
      .range([0, width])
      .paddingInner([0])
      .paddingOuter([0]);

    let yScale = scaleLinear()
      .range([height, 0])
      .domain([0, max(this.data, d => d[this.props.checked])]);

    let barG = svg
      .selectAll('.rect')
      .data(this.data)
      .enter()
      .append('g')
      .attrs({ class: 'rect' });

    let xAxis = svg
      .append('g')
      .attrs({ transform: `translate(0,${height})` })
      .call(axisBottom(xScale).tickFormat(d => `'${d[2]}${d[3]}`));

    xAxis.selectAll('text').attrs({
      'font-size': '11px',
      fill: '#aaa',
    });

    xAxis.selectAll('line').attrs({
      stroke: '#aaa',
      'shape-rendering': 'crispEdges',
    });

    let yAxis = svg.append('g').call(
      axisLeft(yScale)
        .ticks(5)
        .tickFormat(format('.0s')),
    );

    yAxis.selectAll('text').attrs({
      'font-size': '11px',
      fill: '#aaa',
    });

    yAxis.selectAll('line').attrs({
      stroke: '#aaa',
      'shape-rendering': 'crispEdges',
    });

    barG
      .append('rect')
      .attrs({
        x: d => xScale(d.Year),
        y: d => {
          switch (this.props.checked) {
            case 'total':
              return yScale(d['CivilianArmsTotal']);
            case 'CivilianArmsTotal':
              return yScale(d['CivilianArmsTotal']);
            case 'CountryMilatary':
              return 0;
            default:
              return yScale(d['CivilianArmsTotal']);
          }
        },
        width: xScale.bandwidth(),
        height: d => {
          switch (this.props.checked) {
            case 'total':
              return height - yScale(d['CivilianArmsTotal']);
            case 'CivilianArmsTotal':
              return height - yScale(d['CivilianArmsTotal']);
            case 'CountryMilatary':
              return 0;
            default:
              return height - yScale(d['CivilianArmsTotal']);
          }
        },
        opacity: d => {
          if (this.props.selectedYear.toString(10) === d.Year) return 1;
          return 0.4;
        },
      })
      .style('fill', this.state.civilianColor);

    barG
      .append('rect')
      .attrs({
        x: d => xScale(d.Year),
        y: d => {
          switch (this.props.checked) {
            case 'total':
              return (
                yScale(d['CivilianArmsTotal']) +
                yScale(d['CountryMilatary']) -
                height
              );
            case 'CivilianArmsTotal':
              return 0;
            case 'CountryMilatary':
              return yScale(d['CountryMilatary']);
            default:
              return (
                yScale(d['CivilianArmsTotal']) +
                yScale(d['CountryMilatary']) -
                height
              );
          }
        },
        width: xScale.bandwidth(),
        height: d => {
          switch (this.props.checked) {
            case 'total':
              return height - yScale(d['CountryMilatary']);
            case 'CivilianArmsTotal':
              return 0;
            case 'CountryMilatary':
              return height - yScale(d['CountryMilatary']);
            default:
              return height - yScale(d['CountryMilatary']);
          }
        },
        opacity: d => {
          if (this.props.selectedYear.toString(10) === d.Year) return 1;
          return 0.4;
        },
      })
      .style('fill', this.state.defenceColor);

    selectAll('.domain').remove();
  };

  render() {
    return (
      <div>
        <svg
          ref={svg => (this.svg = svg)}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}

export default DataMap;
