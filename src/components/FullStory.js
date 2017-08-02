import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './../styles/components/Stories.css';

class FullStory extends Component {
  render() {
    return (
      <section className="story-container flex-container">
        <div className="story-text">
          <span className="story-year">{this.props.date}</span>
          <div className="story-text">
            <h3>{this.props.title}</h3>
            <p>
              {this.props.preview}
            </p>
            <p>
              {this.props.preview}
            </p>
            <p>
              {this.props.preview}
            </p>
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

FullStory.propTypes = {
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FullStory;
