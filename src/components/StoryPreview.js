import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './../styles/components/Stories.css';

class StoryPreview extends Component {
  render() {
    const testStory = {
      id: 1234,
      image: 'http://one-europe.info/user/files/Hanna/Global%20Peace%20Index.jpg',
      date: '27.11.2016',
      title: 'Misesn Lilleyawn utn Wiahent',
      story: 'Story Text',
    };

    return (
      <section className="story-container flex-container">
        <div className="story-text">
          <span className="story-year">{this.props.date}</span>
          <div className="story-text">
            <h3>{this.props.title}</h3>
            <p>
              {this.props.preview}
            </p>
            <div className="read-more">
              <Link to="/stories/01">Continue Reading</Link>
            </div>
          </div>
        </div>
        <img
          className="story-image"
          src={this.props.image}
          alt={this.props.title}
        />
      </section>
    );
  }
}

StoryPreview.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default StoryPreview;
