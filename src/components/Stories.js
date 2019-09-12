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

import resolveUrl from '../resolveUrl';

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
        region: hashes.region || null,
        direction: hashes.direction || null,
        type: hashes.type || null,
        theme: hashes.theme || null,
        product: hashes.product || null,
      },
      loading: true,
    };

    this.typing = false;
    this.regions = this.makeMenuObject(
      intl.options.locales[intl.options.currentLocale].TAGS_REGION,
    );
    this.types = this.makeMenuObject(
      intl.options.locales[intl.options.currentLocale].TAGS_ARTICLE_TYPE,
    );
    this.directions = this.makeMenuObject(
      intl.options.locales[intl.options.currentLocale].TAGS_IMPORT_EXPORT,
    );
    this.themes = this.makeMenuObject(
      intl.options.locales[intl.options.currentLocale].TAGS_THEME,
    );
    this.products = this.makeMenuObject(
      intl.options.locales[intl.options.currentLocale].TAGS_PRODUCT,
    );
    this.years = [];

    const curYear = new Date().getFullYear();

    for (let i = curYear; i >= 2008; i--) {
      this.years.push({ text: i, value: i });
    }
  }

  makeMenuObject(ary) {
    return ary.map(r => {
      return {
        text: intl.get(r),
        value: r,
      };
    });
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
        return tag.toLowerCase().trim();
      });

      const filterYear = this.state.filters.year
        ? tags.filter(item => {
            return item === this.state.filters.year.toString();
          }).length
        : true;

      const filterDirection = this.state.filters.direction
        ? tags.filter(item => {
            return item === this.state.filters.direction.toLowerCase();
          }).length
        : true;

      const filterRegion = this.state.filters.region
        ? tags.filter(item => {
            return item === this.state.filters.region.toLowerCase();
          }).length
        : true;

      const filterType = this.state.filters.type
        ? tags.filter(item => {
            return item === this.state.filters.type.toLowerCase();
          }).length
        : true;

      const filterTheme = this.state.filters.theme
        ? tags.filter(item => {
            return item === this.state.filters.theme.toLowerCase();
          }).length
        : true;

      const filterProduct = this.state.filters.product
        ? tags.filter(item => {
            return item === this.state.filters.product.toLowerCase();
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
        filterDirection &&
        filterRegion &&
        filterKeyword &&
        filterTheme &&
        filterProduct &&
        filterType
      ) {
        ary.push(cur);
      }

      return ary;
    }, []);

    const articles = filteredStories.map((x, i) => (
      <StoryPreview
        key={i}
        title={x.title}
        body={x.body}
        date={x.date}
        image={resolveUrl(x.image)}
        id={parseInt(x.id, 10)}
        tags={x.tags}
      />
    ));

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
        <div className="search-title">{intl.get('FILTER')}</div>
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.types}
          value={this.state.filters.type}
          id="type"
          label={intl.get('ARTICLE_TYPE')}
        />
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.regions}
          value={this.state.filters.region}
          id="region"
          label={intl.get('REGION')}
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
          options={this.directions}
          value={this.state.filters.direction}
          id="direction"
          label={intl.get('IMPORT_EXPORT')}
        />
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.themes}
          value={this.state.filters.themes}
          id="theme"
          label={intl.get('THEME')}
        />
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.products}
          value={this.state.filters.product}
          id="product"
          label={intl.get('PRODUCT')}
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
        <section className="left-menu">{this.renderSearchMenu()}</section>
        {this.renderPreviews()}
      </div>
    );
  }
}

Stories.propTypes = {
  match: PropTypes.object,
};

export default withRouter(Stories);
