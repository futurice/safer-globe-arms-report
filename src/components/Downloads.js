import React, { Component } from 'react';
import { csv } from 'd3-request';
import intl from 'react-intl-universal';
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import FileDownload from 'material-ui-icons/FileDownload';

import downloads from '../data/downloads.csv';
import './../styles/components/Downloads.css';

const svgDownload = require('./../assets/download-icon.svg');

class Downloads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      error: false,
      loading: true,
    };
  }

  componentWillMount() {
    csv(downloads, (error, data) => {
      if (error) {
        this.setState({
          error: true,
        });
      } else {
        this.setState({
          files: data,
          loading: false,
          error: false,
        });
      }
    });
  }

  renderSection(title, files) {
    return (
      <section>
        <h3>{title}</h3>
        <div className="downloads flex-container">
          {this.renderCards(files)}
        </div>
      </section>
    );
  }

  renderCards(files) {
    return files.map((data, i) => {
      const filepath = require(`../data/downloads/${data.filename}`);

      return (
        <Card className="card" key={i}>
          <a
            href={filepath}
            target="_blank"
            rel="noopener noreferrer"
            download={data.filename}
          >
            <CardHeader
              className="header"
              title={intl.get(data.title) + data.year}
            />
            <img className="download-icon" src={svgDownload} />
          </a>
        </Card>
      );
    });
  }

  render() {
    const groupFiles = files => files.reduce((acc, value) => {
      if (acc[value.section]) {
        return {
          ...acc,
          [value.section]: acc[value.section].concat(value),
        };
      } else {
        return {
          ...acc,
          [value.section]: [value],
        };
      }
    }, {});

    const makeSections = obj => {
      const sectionTitles = [
        'Report',
        'Data',
      ];

      const keys = Object.keys(obj);
      const values = Object.values(obj);

      const sections = keys.map((k, index) => {
        return {
          title: sectionTitles[k - 1],
          files: values[index],
        };
      });

      return sections;
    };

    const sections = makeSections(groupFiles(this.state.files));

    return (
      <section>
        {this.state.loading ? <CircularProgress className="loading" /> : null}
        {this.state.error ? (
          <div className="not-found">{intl.get('LOADING_ERROR')}</div>
        ) : null}
        {this.state.files ? sections.map(section => (
          this.renderSection(section.title, section.files)
        )) : null}
      </section>
    );
  }
}

export default Downloads;
