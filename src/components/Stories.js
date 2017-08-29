import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { csv } from 'd3-request';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import TextField from 'material-ui/TextField';
import Search from 'material-ui-icons/Search';
import FormControl from 'material-ui/Form/FormControl';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';

import StoryPreview from './StoryPreview';
import ArticleNotification from './ArticleNotification';
import SelectMenu from './forms/SelectMenu';
import stories from './../data/stories.csv';
import './../styles/components/Stories.css';

class Stories extends Component {
  constructor(props) {
    super(props);

    const search = this.props.location.search || '';
    let hashes = search
      .slice(search.indexOf('?') + 1)
      .split('&')
      .reduce((params, hash) => {
        let [key, val] = hash.split('=');
        return Object.assign(params, { [key]: decodeURIComponent(val) });
      }, {});

    this.state = {
      stories: [],
      tags: [],
      filters: {
        keyword: hashes.keyword || '',
        year: hashes.year || null,
        manufacturer: hashes.manufacturer || null,
        country: hashes.country || null,
        type: hashes.type || null,
      },
      loading: true,
    };

    this.typing = false;
    this.manufacturers = [];
    this.countries = [];
    this.years = [];
    this.types = [
      { text: intl.get('EVENTS'), value: 'events' },
      { text: intl.get('BACKGROUND'), value: 'background' },
    ];

    const curYear = new Date().getFullYear();

    for (let i = 2017; i <= curYear; i++) {
      this.years.push({ text: i, value: i });
    }
  }

  componentWillMount() {
    csv(stories, (error, data) => {
      if (error) {
        this.setState({ loadError: true });
      }

      const tags = data.reduce((ary, cur) => {
        const x = ary.concat(cur.tags.split(','));

        return x;
      }, []);

      this.setState({
        stories: data,
        tags: [...new Set(tags)],
        loading: false,
      });
    });
  }

  renderPreviews() {
    const filteredStories = this.state.stories.reduce((ary, cur) => {
      const tags = cur.tags.split(',').map(tag => {
        return tag.toLowerCase();
      });

      const filterYear = this.state.filters.year
        ? tags.filter(item => {
            return item === this.state.filters.year;
          }).length
        : true;

      const filterCountry = this.state.filters.country
        ? tags.filter(item => {
            return item === this.state.filters.country.toLowerCase();
          }).length
        : true;

      const filterManufacturer = this.state.filters.manufacturer
        ? tags.filter(item => {
            return item === this.state.filters.manufacturer.toLowerCase();
          }).length
        : true;

      const filterType = this.state.filters.type
        ? tags.filter(item => {
            return item === this.state.filters.type.toLowerCase();
          }).length
        : true;

      const filterKeyword = this.state.filters.keyword.length
        ? tags.filter(item => {
            return (
              item.indexOf(this.state.filters.keyword.toLowerCase()) !== -1
            );
          }).length
        : true;

      if (
        filterYear &&
        filterCountry &&
        filterManufacturer &&
        filterKeyword &&
        filterType
      ) {
        ary.push(cur);
      }

      return ary;
    }, []);

    const articles = filteredStories.map((x, i) =>
      <StoryPreview
        key={i}
        title={x.title}
        body={x.body}
        date={x.date}
        image={x.image}
        id={parseInt(x.id, 10)}
        tags={x.tags}
      />,
    );

    return (
      <section className="stories-container">
        <ArticleNotification />
        {articles}
      </section>
    );
  }

  handleChange(id, value) {
    const filters = Object.assign(this.state.filters, { [id]: value });

    this.setState({ filters });
    this.props.history.replace(
      this.props.location.pathname + '?' + this.generateQueryString(),
    );
  }

  generateQueryString() {
    return Object.keys(this.state.filters)
      .reduce((ary, i) => {
        if (this.state.filters[i]) {
          ary.push(i + '=' + this.state.filters[i]);
        }

        return ary;
      }, [])
      .join('&');
  }

  updateKeyword(event) {
    if (this.typing) {
      clearTimeout(this.typing);
    }

    const val = event.target.value;

    this.typing = setTimeout(this.handleChange('keyword', val), 500);
  }

  renderSearchMenu() {
    return (
      <div className="stories-search box-shadow">
        <div className="search-title">
          {intl.get('SEARCH')}
        </div>
        <FormControl className="stories-search__text">
          <TextField
            id="keyword"
            className="search-keyword"
            value={this.state.filters.keyword}
            onChange={this.updateKeyword.bind(this)}
          />
          <Search style={{ position: 'absolute', right: '6px' }} />
        </FormControl>
        <Divider className="divider" />
        <div className="search-filter">
          {intl.get('FILTER')}
        </div>
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.types}
          value={this.state.filters.type}
          id="type"
          label={intl.get('ARTICLE_TYPE')}
        />
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.countries}
          value={this.state.filters.countries}
          id="country"
          label={intl.get('COUNTRY')}
        />
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.years}
          value={this.state.filters.year}
          id="year"
          label={intl.get('YEAR')}
        />
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.manufacturers}
          value={this.state.filters.manufacturer}
          id="manufacturer"
          label={intl.get('MANUFACTURER')}
        />
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress className="loading" />;
    }

    return (
      <div className="stories-wrapper flex-container-row">
        <section className="left-menu">
          {this.renderSearchMenu()}
        </section>
        {this.renderPreviews()}
      </div>
    );
  }
}

Stories.propTypes = {
  match: PropTypes.object,
};

export default withRouter(Stories);
