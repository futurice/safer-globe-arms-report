import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as d3GeoProjection from 'd3-geo-projection';
import { select, selectAll } from 'd3-selection';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import drawArc from '../utils/drawArcs';
require('d3-selection-multi');

class DataMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saferGlobeData: this.props.mapData,
      width: Math.max(1024, window.innerWidth),
      height: window.innerHeight - 65 - 30,
      mapScale: (250 * Math.max(1024, window.innerWidth)) / 1440,
      intlMissionTableTitle: {
        EN: 'Countries where missions took place',
        FI: 'Maat, joissa tehtävät suoritettiin',
      },
      colorList: this.props.colorList,
      strokeColorList: this.props.strokeColorList,
      color: {
        TotalCountry: this.props.totalColor,
        CountryMilatary: this.props.defenceColor,
        CivilianArmsTotal: this.props.civilianColor,
      },
      defenceColor: this.props.defenceColor,
      civilianColor: this.props.civilianColor,
      barWidth: 5,
      strokeWidth: 2,
    };
    this.projection = d3GeoProjection
      .geoRobinson()
      .scale(this.state.mapScale)
      .translate([this.state.width / 2.03, this.state.height / 1.63]);
    this.path = d3.geoPath().projection(this.projection);
    this.rScale = scaleSqrt()
      .domain([0, this.props.maxValue])
      .range([0, 90]);
    this.hScale = scaleLinear()
      .domain([0, this.props.heightMaxValue])
      .range([0, 600]);
    this.strokeScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range([0, 20]);
    this.worldName = {
      EN: 'World',
      FI: 'Maailma',
    };
    this.intlMissions = {
      EN: 'Exports to UN mandated or other international missions',
      FI:
        'Vienti YK:n ja muiden kansainvälisten järjestöjen rauhanturva- ja humanitaarisen avustustoiminnan käyttöön',
    };
    this.arcGenerator = d3.arc();
    this.dataDrawn = undefined;
  }

  componentDidMount() {
    this.drawMap();
  }

  componentDidUpdate() {
    this.updateMaps(
      this.props.selectedYear,
      this.props.checked,
      this.props.countrySelectedName,
    );
  }

  changeToBars = () => {
    selectAll('.dataCircle').remove();
    select('#bar-chart').classed('active', true);
    select('#bubble-chart').classed('active', false);

    selectAll('.arcs').remove();
    this.drawBars();
  };

  drawBars = () => {
    selectAll('.dataBars')
      .append('rect')
      .attrs({
        class: 'civBars dataBarChart',
        x: 0 - this.state.barWidth / 2,
        width: this.state.barWidth,
        fill: this.state.civilianColor,
        height: d => {
          if (
            d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] ===
            0
          )
            return 0;
          return this.hScale(
            d.properties.data[this.props.selectedYear]['CivilianArmsTotal'],
          );
        },
        y: d => {
          let y1 = this.hScale(
            d.properties.data[this.props.selectedYear]['CivilianArmsTotal'],
          );
          if (
            d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] ===
            0
          )
            y1 = 0;
          return 0 - y1;
        },
      })
      .style('cursor', 'pointer')
      .on('mouseover', this.mouseenter)
      .on('click', this.click)
      .on('mouseout', this.mouseleave);

    selectAll('.dataBars')
      .append('rect')
      .attrs({
        class: 'milBars dataBarChart',
        x: 0 - this.state.barWidth / 2,
        width: this.state.barWidth,
        fill: this.state.defenceColor,
        height: d => {
          if (
            d.properties.data[this.props.selectedYear]['CountryMilatary'] === 0
          )
            return 0;
          return this.hScale(
            d.properties.data[this.props.selectedYear]['CountryMilatary'],
          );
        },
        y: d => {
          let y1 = this.hScale(
              d.properties.data[this.props.selectedYear]['CivilianArmsTotal'],
            ),
            y2 = this.hScale(
              d.properties.data[this.props.selectedYear]['CountryMilatary'],
            );
          if (
            d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] ===
            0
          )
            y1 = 0;
          if (
            d.properties.data[this.props.selectedYear]['CountryMilatary'] === 0
          )
            y2 = 0;
          return 0 - y1 - y2;
        },
      })
      .style('cursor', 'pointer')
      .on('mouseover', this.mouseenter)
      .on('click', this.click)
      .on('mouseout', this.mouseleave);
  };

  changeToBubbles = () => {
    selectAll('.dataBarChart').remove();
    select('#bar-chart').classed('active', false);
    select('#bubble-chart').classed('active', true);

    selectAll('.graphZoom')
      .append('g')
      .attrs({ class: 'arcs' }); // arc group
    this.drawCircles();
  };

  drawCircles = () => {
    selectAll('.dataBars')
      .append('path')
      .attrs({
        class: 'CountryMilataryCircle dataCircle',
        d: d => {
          let innerRad =
            this.rScale(
              d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] +
                d.properties.data[this.props.selectedYear]['CountryMilatary'],
            ) - this.state.strokeWidth;
          if (
            this.rScale(
              d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] +
                d.properties.data[this.props.selectedYear]['CountryMilatary'],
            ) -
              this.state.strokeWidth <
            0
          )
            innerRad = 0;
          return this.arcGenerator({
            endAngle: Math.PI * 2,
            startAngle:
              (d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] /
                (d.properties.data[this.props.selectedYear][
                  'CivilianArmsTotal'
                ] +
                  d.properties.data[this.props.selectedYear][
                    'CountryMilatary'
                  ])) *
              Math.PI *
              2,
            innerRadius: innerRad,
            outerRadius: this.rScale(
              d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] +
                d.properties.data[this.props.selectedYear]['CountryMilatary'],
            ),
          });
        },
        fill: this.state.color['CountryMilatary'],
      })
      .on('mouseover', this.mouseenter)
      .on('click', this.click)
      .on('mouseout', this.mouseleave);

    selectAll('.dataBars')
      .append('path')
      .attrs({
        class: 'CivilianArmsTotalCircle dataCircle',
        d: d => {
          let innerRad =
            this.rScale(
              d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] +
                d.properties.data[this.props.selectedYear]['CountryMilatary'],
            ) - this.state.strokeWidth;
          if (
            this.rScale(
              d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] +
                d.properties.data[this.props.selectedYear]['CountryMilatary'],
            ) -
              this.state.strokeWidth <
            0
          )
            innerRad = 0;
          return this.arcGenerator({
            startAngle: 0,
            endAngle:
              (d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] /
                (d.properties.data[this.props.selectedYear][
                  'CivilianArmsTotal'
                ] +
                  d.properties.data[this.props.selectedYear][
                    'CountryMilatary'
                  ])) *
              Math.PI *
              2,
            innerRadius: innerRad,
            outerRadius: this.rScale(
              d.properties.data[this.props.selectedYear]['CivilianArmsTotal'] +
                d.properties.data[this.props.selectedYear]['CountryMilatary'],
            ),
          });
        },
        fill: this.state.color['CivilianArmsTotal'],
      })
      .on('mouseover', this.mouseenter)
      .on('click', this.click)
      .on('mouseout', this.mouseleave);
  };

  updateMaps = (year, checked, countrySelected) => {
    selectAll('.flowLine').remove();
    selectAll('.arcsPath').remove();
    let countryList = this.props.peaceOperations.data[year]['Countries'].map(
      d => d.name,
    );
    selectAll('.countryShape').attrs({
      fill: d => {
        if (!this.props.GPIColorize) return '#f6f6f6';
        return this.props.colorList[d.properties.data[year]['GPI']['GPIBand']];
      },
      stroke: d => {
        if (!this.props.GPIColorize) return this.props.strokeColorList[0];
        return this.props.strokeColorList[
          d.properties.data[year]['GPI']['GPIBand']
        ];
      },
      opacity: d => {
        if (countrySelected === 'World') return 1;
        if (d.properties.name === countrySelected) return 1;
        if (
          countrySelected === 'Intl.Operations' &&
          checked !== 'CivilianArmsTotal'
        ) {
          if (countryList.indexOf(d.properties.name) !== -1) return 1;
        }
        return 0.2;
      },
    });
    selectAll('.FIN').attrs({
      fill: d => {
        if (!this.props.GPIColorize) return '#f6f6f6';
        return this.props.colorList[d.properties.data[year]['GPI']['GPIBand']];
      },
      stroke: d => {
        if (!this.props.GPIColorize) return this.props.strokeColorList[0];
        return this.props.strokeColorList[
          d.properties.data[year]['GPI']['GPIBand']
        ];
      },
    });
    let end = selectAll('.countryShape')
        .data()
        .filter(d => d.properties.name === countrySelected),
      start = select('.finlandGroup').data();
    if (countrySelected === 'Intl.Operations')
      end = [
        {
          properties: {
            centroid: this.props.peaceOperations.centroid,
            data: this.props.peaceOperations.data,
          },
        },
      ];
    if (countrySelected !== 'World') {
      let length = Math.sqrt(
        (start[0].properties.centroid[0] - end[0].properties.centroid[0]) *
          (start[0].properties.centroid[0] - end[0].properties.centroid[0]) +
          (start[0].properties.centroid[1] - end[0].properties.centroid[1]) *
            (start[0].properties.centroid[1] - end[0].properties.centroid[1]),
      );
      select('.FIN').attrs({ fill: '#2D80B5' });
      select('.flowLineG')
        .append('path')
        .attrs({
          class: 'flowLine',
          d: () =>
            drawArc(end[0].properties.centroid, start[0].properties.centroid),
          stroke: '#2D80B5',
          'stroke-width': () => {
            if (end[0].properties.data[year][checked] === 0) return 0;
            return Math.ceil(
              this.strokeScale(end[0].properties.data[year][checked]),
            );
          },
          fill: 'none',
          opacity: 0.7,
          'stroke-dasharray': length * 2,
          'stroke-dashoffset': length * 2,
        })
        .style('pointer-events', 'none')
        .transition()
        .duration(300)
        .attrs({ 'stroke-dashoffset': 0 });
      if (checked === 'TotalCountry') {
        let pieArcs = select('.arcs').attrs({
          transform: `translate(${end[0].properties.centroid[0]},${
            end[0].properties.centroid[1]
          })`,
        });
        pieArcs
          .append('path')
          .attrs({
            class: 'arcsPath',
            d: this.arcGenerator({
              startAngle: 0,
              endAngle:
                (end[0].properties.data[this.props.selectedYear][
                  'CivilianArmsTotal'
                ] /
                  (end[0].properties.data[this.props.selectedYear][
                    'CivilianArmsTotal'
                  ] +
                    end[0].properties.data[this.props.selectedYear][
                      'CountryMilatary'
                    ])) *
                Math.PI *
                2,
              innerRadius: 0,
              outerRadius: this.rScale(
                end[0].properties.data[this.props.selectedYear][
                  'CivilianArmsTotal'
                ] +
                  end[0].properties.data[this.props.selectedYear][
                    'CountryMilatary'
                  ],
              ),
            }),
            fill: this.state.color['CivilianArmsTotal'],
          })
          .style('pointer-events', 'none');
        pieArcs
          .append('path')
          .attrs({
            class: 'arcsPath',
            d: this.arcGenerator({
              endAngle: Math.PI * 2,
              startAngle:
                (end[0].properties.data[this.props.selectedYear][
                  'CivilianArmsTotal'
                ] /
                  (end[0].properties.data[this.props.selectedYear][
                    'CivilianArmsTotal'
                  ] +
                    end[0].properties.data[this.props.selectedYear][
                      'CountryMilatary'
                    ])) *
                Math.PI *
                2,
              innerRadius: 0,
              outerRadius: this.rScale(
                end[0].properties.data[this.props.selectedYear][
                  'CivilianArmsTotal'
                ] +
                  end[0].properties.data[this.props.selectedYear][
                    'CountryMilatary'
                  ],
              ),
            }),
            fill: this.state.color['CountryMilatary'],
          })
          .style('pointer-events', 'none');
      }
    } else {
      selectAll('.countryShape').attrs({
        opacity: d => {
          if (this.props.highlight)
            if (d.properties.data[year][checked] === 0) return 0.2;
          return 1;
        },
      });
    }
    selectAll('.CountryMilataryCircle').attrs({
      d: d => {
        if (checked === 'CivilianArmsTotal')
          return this.arcGenerator({
            endAngle: Math.PI * 2,
            startAngle: Math.PI * 2,
            innerRadius:
              Math.ceil(
                this.rScale(d.properties.data[year]['CountryMilatary']),
              ) - this.state.strokeWidth,
            outerRadius: Math.ceil(
              this.rScale(d.properties.data[year]['CountryMilatary']),
            ),
          });
        if (checked === 'CountryMilatary')
          return this.arcGenerator({
            endAngle: Math.PI * 2,
            startAngle: 0,
            innerRadius:
              Math.ceil(
                this.rScale(d.properties.data[year]['CountryMilatary']),
              ) - this.state.strokeWidth,
            outerRadius: Math.ceil(
              this.rScale(d.properties.data[year]['CountryMilatary']),
            ),
          });
        return this.arcGenerator({
          endAngle: Math.PI * 2,
          startAngle:
            (d.properties.data[year]['CivilianArmsTotal'] /
              (d.properties.data[year]['CivilianArmsTotal'] +
                d.properties.data[year]['CountryMilatary'])) *
            Math.PI *
            2,
          innerRadius:
            Math.ceil(
              this.rScale(
                d.properties.data[year]['CivilianArmsTotal'] +
                  d.properties.data[year]['CountryMilatary'],
              ),
            ) - this.state.strokeWidth,
          outerRadius: Math.ceil(
            this.rScale(
              d.properties.data[year]['CivilianArmsTotal'] +
                d.properties.data[year]['CountryMilatary'],
            ),
          ),
        });
      },
      opacity: d => {
        if (countrySelected === 'World') return 1;
        if (d.properties.name === countrySelected) return 1;
        return 0.2;
      },
    });
    selectAll('.CivilianArmsTotalCircle').attrs({
      d: d => {
        if (checked === 'CountryMilatary')
          return this.arcGenerator({
            endAngle: Math.PI * 2,
            startAngle: Math.PI * 2,
            innerRadius:
              Math.ceil(
                this.rScale(d.properties.data[year]['CountryMilatary']),
              ) - this.state.strokeWidth,
            outerRadius: Math.ceil(
              this.rScale(d.properties.data[year]['CountryMilatary']),
            ),
          });
        if (checked === 'CivilianArmsTotal')
          return this.arcGenerator({
            endAngle: Math.PI * 2,
            startAngle: 0,
            innerRadius:
              Math.ceil(
                this.rScale(d.properties.data[year]['CivilianArmsTotal']),
              ) - this.state.strokeWidth,
            outerRadius: Math.ceil(
              this.rScale(d.properties.data[year]['CivilianArmsTotal']),
            ),
          });
        return this.arcGenerator({
          startAngle: 0,
          endAngle:
            (d.properties.data[year]['CivilianArmsTotal'] /
              (d.properties.data[year]['CivilianArmsTotal'] +
                d.properties.data[year]['CountryMilatary'])) *
            Math.PI *
            2,
          innerRadius:
            Math.ceil(
              this.rScale(
                d.properties.data[year]['CivilianArmsTotal'] +
                  d.properties.data[year]['CountryMilatary'],
              ),
            ) - this.state.strokeWidth,
          outerRadius: Math.ceil(
            this.rScale(
              d.properties.data[year]['CivilianArmsTotal'] +
                d.properties.data[year]['CountryMilatary'],
            ),
          ),
        });
      },
      opacity: d => {
        if (countrySelected === 'World') return 1;
        if (d.properties.name === countrySelected) return 1;
        return 0.2;
      },
    });
    selectAll('.civBars')
      .attrs({
        opacity: d => {
          if (countrySelected === 'World') return 1;
          if (d.properties.name === countrySelected) return 1;
          return 0.2;
        },
      })
      .transition()
      .duration(200)
      .attrs({
        height: d => {
          if (
            checked === 'CountryMilatary' ||
            d.properties.data[year]['CivilianArmsTotal'] === 0
          )
            return 0;
          return this.hScale(d.properties.data[year]['CivilianArmsTotal']);
        },
        y: d => {
          let y1 = this.hScale(d.properties.data[year]['CivilianArmsTotal']);
          if (
            d.properties.data[year]['CivilianArmsTotal'] === 0 ||
            checked === 'CountryMilatary'
          )
            y1 = 0;
          return 0 - y1;
        },
      });
    selectAll('.milBars')
      .attrs({
        opacity: d => {
          if (countrySelected === 'World') return 1;
          if (d.properties.name === countrySelected) return 1;
          return 0.2;
        },
      })
      .transition()
      .duration(200)
      .attrs({
        height: d => {
          if (
            d.properties.data[year]['CountryMilatary'] === 0 ||
            checked === 'CivilianArmsTotal'
          )
            return 0;
          return this.hScale(d.properties.data[year]['CountryMilatary']);
        },
        y: d => {
          let y1 = this.hScale(d.properties.data[year]['CivilianArmsTotal']),
            y2 = this.hScale(d.properties.data[year]['CountryMilatary']);
          if (
            d.properties.data[year]['CivilianArmsTotal'] === 0 ||
            checked === 'CountryMilatary'
          )
            y1 = 0;
          if (
            d.properties.data[year]['CountryMilatary'] === 0 ||
            checked === 'CivilianArmsTotal'
          )
            y2 = 0;
          return 0 - y1 - y2;
        },
      });
  };
  drawMap = () => {
    let mapSVG = select(this.svg).attrs({
      width: this.state.width,
      height: this.state.height,
      class: 'svg-map',
    });

    /*Map Making*/

    let zoomGroup = mapSVG.append('g').attrs({ class: 'graphZoom' });
    zoomGroup
      .append('rect')
      .attrs({
        width: this.state.width,
        height: this.state.height,
        x: 0,
        y: 0,
        fill: '#fff',
      })
      .on('click', () => {
        this.props.countrySelected(
          'World',
          this.props.worldData,
          this.worldName,
        );
        this.props.countryActive('World', this.props.worldData, this.worldName);
      })
      .style('cursor', 'grab');

    let countryGroups = zoomGroup
      .selectAll('.countryGroup')
      .data(
        topojson
          .feature(this.props.mapData, this.props.mapData.objects.countries)
          .features.filter(
            d => d.properties.name !== null && d.properties.name !== 'Finland',
          ),
      )
      .enter()
      .append('g')
      .attrs({ class: 'countryGroup' })
      .style('cursor', 'pointer')
      .on('mouseenter', this.mouseenter)
      .on('mouseout', this.mouseleave)
      .on('click', this.click);

    zoomGroup
      .selectAll('.finlandGroup')
      .data(
        topojson
          .feature(this.props.mapData, this.props.mapData.objects.countries)
          .features.filter(d => d.properties.name === 'Finland'),
      )
      .enter()
      .append('g')
      .attrs({ class: 'finlandGroup' })
      .style('cursor', 'pointer')
      .append('path')
      .attrs({
        d: this.path,
        class: d => `${d.properties['alpha-3']}`,
        fill: d =>
          this.state.colorList[
            d.properties.data[this.props.selectedYear]['GPI']['GPIBand']
          ],
        opacity: 1,
        stroke: d =>
          this.state.strokeColorList[
            d.properties.data[this.props.selectedYear]['GPI']['GPIBand']
          ],
        'stroke-width': 0.5,
        'fill-opacity': 1,
        'stroke-opacity': 1,
      });

    countryGroups.append('path').attrs({
      d: this.path,
      class: d => `${d.properties['alpha-3']} countryShape`,
      fill: d =>
        this.state.colorList[
          d.properties.data[this.props.selectedYear]['GPI']['GPIBand']
        ],
      opacity: d => {
        if (this.props.highlight)
          if (
            d.properties.data[this.props.selectedYear][this.props.checked] === 0
          )
            return 0.2;
        return 1;
      },
      stroke: d =>
        this.state.strokeColorList[
          d.properties.data[this.props.selectedYear]['GPI']['GPIBand']
        ],
      'stroke-width': d => {
        if (d.properties.name === 'Somalia') return 0;
        return 0.5;
      },
      'fill-opacity': 1,
      'stroke-opacity': 1,
    });

    //================================//

    zoomGroup.append('g').attrs({ class: 'flowLineG' }); // flowLine group
    //zoomGroup.append('g').attrs({'class':'arcs',}) // arc group

    //===============================//

    /*Adding Bars*/
    let barDataTemp = topojson
      .feature(this.props.mapData, this.props.mapData.objects.countries)
      .features.map(d => {
        d.properties.centroid = this.path.centroid(d);
        return d;
      });
    let barData = [
      ...barDataTemp.filter(
        d => d.properties.name !== null && d.properties.name !== 'Finland',
      ),
    ];

    /* Adding peaceOperation Data*/
    let peaceOperations = {
      properties: this.props.peaceOperations,
    };
    peaceOperations.properties.centroid = [
      this.state.width / 2 - 50,
      this.state.height * 0.95,
    ];
    barData.push(peaceOperations);
    this.dataDrawn = barData.sort((a, b) =>
      d3.ascending(a.properties.centroid[1], b.properties.centroid[1]),
    );
    barData = barData.sort((a, b) =>
      d3.ascending(a.properties.centroid[1], b.properties.centroid[1]),
    );
    zoomGroup
      .selectAll('.textLabel')
      .data([peaceOperations])
      .enter()
      .append('text')
      .text(this.intlMissions[this.props.language])
      .attrs({
        class: 'textLabel',
        x: d => d.properties.centroid[0],
        y: d => d.properties.centroid[1] + 30,
        'text-anchor': 'middle',
        'font-size': '12px',
        fill: '#666',
      })
      .style('cursor', 'pointer')
      .on('mouseover', this.mouseenter)
      .on('click', this.click)
      .on('mouseout', this.mouseleave)
      .on('mouseenter', this.mouseenter);
    zoomGroup
      .selectAll('.dataBars')
      .data(barData)
      .enter()
      .append('g')
      .attrs({
        class: 'dataBars',
        transform: d =>
          `translate(${d.properties.centroid[0]},${d.properties.centroid[1]})`,
      });

    this.drawBars();

    select('#bar-chart').on('click', this.changeToBars);
    select('#bubble-chart').on('click', this.changeToBubbles);

    d3.select(this.svg).call(
      d3
        .zoom()
        .scaleExtent([0.8, 8])
        .on('zoom', this.zoomed),
    );

    select('#reset-zoom-button').on('click', () => {
      const transform = d3.zoomIdentity.translate(0, 0).scale(1);
      d3.select(this.svg).call(
        d3.zoom().on('zoom', this.zoomed).transform,
        transform,
      );
    });
  };

  mouseenter = d => {
    this.props.countrySelected(
      d.properties.name,
      d.properties.data,
      d.properties.CountryName,
    );
  };

  mouseleave = () => {
    select('.FIN').attrs({
      fill: d =>
        this.state.colorList[
          d.properties.data[this.props.selectedYear]['GPI']['GPIBand']
        ],
    });
    this.props.countrySelected(
      this.props.countryActiveName,
      this.props.countryActiveData,
      this.props.countryActiveLang,
    );
  };

  click = d => {
    this.props.countryActive(
      d.properties.name,
      d.properties.data,
      d.properties.CountryName,
    );
  };

  zoomed = () => {
    select('.graphZoom').attrs({ transform: d3.event.transform });
  };

  render() {
    return (
      <div>
        <svg ref={svg => (this.svg = svg)} className="map-container" />
      </div>
    );
  }
}
export default DataMap;
