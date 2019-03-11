import React, { Component } from 'react';
import SidePanel from './SidePanel';
import DataMap from './DataMap';
import DataTimeline from './DataTimeline';
import MapLegends from './MapLegends';
import DataBars from './DataBars';
import intl from 'react-intl-universal';
import dataSheet from './../data/data.json';
import './../styles/components/DataSection.css';
import './../styles/components/DataStats.css';
import './../styles/icons.css';
import './../styles/components/Note.css';
import { saveSvgAsPng } from 'save-svg-as-png';

const svg = require('./../assets/reset-icon.svg');
const svgDownload = require('./../assets/download-map-icon.svg');
const barChart = require('./../assets/bar-chart-active.svg');
const bubbleChart = require('./../assets/bubble-chart-active.svg');
const barChartIcon = require('./../assets/bar-chart.svg');
class Data extends Component {
  constructor(props) {
    super(props);
    this.worldData = {};
    this.articleList = [];
    this.peaceOperations = {};
    this.highlight = true;
    this.state = {
      gpiData: null,
      barChartButtonIcon: barChart,
      bubbleChartButtonIcon: bubbleChart,
      barChartIcon: barChartIcon,
      activeYear: parseInt(
        Object.keys(
          dataSheet.objects.countries.geometries[0].properties.data,
        ).slice(-1)[0],
        10,
      ),
      selectedYear: parseInt(
        Object.keys(
          dataSheet.objects.countries.geometries[0].properties.data,
        ).slice(-1)[0],
        10,
      ),
      countryData: dataSheet.objects.countries.geometries,
      countryShapeAndData: dataSheet,
      checked: 'TotalCountry',
      language: intl.options.currentLocale.includes('fi') ? 'FI' : 'EN',
      colorList: [
        '#f6f6f6',
        '#d6ebc6',
        '#badbb5',
        '#9acac3',
        '#6fa0c8',
        '#4268a9',
      ],
      strokeColorList: ['#a9a9a9', '#fff', '#fff', '#fff', '#fff', '#fff'],
      countrySelected: 'World',
      countrySelectedName: {
        EN: 'World',
        FI: 'Maailma',
      },
      countryActive: 'World',
      countryActiveName: {
        EN: 'World',
        FI: 'Maailma',
      },
      colorize: true,
      defenceColor: '#8b0000',
      civilianColor: '#ff7c43',
      totalColor: '#212121',
      maxValue: 150000000,
      heightMaxValue: 150000000,
      highlight: true,
      bubbleChartDiv: 'inactiveChartDiv',
      barDiv: 'inactiveChartDiv',
      barChartDiv: 'activeChartDiv',
      chartSelected: 'mapBarChart',
      worldName: {
        EN: 'World',
        FI: 'Maailma',
      },
    };
  }

  handleDownloadClick = () => {
    saveSvgAsPng(
      document.getElementsByClassName('svg-map')[0],
      `Suomen-asevienti-kartta-${this.state.activeYear}.png`,
    );
  };

  changeYear = year => {
    this.setState({
      selectedYear: year,
    });
  };

  changeActiveYear = year => {
    this.setState({
      activeYear: year,
    });
  };

  resetYear = () => {
    this.setState({
      selectedYear: this.state.activeYear,
    });
  };

  timeLineLoaded = timeLineState => {
    this.setState({
      timeLineLoaded: timeLineState,
    });
  };

  checkedChange = value => {
    this.setState({
      checked: value,
    });
  };
  countrySelected = (name, data, countrySelectedName) => {
    this.setState({
      countrySelected: name,
      countrySelectedData: data,
      countrySelectedName: countrySelectedName,
    });
  };

  countryActive = (name, data, countrySelectedName) => {
    this.setState({
      countryActive: name,
      countryActiveData: data,
      countryActiveName: countrySelectedName,
    });
  };

  componentWillMount() {
    this.updateWorldData();
  }

  colorize = value => {
    this.setState({
      colorize: value,
    });
  };

  updateWorldData = () => {
    Object.keys(
      this.state.countryShapeAndData.objects.countries.geometries[0].properties
        .data,
    ).forEach(e => {
      this.worldData[e] = {};
      this.worldData[e]['CivilianArmsTotal'] = 0;
      this.worldData[e]['CountryMilatary'] = 0;
    });

    this.state.countryShapeAndData.objects.countries.geometries.forEach(d => {
      Object.keys(d.properties.data).forEach(e => {
        this.worldData[e]['CivilianArmsTotal'] +=
          d.properties.data[e]['CivilianArmsTotal'];
        this.worldData[e]['CountryMilatary'] +=
          d.properties.data[e]['MilataryMaterielTotal'];
      });
    });

    let peaceOperations = {
      name: 'Intl.Operations',
      'alpha-2': 'IO',
      'alpha-3': 'ITO',
      'iso_3166-2': undefined,
      region: undefined,
      'sub-region': undefined,
      'region-code': undefined,
      'sub-region-code': undefined,
      data: {},
      CountryName: {
        EN: 'International Missions',
        FI: 'Kansainväliset lähetystöt',
      },
    };
    Object.keys(this.worldData).forEach(d => {
      peaceOperations.data[d] = {
        CivilianArmsTotal: 0,
        CountryMilatary: 0,
        TotalCountry: 0,
        Countries: [],
      };
      this.worldData[d]['TotalCountry'] =
        this.worldData[d]['CivilianArmsTotal'] +
        this.worldData[d]['CountryMilatary'];
    });

    this.state.countryShapeAndData.objects.countries.geometries.forEach(d => {
      Object.keys(
        this.state.countryShapeAndData.objects.countries.geometries[0]
          .properties.data,
      ).forEach(e => {
        peaceOperations.data[e]['CountryMilatary'] =
          peaceOperations.data[e]['CountryMilatary'] +
          d.properties.data[e]['IntlMissionMilatary'];
        peaceOperations.data[e]['TotalCountry'] =
          peaceOperations.data[e]['TotalCountry'] +
          d.properties.data[e]['IntlMissionMilatary'];
        let peaceOperationCountryList = {
          name: d.properties.name,
          'alpha-3': d.properties['alpha-3'],
          value: d.properties.data[e]['IntlMissionMilatary'],
          CountryName: d.properties.CountryName,
        };
        peaceOperations.data[e]['Countries'].push(peaceOperationCountryList);
        if (d.properties.data[e]['Comment']['Military']['Link'])
          this.articleList.push({
            EN: d.properties.data[e]['Comment']['Military']['EN'],
            FI: d.properties.data[e]['Comment']['Military']['FI'],
            ID: d.properties.data[e]['Comment']['Military']['ID'],
            Country: d.properties.name,
            CountryEN: d.properties.CountryName.EN,
            CountryFI: d.properties.CountryName.FI,
            Type: 'Military',
            Year: e,
          });
        if (d.properties.data[e]['Comment']['Civilian']['Link'])
          this.articleList.push({
            EN: d.properties.data[e]['Comment']['Civilian']['EN'],
            FI: d.properties.data[e]['Comment']['Civilian']['FI'],
            ID: d.properties.data[e]['Comment']['Civilian']['ID'],
            Country: d.properties.name,
            CountryEN: d.properties.CountryName.EN,
            CountryFI: d.properties.CountryName.FI,
            Type: 'Civilian',
            Year: e,
          });
      });
    });
    Object.keys(peaceOperations.data).forEach(d => {
      peaceOperations.data[d]['Countries'] = peaceOperations.data[d][
        'Countries'
      ].filter(d => d.value > 0);
    });

    this.peaceOperations = peaceOperations;
    this.setState({
      countrySelectedData: this.worldData,
      countryActiveData: this.worldData,
    });
  };

  changeBubbleIcon = () => {
    this.countryActive('World', this.worldData, this.state.worldName);
    this.setState({
      highlight: true,
      chartSelected: 'mapBubbleChart',
      bubbleChartDiv: 'activeChartDiv',
      barChartDiv: 'inactiveChartDiv',
      barDiv: 'inactiveChartDiv',
    });
  };

  changeBarIcon = () => {
    this.countryActive('World', this.worldData, this.state.worldName);
    this.setState({
      highlight: true,
      chartSelected: 'mapBarChart',
      bubbleChartDiv: 'inactiveChartDiv',
      barChartDiv: 'activeChartDiv',
      barDiv: 'inactiveChartDiv',
    });
  };
  changeBarChartIcon = () => {
    this.countryActive('World', this.worldData, this.state.worldName);
    this.setState({
      chartSelected: 'barChart',
      bubbleChartDiv: 'inactiveChartDiv',
      barChartDiv: 'inactiveChartDiv',
      barDiv: 'activeChartDiv',
    });
  };
  handleChange = () => {
    this.setState({
      highlight: !this.state.highlight,
    });
  };

  render() {
    let graph = (
      <DataBars
        selectedYear={this.state.selectedYear}
        mapData={this.state.countryShapeAndData}
        language={this.state.language}
        colorList={this.state.colorList}
        checked={this.state.checked}
        countrySelected={this.countrySelected}
        worldData={this.worldData}
        countryActive={this.countryActive}
        countryActiveName={this.state.countryActive}
        countryActiveData={this.state.countryActiveData}
        countryActiveLang={this.state.countryActiveName}
        peaceOperations={this.peaceOperations}
        civilianColor={this.state.civilianColor}
        defenceColor={this.state.defenceColor}
        totalColor={this.state.totalColor}
        width={Math.max(1024, window.innerWidth)}
        height={window.innerHeight - 65 - 30}
      />
    );
    if (this.state.barDiv !== 'activeChartDiv') {
      graph = (
        <DataMap
          selectedYear={this.state.selectedYear}
          mapData={this.state.countryShapeAndData}
          language={this.state.language}
          timeLineLoaded={this.state.timeLineLoaded}
          colorList={this.state.colorList}
          strokeColorList={this.state.strokeColorList}
          checked={this.state.checked}
          countrySelected={this.countrySelected}
          countrySelectedName={this.state.countrySelected}
          worldData={this.worldData}
          countryActive={this.countryActive}
          countryActiveName={this.state.countryActive}
          countryActiveData={this.state.countryActiveData}
          countryActiveLang={this.state.countryActiveName}
          peaceOperations={this.peaceOperations}
          GPIColorize={this.state.colorize}
          civilianColor={this.state.civilianColor}
          defenceColor={this.state.defenceColor}
          totalColor={this.state.totalColor}
          maxValue={this.state.maxValue}
          heightMaxValue={this.state.heightMaxValue}
          highlight={this.state.highlight}
        />
      );
    }
    return (
      <div className="data-section-container">
        <div className="data-map-container flex-container-column">
          <div style={{ height: '100%' }} className="flex-container-column">
            <div
              className={
                this.state.barDiv === 'inactiveChartDiv'
                  ? 'flex-one country-data-container'
                  : 'flex-one country-data-container country-data-container-barChart'
              }
            >
              <SidePanel
                countrySelected={this.state.countrySelected}
                countrySelectedData={this.state.countrySelectedData}
                countrySelectedName={this.state.countrySelectedName}
                countryActive={this.state.countryActive}
                countryActiveData={this.state.countryActiveData}
                countryActiveName={this.state.countryActiveName}
                selectedYear={this.state.selectedYear}
                data={
                  this.state.countryShapeAndData.objects.countries.geometries
                }
                checkedChange={this.checkedChange}
                worldData={this.worldData}
                articleList={this.articleList}
                language={this.state.language}
                peaceOperations={this.peaceOperations}
                civilianColor={this.state.civilianColor}
                defenceColor={this.state.defenceColor}
                totalColor={this.state.totalColor}
                history={this.props.history}
                maxValue={this.state.maxValue}
                changeYear={this.changeYear}
                changeActiveYear={this.changeActiveYear}
                resetYear={this.resetYear}
                chartSelected={this.state.chartSelected}
              />
            </div>
            <div className="flex-five map-container">{graph}</div>
            <div className="graph-option">
              <div
                className={
                  this.state.barDiv === 'inactiveChartDiv'
                    ? 'map-container__graph-highlight'
                    : 'map-container__graph-highlight hiddenDiv'
                }
              >
                <div className="box-shadow-opacity highlight-button">
                  <label className="checkboxHighlight">
                    {intl.get('HIGHLIGHT')}
                    <input
                      type="checkbox"
                      onClick={this.handleChange}
                      checked={this.state.highlight}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
              <div className="map-container__graph-choice">
                <div
                  className={`map-container__reset box-shadow-opacity ${
                    this.state.barChartDiv
                  }`}
                  onClick={this.changeBarIcon}
                >
                  <img
                    src={this.state.barChartButtonIcon}
                    className={
                      this.state.barChartDiv === 'inactiveChartDiv'
                        ? 'reset-icon'
                        : 'reset-icon activeChartSelection'
                    }
                    id="map-bar-chart"
                    alt="Bar Chart"
                    title="Swith to Map Bar Chart"
                  />
                </div>
                <div
                  className={`map-container__reset box-shadow-opacity ${
                    this.state.bubbleChartDiv
                  }`}
                  onClick={this.changeBubbleIcon}
                >
                  <img
                    src={this.state.bubbleChartButtonIcon}
                    className={
                      this.state.bubbleChartDiv === 'inactiveChartDiv'
                        ? 'reset-icon'
                        : 'reset-icon activeChartSelection'
                    }
                    id="bubble-chart"
                    alt="Bubble Chart"
                    title="Swith to Map Bubble Chart"
                  />
                </div>
                <div
                  className={`map-container__reset box-shadow-opacity ${
                    this.state.barDiv
                  }`}
                  onClick={this.changeBarChartIcon}
                >
                  <img
                    src={this.state.barChartIcon}
                    className={
                      this.state.barDiv === 'inactiveChartDiv'
                        ? 'reset-icon'
                        : 'reset-icon activeChartSelection'
                    }
                    id="bar-chart"
                    alt="Bar Chart"
                    title="Swith to Bar Chart"
                  />
                </div>
              </div>
            </div>
            <div className="map-container__buttons">
              <div className="map-container__reset box-shadow-opacity">
                <img
                  src={svg}
                  className="reset-icon"
                  id="reset-zoom-button"
                  alt="Reset Icon"
                  title="Fit to Screen"
                />
              </div>
              <div className="map-container__download box-shadow-opacity">
                <img
                  src={svgDownload}
                  className="download"
                  alt="Download"
                  title="Download"
                  onClick={this.handleDownloadClick}
                />
              </div>
            </div>
            <MapLegends
              colorize={this.colorize}
              colorList={this.state.colorList}
              barDiv={this.state.barDiv}
            />
            <div
              className="footnote"
              dangerouslySetInnerHTML={{ __html: intl.get('NOTE') }}
            />
          </div>
          <DataTimeline
            changeYear={this.changeYear}
            changeActiveYear={this.changeActiveYear}
            resetYear={this.resetYear}
            startYear={
              Object.keys(this.state.countryData[0].properties.data)[0]
            }
            endYear={
              Object.keys(this.state.countryData[0].properties.data).slice(
                -1,
              )[0]
            }
            timeLineLoaded={this.timeLineLoaded}
            colorList={this.state.colorList}
            activeYear={this.state.activeYear}
          />
        </div>
      </div>
    );
  }
}

export default Data;
