import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

/*
Non-Component-Specific Stylesheets
*/
import './styles/generic.reset.css';
import './styles/objects.containers.css';
import './styles/objects.flex-items.css';
import './styles/elements.headings.css';
import './styles/elements.links.css';

/*
Primary Route Components
*/
import Nav from './components/Nav';
import Home from './components/Home';
import Data from './components/Data';
import Stories from './components/Stories';
import About from './components/About';
import Downloads from './components/Downloads';

/*
Modifier stylesheet to override any preceeding styles when used
*/
import './styles/util.modifiers.css';

const AppRouter = () => (
  <Router>
    <div className="container">
      <Nav />

      <Route exact path="/" component={Home} />
      <Route exact path="/data" component={Data} />
      <Route exact path="/stories" component={Stories} />
      <Route exact path="/about" component={About} />
      <Route exact path="/downloads" component={Downloads} />
    </div>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));
