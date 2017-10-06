import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import './../styles/components/StoryPreview.css';

class StoryPreview extends Component {
  renderTags() {
    return this.props.tags
      .split(',')
      .reduce((ary, cur) => {
        ary.push(`#${cur}`);

        return ary;
      }, [])
      .join(' ');
  }

  render() {
    return (
      <article className="story-container flex-container box-shadow-content">
        <Link to={'/stories/' + this.props.id}>
          <img
            className="story-image"
            src={this.props.image}
            alt={this.props.title}
          />
          <span className="story-date">{this.props.date}</span>
          <div className="story-text">
            <h3>{this.props.title}</h3>
            <ReactMarkdown source={this.props.body} />
            <div className="story-preview__tags">{this.renderTags()}</div>
          </div>
        </Link>
      </article>
    );
  }
}

StoryPreview.propTypes = {
  title: PropTypes.string.isRequired,
  engPreview: PropTypes.string,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
};

export default StoryPreview;
