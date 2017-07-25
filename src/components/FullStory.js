import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './../styles/components/Stories.css';

class FullStory extends Component {
  render() {
    return (
      <section className="story-container flex-container">
        <div className="story-text">
          <span className="story-year">{this.props.story.date}</span>
          <div className="story-text">
            <h3>{this.props.story.title}</h3>
            <p>
              {this.props.story.preview}
            </p>
            <p>
              {this.props.story.preview}
            </p>
            <p>
              {this.props.story.preview}
            </p>
          </div>
        </div>
        <img
          className="story-image"
          src={this.props.story.image}
          alt={this.props.story.title}
        />
      </section>
    );
  }
}

FullStory.propTypes = {
  story: PropTypes.object.required,
};

export default FullStory;
