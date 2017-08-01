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
  body: PropTypes.string.required,
  date: PropTypes.string.required,
  title: PropTypes.string.required,
  preview: PropTypes.string.required,
  body: PropTypes.object.required,
  image: PropTypes.string.required,
};

export default FullStory;
