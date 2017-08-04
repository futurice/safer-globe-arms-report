import React, {Component} from 'react';
import StoryPreview from './StoryPreview';
import FullStory from './FullStory';
import stories from './../data/stories/stories.csv';
import {csv} from 'd3-request';
import PropTypes from 'prop-types';
import SelectMenu from './forms/SelectMenu';

class Stories extends Component {
  constructor() {
    super();
    this.state = {
      stories: [],
      filteredStories: [],
      tags: [],
    };
  }

  componentWillMount() {
    csv(stories, (error, data) => {
      if (error) {
        this.setState({loadError: true});
      }
      const tags = data.map(x => x.tags.split(','));
      this.setState({
        stories: data,
        filteredStories: data,
        tags: [].concat.apply([''], tags),
      });
    });
  }

  renderFullStory(match, stories) {
    const fullStory = stories.find(x => x.id === match.params.id);
    if (fullStory) {
      return (
        <div>
          <FullStory
            title={fullStory.title}
            preview={fullStory.preview}
            image={fullStory.image}
            body={fullStory.body}
            id="id"
            date={fullStory.date}
          />
        </div>
      );
    } else {
      return <div>Article not found.</div>;
    }
  }

  renderPreviews() {
    return this.state.filteredStories.map((x, i) => {
      return (
        <StoryPreview
          key={i}
          title={x.title}
          preview={x.preview}
          date={x.date}
          image={x.image}
          body={x.body}
          id={x.id}
          tags={x.tags}
        />
      );
    });
  }

  handleChange(e) {
    const filteredStories = e.target.value.length === 0
      ? this.state.stories
      : this.state.stories.filter(x =>
          x.tags.split(',').includes(e.target.value)
        );
    this.setState({filteredStories});
  }

  render() {
    if (!this.props.match.params.id) {
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
  }
}

Stories.propTypes = {
  match: PropTypes.object,
};

export default Stories;
