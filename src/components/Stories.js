import React, { Component } from 'react';
import StoryPreview from './StoryPreview';
import FullStory from './FullStory';
import stories from './../data/stories/stories.csv';
import { csv } from 'd3-request';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import TextField from 'material-ui/TextField';

import SelectMenu from './forms/SelectMenu';
import './../styles/components/Stories.css';

class Stories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      tags: [],
      filters: {
        keyword: '',
        year: null,
        manufacturer: null,
        country: null,
      },
    };

    this.typing = false;
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
      });
    });
  }

  renderFullStory(match, stories) {
    const fullStory = stories[match.params.id] || null;

    if (fullStory) {
      return (
        <div>
          <FullStory
            title={fullStory.title}
            preview={fullStory.preview}
            image={fullStory.image}
            body={fullStory.body}
            id={match.params.id}
            date={fullStory.date}
            tags={fullStory.tags}
          />
        </div>
      );
    } else {
      return <div>Article not found.</div>;
    }
  }

  renderPreviews() {
    const filteredStories = this.state.stories.reduce((ary, cur) => {
      const filterYear = this.state.filters.year
        ? this.state.filters.year === new Date(cur.date).getFullYear()
        : true;
      const filterCountry = this.state.filters.country
        ? this.state.filters.country === ''
        : true;
      const filterManufacturer = this.state.filters.manufacturer
        ? this.state.filters.manufacturer === ''
        : true;
      const filterKeyword = this.state.filters.keyword.length
        ? this.state.tags.filter(item => {
            return item.indexOf(this.state.filters.keyword) !== -1;
          })
        : true;

      if (filterYear && filterKeyword) {
        ary.push(cur);
      }

      return ary;
    }, []);

    const articles = filteredStories
      .map((x, i) => {
        return (
          <StoryPreview
            key={i}
            title={x.title}
            preview={x.preview}
            date={x.date}
            image={x.image}
            body={x.body}
            id={i}
            tags={x.tags}
          />
        );
      })
      .reverse();

    return (
      <section className="stories-container">
        {articles}
      </section>
    );
  }

  renderStories() {
    return;
    <section />;
  }

  handleChange(id, value) {
    const filters = Object.assign(this.state.filters, { [id]: value });

    this.setState({ filters });
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
      <div className="stories-search">
        <div className="search-title">
          {intl.get('SEARCH')}
        </div>
        <TextField
          id="keyword"
          className="search-keyword"
          value={this.state.filters.keyword}
          onChange={this.updateKeyword.bind(this)}
        />
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.state.tags.map(x => ({ value: x, text: x }))}
          id="year"
          label="{ intl.get('YEAR') }"
        />
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.state.tags.map(x => ({ value: x, text: x }))}
          id="country"
          label="{ intl.get('COUNTRY') }"
        />
        <SelectMenu
          onChange={this.handleChange.bind(this)}
          options={this.state.tags.map(x => ({ value: x, text: x }))}
          id="manufacturer"
          label="{ intl.get('MANUFACTURER') }"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="stories-wrapper">
        <section className="stories-search-wrapper">
          {this.renderSearchMenu()}
        </section>
        {!this.props.match.params.id
          ? this.renderPreviews()
          : this.renderFullStory(this.props.match, this.state.stories)}
      </div>
    );
  }
}

Stories.propTypes = {
  match: PropTypes.object,
};

export default Stories;

/*
if () {
      return (
        <section>
          <SelectMenu
            onChange={this.handleChange.bind(this)}
            options={this.state.tags.map(x => ({value: x, text: x}))}
            id="tagFilter"
            label="Select tag"
          />
          {this.renderPreviews()}
        </section>
      );
    } else {
      return (
        <section>

          {this.renderFullStory(this.props.match, this.state.stories)}
        </section>
      );
    }
*/
