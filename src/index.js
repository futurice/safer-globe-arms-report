import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

/*
Non-Component-Specific Stylesheets
*/
import './styles/reset.css';
import './styles/containers.css';
import './styles/flex-styles.css';
import './styles/headings.css';
import './styles/text-types.css';

/*
Primary Route Components
*/
import Nav from './components/Nav';
// import Home from './components/Home';
import Data from './components/Data';
import Stories from './components/Stories';
import About from './components/About';
import Downloads from './components/Downloads';
// import Footer from './components/Footer';

/*
Modifier stylesheet to override any preceeding styles when used
*/
import './styles/modifiers.css';

/*
The project is using React Router 4
        <Route exact path="/stories" component={Stories} />
Docs can be found here: https://reacttraining.com/react-router/web/
*/
const AppRouter = () => (
  <Router>
    <div>
      <div className="container">
        <Nav />

        <Route exact path="/" component={Data} />
        <Route exact path="/stories" render={props => <Stories {...props} />} />
        <Route
          exact
          path="/stories/:id"
          render={props => <Stories {...props} />}
        />
        <Route exact path="/about" component={About} />
        <Route exact path="/downloads" component={Downloads} />

      </div>
    </div>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));
