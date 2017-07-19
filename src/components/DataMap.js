import React, {Component} from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import {csv} from 'd3-request';
import output from './../data/output-v4.json';
import gpi from './../data/gpi_2008-2016_v1.csv';
import saferGlobe from './../data/safer-globe.csv';

class DataMap extends Component {
  constructor() {
    super();
    this.drawMap = this.drawMap.bind(this);
    this.convertToCountryObject = this.convertToCountryObject.bind(this);
    this.zoomMap = this.zoomMap.bind(this);

    this.state = {
      countryData: output,
      gpiData: null,
      saferGlobeData: null,
    };
  }

  componentWillMount() {
    csv(gpi, (error, data) => {
      if (error) {
        this.setState({loadError: true});
      }
      this.setState({gpiData: data});
    });
    csv(saferGlobe, (error, data) => {
      if (error) {
        this.setState({loadError: true});
      }
      this.setState({saferGlobeData: data});
    });
  }

  convertToCountryObject(arr) {
    let rv = {};
    for (let i = 0; i < arr.length; ++i) {
      rv[arr[i].Countries] = {
        Civilian_Arms: '0',
        Defence_Materiel: '0',
        Total: '0',
      };
      rv[arr[i].Countries]['Defence_Materiel'] = arr[i].Defence_Materiel;
      rv[arr[i].Countries]['Total'] = arr[i].Total;
      rv[arr[i].Countries]['Civilian_Arms'] = arr[i].Civilian_Arms;
    }
    return rv;
  }

  zoomMap(mapSVG) {
    mapSVG.attr(
      'transform',
      `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`
    );
  }

  drawMap() {
    let mapWidth = 960;
    let mapHeight = 480;
    let radius = d3.scaleSqrt().domain([0, 60000000]).range([0, 50]);

    let tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    let projection = d3
      .geoEquirectangular()
      .scale(153)
      .translate([mapWidth / 2, mapHeight / 2])
      .precision(0.1);

    let path = d3.geoPath().projection(projection);
    let zoom = d3.zoom().scaleExtent([1, 20]).on('zoom', () => {
      this.zoomMap(zoomGroup);
    });

    let mapSVG = d3
      .select('.map-container')
      .append('svg')
      .attr('width', mapWidth)
      .attr('height', mapHeight);

    mapSVG
      .append('rect')
      .attr('width', mapWidth)
      .attr('height', mapHeight)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(zoom);

    let zoomGroup = mapSVG.append('g').call(zoom);
    let domain = [1, 1.47, 1.91, 2.37, 2.9, 6]; // Domain to define bins for GPI
    let colorList = [
      '#999999',
      '#C4DAE7',
      '#9EC2D8',
      '#77A9C8',
      '#5091B9',
      '#2A79AA',
    ];
    let defenceColor = '#EF8234';
    let civilianColor = '#555555';
    let threshold = d3.scaleThreshold().domain(domain).range(colorList);
    let saferGlobeDataObject = this.convertToCountryObject(this.state.saferGlobeData);
    let SaferGlobeCountries = d3.keys(saferGlobeDataObject);

    // Drawing the countries as different svg paths
    zoomGroup
      .selectAll('.land')
      .data(
        topojson.feature(
          this.state.countryData,
          this.state.countryData.objects.countries)
        .features
      )
      .enter()
      .append('path')
      .attr('class', 'land')
      .attr('id', function(d) {
        if (d.properties.name == null) {
          return 'undefined';
        }
        return d.properties.name
          .replace(/ /g, '_')
          .replace('(', '_')
          .replace(')', '_')
          .replace("'", '_'); // Giving different ID to each country path so it can be called later
      })
      .attr('d', path)
      .attr('fill', () => {
        return '#eaeaea';
      });
    // .attr('stroke', '#333')
    // .attr('stroke-width', 1);

    for (let i = 0; i < this.state.gpiData.length; i++) {
      let id = `#${this.state.gpiData[i].country
        .replace(/ /g, '_')
        .replace('(', '_')
        .replace(')', '_')
        .replace("'", '_')}`;

      zoomGroup
        .selectAll(id)
        .attr('fill', threshold(parseFloat(this.state.gpiData[i].score_2016)));

      if (this.state.gpiData[i].country === 'United States of America') {
        let idAlaska = '#Alaska__United_States_of_America_';
        zoomGroup
          .selectAll(idAlaska)
          .attr('fill', threshold(parseFloat(this.state.gpiData[i].score_2016)));
      }

      if (this.state.gpiData[i].country === 'France') {
        let idFrance = '#France__Sub_Region_';
        zoomGroup
          .selectAll(idFrance)
          .attr('fill', threshold(parseFloat(this.state.gpiData[i].score_2016)));
      }
    }

    let features = topojson.feature(this.state.countryData, this.state.countryData.objects.countries).features;
    let centroids = features.map(feature => {
      let centElement = {
        name: '',
        centroid: [],
        Civilian_Arms: '0',
        Defence_Materiel: '0',
        Total: '0',
      };
      centElement.centroid = path.centroid(feature);
      centElement.name = feature.properties.name;

      if (SaferGlobeCountries.indexOf(feature.properties.name) !== -1) {
        centElement.Civilian_Arms = parseInt(saferGlobeDataObject[feature.properties.name]['Civilian_Arms']);
        centElement.Defence_Materiel = parseInt(saferGlobeDataObject[feature.properties.name]['Defence_Materiel']);
        centElement.Total = parseInt(saferGlobeDataObject[feature.properties.name]['Total']);
      }
      return centElement;
    });

    let centroidSorted = centroids.sort((a, b) => {
      return d3.descending(a.Total, b.Total);
    });

    zoomGroup
      .selectAll('.gCentroid')
      .data(centroidSorted)
      .enter()
      .filter(d => {
        return SaferGlobeCountries.indexOf(d.name) !== -1;
      })
      .append('g')
      .attr('class', 'gCentroid')
      .attr('transform', d => {
        return `translate(${d.centroid[0]}, ${d.centroid[1]})`;
      })
      .on('mouseover', d => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`${d.name}<br/>Total:${d.Total}<br/>Civilian Arms:${d.Civilian_Arms}<br/>Defence Materiel:${d.Defence_Materiel}`)
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY - 58}px`);
      })
      .on('mousemove', () => {
        tooltip
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY - 58}px`);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });

    zoomGroup
      .selectAll('.gCentroid')
      .append('circle')
      .attr('class', 'centroidCircle')
      .attr('fill', '#fff')
      .attr('stroke', '#ff0000')
      .attr('stroke-width', 0)
      .attr('fill-opacity', 0)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 0)
      .transition()
      .delay(2000)
      .attr('r', d => {
        return radius(d['Total']);
      });

    zoomGroup
      .selectAll('.gCentroid')
      .append('path')
      .attr('class', 'centroidArcDef')
      .attr('fill', defenceColor)
      .attr('fill-opacity', 1)
      .attr('d', d3.arc()
        .innerRadius(d => {
            return radius(d.Total) - 1;
        })
        .outerRadius(d => {
          return radius(d.Total) + 1;
          // Error somewhere here
        })
        .startAngle(0)
        .endAngle(d => {
          if (isNaN(d.Defence_Materiel)) return 0;
            return 2 * Math.PI * (d.Defence_Materiel / d.Total);
          })
      );

    // Drawing civilian arcs second
    zoomGroup
      .selectAll('.gCentroid')
      .append('path')
      .attr('class', 'centroidArcCiv')
      .attr('fill', civilianColor)
      .attr('fill-opacity', 1)
      .attr('d', d3.arc()
      .innerRadius(d => {
      return radius(d['Total']) - 1;
      })
      .outerRadius(d => {
        return radius(d['Total']) + 1;
        // error somewhere here
      })
      .startAngle(d => {
        if (isNaN(d['Defence_Materiel'])) return 0;
        return 2 * Math.PI * (d['Defence_Materiel'] / d['Total']);
      })
      .endAngle(2 * Math.PI)
    );

    // Using the SaferGlobe Data to determine the radius of circle for different countries
    d3.selectAll("input[name='filter-type']").on('change', /* @this HTMLElement */ function() {
      let btnValue = this.value;
      d3
        .selectAll('.centroidCircle')
        .transition()
        .delay(500)
        .attr('r', d => {
          if (isNaN(d[btnValue])) return 0;
          return radius(d[btnValue]);
        })
        .attr('stroke-width', 2)
        .attr('stroke', () => {
          if (btnValue == 'Defence_Materiel') {
            return defenceColor;
          } else {
            return civilianColor;
          }
        });

      if (btnValue !== 'Total') {
        d3.selectAll('.centroidArcDef').remove();
        d3.selectAll('.centroidArcCiv').remove();
      } else {
        zoomGroup
          .selectAll('.gCentroid')
          .append('path')
          .attr('class', 'centroidArcDef')
          .attr('fill', defenceColor)
          .attr('fill-opacity', 1)
          .attr('d', d3.arc()
            .innerRadius(d => {
              return radius(d['Total']) - 1;
            })
            .outerRadius(d => {
              return radius(d['Total']) + 1;
            })
            .startAngle(0)
            .endAngle(d => {
              if (isNaN(d['Defence_Materiel'])) {
                return 0;
              }
              return 2 * Math.PI * (d['Defence_Materiel'] / d['Total']);
            })
          );

        // Drawing civilian arcs second
        zoomGroup
          .selectAll('.gCentroid')
          .append('path')
          .attr('class', 'centroidArcCiv')
          .attr('fill', civilianColor)
          .attr('fill-opacity', 1)
          .attr('d', d3.arc()
            .innerRadius(d => {
              return radius(d['Total']) - 1;
            })
            .outerRadius(d => {
              return radius(d['Total']) + 1;
            })
            .startAngle(d => {
              if (isNaN(d['Defence_Materiel'])) {
                return 0;
              }
              return 2 * Math.PI * (d['Defence_Materiel'] / d['Total']);
            })
          .endAngle(2 * Math.PI)
          );
      }
    });
  } // End drawMap()

  render() {
    if (
      this.state.countryData &&
      this.state.gpiData &&
      this.state.saferGlobeData
    ) {
      return (
        <div>
          {this.drawMap()}
        </div>
      );
    } else {
      return (
        <div>
          Loading Map...
        </div>
      );
    }
  }
}

export default DataMap;
