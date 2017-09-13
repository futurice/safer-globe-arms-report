import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import intl from 'react-intl-universal';

/*
Non-Component-Specific Stylesheets
*/
import './styles/reset.css';
import './styles/containers.css';
import './styles/flex-styles.css';
import './styles/headings.css';
import './styles/text-types.css';
import './styles/scroll.css';

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

const locales = {
  'en-US': {
    DATA: 'Map',
    DOWNLOAD_DATA: 'Download Data',
    STORIES: 'Articles',
    ABOUT: 'Info',
    DOWNLOADS: 'Open Data',
    TOTALS: 'Totals',
    TOTAL: 'Total',
    DEFENCE: 'Defence',
    CIVILIAN: 'Civilian',
    TOP5COUNTRIES: 'Top 5 Countries',
    WORLD: 'World',
    RESET_ZOOM: 'Reset zoom',
    FINNISH_ARMS_EXPORT: 'Finnish Arms Export',
    PEACEFUL: 'Peacful',
    RESTLESS: 'Restless',
    NOT_AVAILABLE: 'Not available',
  },
  fi: {
    DATA: 'Kartta',
    DOWNLOAD_DATA: 'Lataa tiedot',
    STORIES: 'Artikkelit',
    ABOUT: 'Info',
    DOWNLOADS: 'Avoin Data',
    TOTALS: 'Kokonaissumma',
    TOTAL: 'Yhteensä',
    DEFENCE: 'Sota-aseet',
    CIVILIAN: 'Siviiliaseet',
    TOP5COUNTRIES: 'Suurimmat 5 maata',
    WORLD: 'World',
    RESET_ZOOM: 'Nollaa tarkennus',
    FINNISH_ARMS_EXPORT: 'Suomen Asevienti',
    PEACEFUL: 'Rauhallinen',
    RESTLESS: 'Rauhaton',
    NOT_AVAILABLE: 'Ei saatavilla',
  },
};

class AppRouter extends Component {
  constructor() {
    super();
    this.state = { initDone: false };
  }

  loadLocales() {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app

    intl
      .init({
        currentLocale: intl.determineLocale({ urlLocaleKey: 'lang' }),
        locales,
      })
      .then(() => {
        this.setState({ initDone: true });
      });
  }

  componentDidMount() {
    this.loadLocales();
  }

  render() {
    return (
      this.state.initDone &&
      <Router>
        <div>
          <div className="container">
            <Route path="/" render={props => <Nav {...props} />} />

            <Route exact path="/" component={Data} />
            <Route
              exact
              path="/stories"
              render={props => <Stories {...props} />}
            />
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
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));
