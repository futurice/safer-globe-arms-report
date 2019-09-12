import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';

import './../styles/components/StoryPreview.css';

class StoryPreview extends Component {
  renderTags() {
    return this.props.tags.split(',').reduce((ary, cur) => {
      if (isNaN(cur)) {
        ary.push(`${intl.get(cur.trim())}`);
      } else {
        ary.push(`${cur.trim()}`);
      }
      return ary;
    }, []);
  }

  render() {
    let tags = this.renderTags().map(d => <div className={'tags'}>{d}</div>);
    return (
      <article className="story-container flex-container box-shadow-content">
        <Link className="article-link" to={'/articles/' + this.props.id + '/'}>
          <img
            className="story-image"
            src={this.props.image}
            alt=""
            aria-hidden="true"
          />
          <span className="story-date">{this.props.date}</span>
          <div className="story-text">
            <h3>{this.props.title}</h3>
          </div>
          <div className="story-preview__tags">{tags}</div>
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
