import React, { Component } from 'react';
import * as d3 from 'd3';
import formatEuros from '../utils/formatEuros';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import intl from 'react-intl-universal';
require('d3-selection-multi');

class DataMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saferGlobeData: this.props.mapData,
      width: this.props.width,
      height: this.props.height,
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
    this.hScale = undefined;
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

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.selectedYear !== this.props.selectedYear ||
      nextProps.checked !== this.props.checked ||
      nextProps.countryActiveName !== this.props.countryActiveName
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    this.drawMap();
  }

  drawMap = () => {
    select('.barGraphG').remove();

    let barstart = 450;
    if (this.props.checked !== 'TotalCountry') barstart = 335;

    let data = [...this.state.saferGlobeData.objects.countries.geometries];

    let peaceOperations = {
      properties: this.props.peaceOperations,
    };
    data.push(peaceOperations);
    data = data.sort((a, b) =>
      d3.descending(
        a.properties.data[this.props.selectedYear][this.props.checked],
        b.properties.data[this.props.selectedYear][this.props.checked],
      ),
    );

    let hght =
      data.filter(
        d => d.properties.data[this.props.selectedYear][this.props.checked] > 0,
      ).length *
        40 +
      440;
    this.hScale = scaleLinear()
      .domain([
        0,
        d3.max(
          data,
          d => d.properties.data[this.props.selectedYear][this.props.checked],
        ),
      ])
      .range([0, window.innerWidth - 375 - 165 - barstart])
      .nice();
    let mapSVG = select(this.svg).attrs({
      width: this.state.width,
      height: hght,
      class: 'svg-bars',
    });
    mapSVG.append('rect').attrs({
      class: 'bg',
      fill: '#fff',
      x: 0,
      y: 0,
      width: this.state.width,
      height: hght,
    });
    mapSVG
      .append('g')
      .attrs({
        class: 'barGraphG',
        transform: 'translate(375,25)',
        opacity: 0,
      })
      .transition()
      .delay(100)
      .duration(300)
      .attrs({
        opacity: 1,
      });
    let g = select('.barGraphG');
    g.append('text')
      .attrs({
        class: 'yearText',
        fill: '#212121',
        'font-size': '16',
        'text-anchor': 'middle',
        x: (window.innerWidth - 375 - 115) / 2,
        y: 30,
      })
      .text(this.props.selectedYear);

    g.append('text')
      .attrs({
        class: 'yearText',
        fill: '#212121',
        'font-size': '30',
        'text-anchor': 'middle',
        'font-weight': 'bold',
        x: (window.innerWidth - 375 - 115) / 2,
        y: 60,
      })
      .text(this.props.countryActiveLang[this.props.language]);
    g.append('text')
      .attrs({
        class: 'yearText',
        fill: '#212121',
        'font-size': '16',
        'text-anchor': 'middle',
        x: (window.innerWidth - 375 - 115) / 2,
        y: 100,
      })
      .text(intl.get('TOTALFROMFINLAND'));

    g.append('text')
      .attrs({
        class: 'yearText',
        fill: '#212121',
        'font-size': '30',
        'text-anchor': 'middle',
        'font-weight': 'bold',
        x: (window.innerWidth - 375 - 115) / 2,
        y: 130,
      })
      .text(
        formatEuros(
          this.props.countryActiveData[this.props.selectedYear][
            this.props.checked
          ],
        ),
      );
    g.append('text')
      .attrs({
        class: 'yearText',
        fill: '#212121',
        'font-size': '16',
        'text-anchor': 'middle',
        x: (window.innerWidth - 375 - 115) / 2,
        y: 170,
      })
      .text(intl.get('CivFROMFINLAND'));

    g.append('text')
      .attrs({
        class: 'yearText',
        fill: this.state.civilianColor,
        'font-size': '30',
        'text-anchor': 'middle',
        'font-weight': 'bold',
        x: (window.innerWidth - 375 - 115) / 2,
        y: 200,
      })
      .text(
        `${formatEuros(
          this.props.countryActiveData[this.props.selectedYear][
            'CivilianArmsTotal'
          ],
        )}`,
      );

    g.append('text')
      .attrs({
        class: 'yearText',
        fill: '#212121',
        'font-size': '16',
        'text-anchor': 'middle',
        x: (window.innerWidth - 375 - 115) / 2,
        y: 240,
      })
      .text(intl.get('MilFROMFINLAND'));

    g.append('text')
      .attrs({
        class: 'yearText',
        fill: this.state.defenceColor,
        'font-size': '30',
        'text-anchor': 'middle',
        'font-weight': 'bold',
        x: (window.innerWidth - 375 - 115) / 2,
        y: 270,
      })
      .text(
        `${formatEuros(
          this.props.countryActiveData[this.props.selectedYear][
            'CountryMilatary'
          ],
        )}`,
      );

    if (this.props.countryActiveName === 'World') {
      let barG = g.append('g').attrs({
        class: 'barGraphG',
        transform: 'translate(20,340)',
      });

      let countryGroups = barG
        .selectAll('.countryGroup')
        .data(
          data.filter(
            d =>
              d.properties.data[this.props.selectedYear][this.props.checked] >
              0,
          ),
        )
        .enter()
        .append('g')
        .attrs({ class: 'countryGroup' })
        .style('cursor', 'pointer')
        .on('mouseover', this.mouseenter)
        .on('click', this.click)
        .on('mouseout', this.mouseleave);
      countryGroups
        .append('text')
        .attrs({
          x: 20,
          y: (d, i) => i * 40,
          'font-size': '16',
          'font-weight': 'bold',
          dy: '27',
          fill: '#212121',
        })
        .text(d => d.properties.CountryName[this.props.language]);
      if (this.props.checked !== 'CountryMilatary')
        countryGroups
          .append('text')
          .attrs({
            x: 315,
            y: (d, i) => i * 40,
            'font-size': '16',
            'font-weight': 'bold',
            'text-anchor': 'end',
            dy: '27',
            fill: this.state.civilianColor,
          })
          .text(d =>
            formatEuros(
              d.properties.data[this.props.selectedYear]['CivilianArmsTotal'],
            ),
          );
      if (this.props.checked !== 'CivilianArmsTotal')
        countryGroups
          .append('text')
          .attrs({
            x: () => {
              if (this.props.checked === 'TotalCountry') return 430;
              return 315;
            },
            y: (d, i) => i * 40,
            'font-size': '16',
            'font-weight': 'bold',
            'text-anchor': 'end',
            dy: '27',
            fill: this.state.defenceColor,
          })
          .text(d =>
            formatEuros(
              d.properties.data[this.props.selectedYear]['CountryMilatary'],
            ),
          );
      countryGroups.append('rect').attrs({
        class: 'civBars',
        x: barstart,
        y: (d, i) => i * 40 + 5,
        height: 35,
        fill: this.state.civilianColor,
        width: d => {
          if (this.props.checked === 'CountryMilatary') return 0;
          return this.hScale(
            d.properties.data[this.props.selectedYear]['CivilianArmsTotal'],
          );
        },
      });

      countryGroups.append('rect').attrs({
        class: 'milBars',
        x: d => {
          if (this.props.checked === 'CountryMilatary') return barstart;
          return (
            this.hScale(
              d.properties.data[this.props.selectedYear]['CivilianArmsTotal'],
            ) + barstart
          );
        },
        y: (d, i) => i * 40 + 5,
        height: 35,
        fill: this.state.defenceColor,
        width: d => {
          if (this.props.checked === 'CivilianArmsTotal') return 0;
          return this.hScale(
            d.properties.data[this.props.selectedYear]['CountryMilatary'],
          );
        },
      });
    } else {
      let barG = g.append('g').attrs({
        class: 'barGraphG',
        transform: 'translate(20,340)',
      });

      let countryGroups = barG
        .selectAll('.countryGroup')
        .data([this.props.countryActiveData])
        .enter()
        .append('g')
        .attrs({ class: 'countryGroup' });
      countryGroups.append('rect').attrs({
        x: 0,
        y: (d, i) => i * 40,
        height: 40,
        width: window.innerWidth - 375 - 115,
        fill: '#fff',
      });
      countryGroups
        .append('text')
        .attrs({
          x: 20,
          y: (d, i) => i * 40,
          'font-size': '16',
          'font-weight': 'bold',
          dy: '27',
          fill: '#212121',
        })
        .text(d => this.props.countryActiveLang[this.props.language]);
      if (this.props.checked !== 'CountryMilatary')
        countryGroups
          .append('text')
          .attrs({
            x: 315,
            y: (d, i) => i * 40,
            'font-size': '16',
            'font-weight': 'bold',
            'text-anchor': 'end',
            dy: '27',
            fill: this.state.civilianColor,
          })
          .text(d =>
            formatEuros(d[this.props.selectedYear]['CivilianArmsTotal']),
          );
      if (this.props.checked !== 'CivilianArmsTotal')
        countryGroups
          .append('text')
          .attrs({
            x: () => {
              if (this.props.checked === 'TotalCountry') return 430;
              return 315;
            },
            y: (d, i) => i * 40,
            'font-size': '16',
            'font-weight': 'bold',
            'text-anchor': 'end',
            dy: '27',
            fill: this.state.defenceColor,
          })
          .text(d =>
            formatEuros(d[this.props.selectedYear]['CountryMilatary']),
          );
      countryGroups.append('rect').attrs({
        class: 'civBars',
        x: barstart,
        y: (d, i) => i * 40 + 5,
        height: 35,
        fill: this.state.civilianColor,
        width: d => {
          if (this.props.checked === 'CountryMilatary') return 0;
          return this.hScale(d[this.props.selectedYear]['CivilianArmsTotal']);
        },
      });

      countryGroups.append('rect').attrs({
        class: 'milBars',
        x: d => {
          if (this.props.checked === 'CountryMilatary') return barstart;
          return (
            this.hScale(d[this.props.selectedYear]['CivilianArmsTotal']) +
            barstart
          );
        },
        y: (d, i) => i * 40 + 5,
        height: 35,
        fill: this.state.defenceColor,
        width: d => {
          if (this.props.checked === 'CivilianArmsTotal') return 0;
          return this.hScale(d[this.props.selectedYear]['CountryMilatary']);
        },
      });
      g.append('text')
        .attrs({
          x: (window.innerWidth - 375 - 115) / 2,
          y: 450,
          'font-size': '24',
          'text-anchor': 'middle',
          dy: '27',
          fill: '#212121',
          opacity: 0.5,
        })
        .text(intl.get('GOBACK'))
        .style('cursor', 'pointer')
        .on('click', () => {
          this.props.countryActive(
            'World',
            this.props.worldData,
            this.worldName,
          );
        });
    }
  };

  mouseenter = d => {
    this.props.countrySelected(
      d.properties.name,
      d.properties.data,
      d.properties.CountryName,
    );
  };

  mouseleave = () => {
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

  render() {
    return (
      <div>
        <svg ref={svg => (this.svg = svg)} className="barGraph-container" />
      </div>
    );
  }
}
export default DataMap;
