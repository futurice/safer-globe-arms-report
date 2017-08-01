import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import StoryPreview from './StoryPreview';
import FullStory from './FullStory';
import stories from './../data/stories/stories.csv';
import {csv} from 'd3-request';

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

  renderFullStory({match}) {
    const id = match.params.id;
    return (
      <div>
        <FullStory
          preview="poop"
          image="http://www.topgunprague.com/wp-content/uploads/2011/06/AK-47.png"
          body={id}
          id={id}
          date="09.12.2019"
        />
      </div>
    );
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
        />
      );
    });
  }

  render() {
    return (
      <Router>
        <section>
          <Route
            path="/stories/:id"
            component={this.renderFullStory.bind(this)}
          />
          {this.renderPreviews()}
        </section>
      </Router>
    );
  }
}

export default Stories;
