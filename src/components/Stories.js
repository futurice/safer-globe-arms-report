import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import StoryPreview from './StoryPreview';
import FullStory from './FullStory';

class Stories extends Component {
  render() {
    return (
      <Router>
        <section>
          <StoryPreview
            title="Misesn Lilleyawn utn Wiahent"
            preview="In accumsan ullamcorper facilisis. Duis vel placerat nulla. Duis vel quam eu turpis consectetur maximus vitae eu nulla. Nullam non bibendum ante, sed vulputate libero. Suspendisse et arcu et felis scelerisque mollis vel at dolor. Curabitur vulputate tellus vitae dapibus maximus. Etiam condimentum nisl maximus, eleifend ex id, porta nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse at neque pharetra, rutrum risus non, condimentum velit. Suspendisse sagittis metus eu arcu pulvinar condimentum."
            date="27.11.2016"
            image="https://www.walldevil.com/wallpapers/a86/wallpaper-gun-germany-outfitting-bundeswehr-soldier-assault-machine-rifle-wallpapers-archives.jpg"
          />
          <StoryPreview
            title="Misesn Lilleyawn utn Wiahent"
            preview="In accumsan ullamcorper facilisis. Duis vel placerat nulla. Duis vel quam eu turpis consectetur maximus vitae eu nulla. Nullam non bibendum ante, sed vulputate libero. Suspendisse et arcu et felis scelerisque mollis vel at dolor. Curabitur vulputate tellus vitae dapibus maximus. Etiam condimentum nisl maximus, eleifend ex id, porta nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse at neque pharetra, rutrum risus non, condimentum velit. Suspendisse sagittis metus eu arcu pulvinar condimentum."
            date="27.11.2016"
            image="http://www.cyborgdb.org/images/boe3.jpg"
          />
          <StoryPreview
            title="Misesn Lilleyawn utn Wiahent"
            preview="In accumsan ullamcorper facilisis. Duis vel placerat nulla. Duis vel quam eu turpis consectetur maximus vitae eu nulla. Nullam non bibendum ante, sed vulputate libero. Suspendisse et arcu et felis scelerisque mollis vel at dolor. Curabitur vulputate tellus vitae dapibus maximus. Etiam condimentum nisl maximus, eleifend ex id, porta nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse at neque pharetra, rutrum risus non, condimentum velit. Suspendisse sagittis metus eu arcu pulvinar condimentum."
            date="27.11.2016"
            image="http://one-europe.info/user/files/Hanna/Global%20Peace%20Index.jpg"
          />

          <Route path="/stories/:id" component={FullStory} />
        </section>
      </Router>
    );
  }
}

export default Stories;
