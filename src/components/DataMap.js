import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as d3GeoProjection from 'd3-geo-projection';
import { csv } from 'd3-request';
import { json } from 'd3-request';
import output from './../data/output-v4.json';
import gpi from './../data/gpi_2008-2016_v1.csv';
import saferGlobe from './../data/safer-globe.csv';
import saferGlobeJson from './../data/data.json';
import formatEuros from '../utils/formatEuros';

import './../styles/components/Tooltip.css';

/*
  This component builds the primary data map.

  The state.gpiYear is default set to 2016 but this once we have the full data set, this would be good to default
  to whatever the last year is in the data set.

  Using that year, the initial map is built and colored.

  Note that every time the GPI year is updated, the map is cleared and drawn again from scratch

  This component received one required prop from the <Data> component called this.props.gpiYear. (See Proptypes at the bottom)
*/

class DataMap extends Component {
  constructor() {
    super();
    this.drawMap = this.drawMap.bind(this);

    this.state = {
      countryData: output,
      gpiData: null,
      gpiYear: 2016,
      saferGlobeData: null,
      saferGlobeDataV2: null,
    };
  }

  componentWillReceiveProps(newGPIYear) {
    if (this.state.gpiYear !== newGPIYear.gpiYear) {
      this.setState({ gpiYear: newGPIYear.gpiYear });
    }
  }

  shouldComponentUpdate() {
    if (this.state.saferGlobeData && this.props.gpiYear) {
      return false;
    } else {
      return true;
    }
  }

  componentWillMount() {
    csv(gpi, (error, data) => {
      if (error) {
        this.setState({ loadError: true });
      }
      this.setState({ gpiData: data });
    });
    csv(saferGlobe, (error, data) => {
      if (error) {
        this.setState({ loadError: true });
      }
      this.setState({ saferGlobeData: data });
    });
    this.setState({ saferGlobeDataV2: saferGlobeJson });
    this.setState({ gpiYear: this.props.gpiYear });
  }

  drawMap(displayData) {
    d3.select('.map-container').html('');

    const scl = 215,
      wid = Math.max(1024, window.innerWidth),
      hght = window.innerHeight - 65 - 30;

    let selectedYear = '2016', armstype = 'total', scaleValue = 1;

    let tooltipDiv = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltipDiv')
      .style('display', 'none');

    let tooltipFigure = figure =>
      (parseFloat(figure) / 1000000).toFixed(2).toString().replace('.', ',');

    let hScale = d3.scaleLinear().domain([0, 60000000]).range([2, 175]);

    let projection = d3GeoProjection
      .geoWinkel3()
      .scale(scl)
      .translate([wid / 1.88, hght / 1.9]);

    let path = d3.geoPath().projection(projection);

    let zoom = d3.zoom().scaleExtent([1, 10]).on('zoom', () => {
      zoomGroup.attr(
        'transform',
        `translate(${d3.event.transform.x},${d3.event.transform.y})scale(${d3.event.transform.k})`,
      );
      scaleValue = d3.event.transform.k;
      d3.selectAll('.land').attr('stroke-width', 0.5 / scaleValue);
    });

    function drawBars(selectedYear) {
      zoomGroup
        .selectAll('.civBars')
        .data(dataV2)
        .enter()
        .append('rect')
        .attr('class', 'civBars')
        .attr(
          'id',
          d =>
            `${d.name
              .replace(/ /g, '_')
              .replace('(', '_')
              .replace(')', '_')
              .replace("'", '_')}civBar`,
        )
        .attr('x', d => d.centroid[0] - 1.5)
        .attr('width', 3)
        .attr('y', d => {
          let y1 = hScale(d.years[selectedYear]['CivilianArmsTotal']);
          if (d.years[selectedYear]['CivilianArmsTotal'] == 0) y1 = 0;
          return d.centroid[1] - y1;
        })
        .attr('height', d => {
          if (d.years[selectedYear]['CivilianArmsTotal'] == 0) return 0;
          return hScale(d.years[selectedYear]['CivilianArmsTotal']);
        })
        .attr('fill', civilianColor)
        .on('mouseover', d => {
          hover(d.name, d3.event.x, d3.event.y);
        });

      zoomGroup
        .selectAll('.milBars')
        .data(dataV2)
        .enter()
        .append('rect')
        .attr('class', 'milBars')
        .attr(
          'id',
          d =>
            `${d.name
              .replace(/ /g, '_')
              .replace('(', '_')
              .replace(')', '_')
              .replace("'", '_')}milBar`,
        )
        .attr('x', d => d.centroid[0] - 1.5)
        .attr('width', 3)
        .attr('y', d => {
          let y1 = hScale(d.years[selectedYear]['CivilianArmsTotal']),
            y2 = hScale(d.years[selectedYear]['CountryMilatary']);
          if (d.years[selectedYear]['CivilianArmsTotal'] === 0) y1 = 0;
          if (d.years[selectedYear]['CountryMilatary'] === 0) y2 = 0;
          return d.centroid[1] - y1 - y2;
        })
        .attr('height', d => {
          if (d.years[selectedYear]['CountryMilatary'] == 0) return 0;
          return hScale(d.years[selectedYear]['CountryMilatary']);
        })
        .attr('fill', defenceColor)
        .on('mouseover', d => {
          hover(d.name, d3.event.x, d3.event.y);
        });
    }
    function changeYear(yrs) {}

    function redrawBars(val) {
      if (val === 'total') {
        d3
          .selectAll('.civBars')
          .transition()
          .duration(500)
          .attr('height', d => {
            if (d.years[selectedYear]['CivilianArmsTotal'] == 0) return 0;
            return hScale(d.years[selectedYear]['CivilianArmsTotal']);
          })
          .attr('y', d => {
            let y1 = hScale(d.years[selectedYear]['CivilianArmsTotal']);
            if (d.years[selectedYear]['CivilianArmsTotal'] == 0) y1 = 0;
            return d.centroid[1] - y1;
          });
        d3
          .selectAll('.milBars')
          .transition()
          .duration(500)
          .attr('height', d => {
            if (d.years[selectedYear]['CountryMilatary'] == 0) return 0;
            return hScale(d.years[selectedYear]['CountryMilatary']);
          })
          .attr('y', d => {
            let y1 = hScale(d.years[selectedYear]['CivilianArmsTotal']),
              y2 = hScale(d.years[selectedYear]['CountryMilatary']);
            if (d.years[selectedYear]['CivilianArmsTotal'] === 0) y1 = 0;
            if (d.years[selectedYear]['CountryMilatary'] === 0) y2 = 0;
            return d.centroid[1] - y1 - y2;
          });
      }
      if (val === 'civilian') {
        d3
          .selectAll('.civBars')
          .transition()
          .duration(500)
          .attr('height', d => {
            if (d.years[selectedYear]['CivilianArmsTotal'] == 0) return 0;
            return hScale(d.years[selectedYear]['CivilianArmsTotal']);
          })
          .attr('y', d => {
            let y1 = hScale(d.years[selectedYear]['CivilianArmsTotal']);
            if (d.years[selectedYear]['CivilianArmsTotal'] == 0) y1 = 0;
            return d.centroid[1] - y1;
          });
        d3
          .selectAll('.milBars')
          .transition()
          .duration(500)
          .attr('height', 0)
          .attr('y', d => d.centroid[1]);
      }
      if (val === 'defence') {
        d3
          .selectAll('.civBars')
          .transition()
          .duration(500)
          .attr('height', 0)
          .attr('y', d => d.centroid[1]);
        d3
          .selectAll('.milBars')
          .transition()
          .duration(500)
          .attr('height', d => {
            if (d.years[selectedYear]['CountryMilatary'] == 0) return 0;
            return hScale(d.years[selectedYear]['CountryMilatary']);
          })
          .attr('y', d => {
            let y2 = hScale(d.years[selectedYear]['CountryMilatary']);
            if (d.years[selectedYear]['CountryMilatary'] === 0) y2 = 0;
            return d.centroid[1] - y2;
          });
      }
    }

    function hover(cntryNm, xPos, yPos) {
      d3
        .selectAll('.land')
        .transition()
        .duration(200)
        .attr('fill-opacity', 0.1);
      let values = d3
        .select(
          `#${cntryNm
            .replace(/ /g, '_')
            .replace('(', '_')
            .replace(')', '_')
            .replace("'", '_')}milBar`,
        )
        .datum();
      d3
        .selectAll('.tooltipDiv')
        .html(
          `${values.name}<br>Military Weapons: ${values.years[selectedYear]['CountryMilatary']}<br>Civilian Arms: ${values.years[selectedYear]['CivilianArmsTotal']}<br>Total: ${values.years[selectedYear]['TotalCountry']}`,
        )
        .style('left', `${xPos + 5}px`)
        .style('top', `${yPos - 15}px`)
        .style('display', 'inline');
      d3
        .select(
          `#${cntryNm
            .replace(/ /g, '_')
            .replace('(', '_')
            .replace(')', '_')
            .replace("'", '_')}`,
        )
        .transition()
        .duration(200)
        .attr('fill-opacity', 0.7);
      d3.selectAll('rect').transition().duration(200).attr('opacity', 0.3);
      d3
        .select(
          `#${cntryNm
            .replace(/ /g, '_')
            .replace('(', '_')
            .replace(')', '_')
            .replace("'", '_')}milBar`,
        )
        .transition()
        .duration(200)
        .attr('opacity', 1);
      d3
        .select(
          `#${cntryNm
            .replace(/ /g, '_')
            .replace('(', '_')
            .replace(')', '_')
            .replace("'", '_')}civBar`,
        )
        .transition()
        .duration(200)
        .attr('opacity', 1);
    }

    let mapSVG = d3
      .select('.map-container')
      .append('svg')
      .attr('width', wid)
      .attr('height', hght)
      .attr('class', 'svg-map');

    mapSVG.call(zoom);

    let zoomGroup = mapSVG.append('g');

    zoomGroup
      .append('rect')
      .attr('width', wid)
      .attr('height', hght)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', () => {
        d3
          .selectAll('.land')
          .transition()
          .duration(200)
          .attr('fill-opacity', 0.6);
        d3.selectAll('.tooltipDiv').style('display', 'none');
        d3.selectAll('rect').transition().duration(200).attr('opacity', 1);
      });
    let domain = [1, 1.47, 1.91, 2.37, 2.9, 6]; // Domain to define bins for GPI

    let colorList = [
      '#999999',
      '#C6E9F0',
      '#A7D3E5',
      '#7FA2CE',
      '#7A6CA8',
      '#7D2F6A',
    ];

    let civilianColor = '#ff8e39', defenceColor = '#d6004d';

    let threshold = d3.scaleThreshold().domain(domain).range(colorList);

    let dataV2 = this.state.saferGlobeDataV2;
    // Drawing the countries as different svg paths

    //Drawing Map
    zoomGroup
      .selectAll('.land')
      .data(
        topojson.feature(
          this.state.countryData,
          this.state.countryData.objects.countries,
        ).features,
      )
      .enter()
      .filter(d => d.properties.name !== null)
      .append('path')
      .attr('class', 'land')
      .attr('id', function(d) {
        return d.properties.name
          .replace(/ /g, '_')
          .replace('(', '_')
          .replace(')', '_')
          .replace("'", '_'); // Giving different ID to each country path so it can be called later
      })
      .attr('d', path)
      .attr('fill', '#aaa')
      .attr('fill-opacity', 0.6)
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .on('mouseover', d => {
        d3.selectAll('.tooltipDiv').style('display', 'none');
        let cntryname = d.properties.name;
        if (d.properties.name === 'Alaska (United States of America)') {
          cntryname = 'United States of America';
        }
        if (d.properties.name === 'France (Sub Region)') {
          cntryname = 'France';
        }
        hover(cntryname, d3.event.x, d3.event.y);
      });
    for (let i = 0; i < this.state.gpiData.length; i++) {
      let id = `#${this.state.gpiData[i].country
        .replace(/ /g, '_')
        .replace('(', '_')
        .replace(')', '_')
        .replace("'", '_')}`;
      zoomGroup
        .selectAll(id)
        .attr(
          'fill',
          threshold(
            parseFloat(this.state.gpiData[i][`score_${this.state.gpiYear}`]),
          ),
        );
      if (this.state.gpiData[i].country === 'United States of America') {
        let idAlaska = '#Alaska__United_States_of_America_';
        zoomGroup
          .selectAll(idAlaska)
          .attr(
            'fill',
            threshold(parseFloat(this.state.gpiData[i].score_2016)),
          );
      }

      if (this.state.gpiData[i].country === 'France') {
        let idFrance = '#France__Sub_Region_';
        zoomGroup
          .selectAll(idFrance)
          .attr(
            'fill',
            threshold(parseFloat(this.state.gpiData[i].score_2016)),
          );
      }
    }
    //End Drawing Map

    let features = topojson.feature(
      this.state.countryData,
      this.state.countryData.objects.countries,
    ).features;
    let countryList = [];
    features.forEach((d, i) => {
      countryList.push(d.properties.name);
    });
    dataV2.forEach((d, i) => {
      let indx = countryList.indexOf(d.name);
      d.centroid = path.centroid(features[indx]);
    });
    dataV2.sort((a, b) => {
      return d3.ascending(a.centroid[1], b.centroid[1]);
    });
    for (let k = 0; k < 5; k++) {
      d3.selectAll(`.Country${k + 1}`).html(`${k + 1}. ${dataV2[k].name}`);
    }
    for (let k = 0; k < 5; k++) {
      d3
        .selectAll(`.Value${k + 1}`)
        .html(`${formatEuros(dataV2[k].years[selectedYear]['TotalCountry'])}`);
    }

    drawBars(selectedYear);

    d3.selectAll("input[name='countryList']").on('change', () => {
      armstype = d3
        .select('input[name="countryList"]:checked')
        .property('value');
      redrawBars(armstype);
    });

    // Using the SaferGlobe Data to determine the radius of circle for different countries
    d3.selectAll("input[name='filter-type']").on(
      'change',
      /* @this HTMLElement */
      function() {
        let btnValue = this.value;
      },
    );
  } // End drawMap()

  render() {
    if (
      this.state.countryData &&
      this.state.gpiData &&
      this.state.saferGlobeData
    ) {
      return (
        <div>
          {this.drawMap(this.props.displayData)}
        </div>
      );
    } else {
      return <div style={{ textAlign: 'center' }}>Loading Map...</div>;
    }
  }
}

DataMap.propTypes = {
  gpiYear: PropTypes.number.isRequired,
  displayData: PropTypes.func.isRequired,
};

export default DataMap;
