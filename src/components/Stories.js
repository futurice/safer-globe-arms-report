import React, {Component} from 'react';
import StoryPreview from './StoryPreview';
import FullStory from './FullStory';
import stories from './../data/stories/stories.csv';
import {csv} from 'd3-request';
import PropTypes from 'prop-types';

class Stories extends Component {
  constructor() {
    super();
    this.state = {
      stories: [],
    };
  }

  componentWillMount() {
    csv(stories, (error, data) => {
      if (error) {
        this.setState({loadError: true});
      }
      this.setState({stories: data});
    });
  }

  renderFullStory(match, stories) {
    const id = parseInt(match.params.id, 10);
    const fullStory = stories.find(x => x.id === id);
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
    return this.state.stories.map((x, i) => {
      return (
        <StoryPreview
          key={i}
          title={x.title}
          preview={x.preview}
          date={x.date}
          image={x.image}
          body={x.body}
          id={x.id}
        />
      );
    });
  }

  render() {
    if (!this.props.match.params.id) {
      return (
        <section>
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
