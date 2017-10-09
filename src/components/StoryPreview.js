import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import './../styles/components/StoryPreview.css';

const img = require('./../assets/articleImages/asevarustelun_lapinakyvyys_lisaa_luottamusta_big.jpg');
class StoryPreview extends Component {
  renderTags() {
    return this.props.tags
      .split(',')
      .reduce((ary, cur) => {
        ary.push(`#${cur.trim()}`);

        return ary;
      }, [])
      .join(' ');
  }

  render() {
    return (
      <article className="story-container flex-container box-shadow-content">
        <Link className="article-link" to={'/articles/' + this.props.id}>
          <img className="story-image" src={img} alt="" aria-hidden="true" />
          <span className="story-date">{this.props.date}</span>
          <div className="story-text">
            <h3>{this.props.title}</h3>
            <ReactMarkdown source={this.props.body} />
          </div>
          <div className="story-preview__tags">{this.renderTags()}</div>
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
