import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ShareButtons, generateShareIcon } from 'react-share';

import './../styles/components/FullStory.css';
import ReactMarkdown from 'react-markdown';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

class FullStory extends Component {
  renderTags() {
    return this.props.tags
      .split(',')
      .reduce((ary, cur) => {
        ary.push(`#${cur}`);

        return ary;
      }, [])
      .join(', ');
  }

  render() {
    const articleLink = window.location.href;

    return (
      <section className="full-story-container flex-container">
        <div className="story-image">
          <img src={this.props.image} alt={this.props.title} />
          <span className="story-year">
            {this.props.date}
          </span>
          <span className="story-tags">
            {this.renderTags()}
          </span>
        </div>
        <div className="story-share">
          <FacebookShareButton
            url={articleLink}
            title={this.props.title}
            description={this.props.preview}
            picture={this.props.image}
          >
            <FacebookIcon size={38} round={false} />
          </FacebookShareButton>
          <TwitterShareButton
            url={articleLink}
            title={this.props.title}
            hastag={this.props.tags}
          >
            <TwitterIcon size={38} round={false} />
          </TwitterShareButton>
        </div>
        <div className="story-text">
          <h3>
            {this.props.title}
          </h3>
          <ReactMarkdown source={this.props.body} />
        </div>
      </section>
    );
  }
}

FullStory.propTypes = {
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default FullStory;
