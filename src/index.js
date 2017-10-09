import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import intl from 'react-intl-universal';
import classNames from 'classnames';

/*
Non-Component-Specific Stylesheets
*/
import './styles/reset.css';
import './styles/containers.css';
import './styles/flex-styles.css';
import './styles/headings.css';
import './styles/text-types.css';
import './styles/md.css';
import './styles/table.css';
import './styles/scroll.css';

/*
Primary Route Components
*/
import Nav from './components/Nav';

// import Home from './components/Home';
import Data from './components/Data';
import Stories from './components/Stories';
import FullStory from './components/FullStory';
import About from './components/About';
import Downloads from './components/Downloads';
// import Footer from './components/Footer';

/*
Wrapper Components
*/
import Modal from './components/Modal';

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
    // Page names & general
    ARMS_REPORT: 'Finnish Arms Control Report',
    ABOUT: 'Info',
    STORIES: 'Articles',
    DATA: 'Map',
    DOWNLOADS: 'Open Data',
    NOT_FOUND: 'The requested page could not be found.',
    LOADING_ERROR: 'An error occurred while loading page.',
    CLICK: 'Click to download',

    // Notetext
    NOTE:
      'Project by <a href="http://futurice.com/" target="_blank">Futurice’s</a> <a href="https://spiceprogram.org/chilicorn-fund/" target="_blank">Chilicorn Fund</a> and <a href="https://saferglobe.fi/en/" target="_blank">SaferGlobe</a>',

    // Tags
    TAGS_REGION: [
      'North Africa',
      'Sub-Saharan Africa',
      'North America',
      'Central America and the Caribbean',
      'South America',
      'Central Asia',
      'East Asia',
      'Southeast Asia',
      'South Asia',
      'European Union',
      'Other European countries',
      'Middle East',
      'Oceania',
    ],
    TAGS_IMPORT_EXPORT: ['Export', 'Import'],
    TAGS_THEME: [
      'Treaty',
      'Human rights',
      'Illegal arms trade',
      'Armed conflict',
      'Funding',
    ],
    TAGS_PRODUCT: [
      'Military material',
      'Civilian arms',
      'Dual-use goods',
      'Instruments of torture',
      'Weapons of mass destruction',
    ],
    TAGS_ARTICLE_TYPE: ['Cases', 'Background'],

    // Articles page
    SEARCH: 'Search articles',
    FILTER: 'Filter',
    ARTICLE_TYPE: 'Article type',
    YEAR: 'Year',
    IMPORT_EXPORT: 'Export / Import',
    REGION: 'Region',
    THEME: 'Theme',
    PRODUCT: 'Product',
    ARTICLES_ONLY_IN_FINNISH: 'Articles are available only in Finnish.',

    // Article page
    BACK_TO_ARTICLES: 'Back to articles',
    TEXT_BY: 'Text by',

    // Map page
    DOWNLOAD_DATA: 'Download Data',
    TOTALS: 'Totals',
    TOTAL: 'Total',
    DEFENCE: 'Military Material',
    CIVILIAN: 'Civilian Arms',
    TOP5COUNTRIES: 'Top 5 Countries',
    WORLD: 'World',
    RESET_ZOOM: 'Reset zoom',
    PEACEFUL: 'More Peaceful',
    RESTLESS: 'Less Peaceful',
    NOT_AVAILABLE: 'Not available',
    REMARKS: 'Remaks',
    ALL_COUNTRY_ARTICLES: 'All articles of {countryName}',
    GPI: 'Global Peace Index',
    HOWTOREAD: 'Note: ',
    HOWTOREADTEXT: 'Exports are shown with the minimum value of 1 px.',
    FINNISH_ARMS_EXPORT: 'Finnish Arms Export',

    // About page
    TERMS_EXPLAINED: 'Terms explained',

    //DOWNLOAD_DATA: 'Download Data',
    //EVENTS: 'Events',
    //BACKGROUND: 'Background'
  },
  fi: {
    // Page names & general
    ARMS_REPORT: 'Suomen Asevalvontaraportti',
    ABOUT: 'Info',
    STORIES: 'Artikkelit',
    DATA: 'Kartta',
    DOWNLOADS: 'Avoin Data',
    NOT_FOUND: 'Heattua sivua ei löytynyt.',
    LOADING_ERROR: 'Sivua ladatessa tapahtui virhe.',
    CLICK: 'Lataa tästä',

    // Notetext
    NOTE:
      '<a href="http://futurice.com/" target="_blank">Futuricen</a> <a href="https://spiceprogram.org/chilicorn-fund/" target="_blank">Chilicorn Fundin</a> ja <a href="https://saferglobe.fi" target="_blank">SaferGloben</a> projekti',

    // Tags
    TAGS_REGION: [
      'Pohjois-Afrikka',
      'Saharan eteläpuolinen Afrikka',
      'Pohjois-Amerikka',
      'Väli-Amerikka ja Karibia',
      'Etelä-Amerikka',
      'Keski-Aasia',
      'Itä-Aasia',
      'Kaakkois-Aasia',
      'Etelä-Aasia',
      'Euroopan unioni',
      'Muut Euroopan maat',
      'Lähi-itä',
      'Oseania',
    ],
    TAGS_IMPORT_EXPORT: ['Tuonti', 'Viesti'],
    TAGS_THEME: [
      'Sopimus',
      'Ihmisoikeudet',
      'Laiton asekauppa',
      'Aseellinen konflikti',
      'Rahoitus',
    ],
    TAGS_PRODUCT: [
      'Sotatuote',
      'Siviiliase',
      'Kaksikäyttötuote',
      'Kidutusväline',
      'Joukkotuhoaseet',
    ],
    TAGS_ARTICLE_TYPE: ['Tapaukset', 'Taustat'],

    // Articles page
    SEARCH: 'Etsi artikkeleita',
    FILTER: 'Suodata',
    YEAR: 'Vuosi',
    IMPORT_EXPORT: 'Tuomi / vienti',
    REGION: 'Alue',
    THEME: 'Teema',
    PRODUCT: 'Tuote',
    ARTICLE_TYPE: 'Artikkelityyppi',

    // Article page
    BACK_TO_ARTICLES: 'Takaisin artikkeleihin',
    TEXT_BY: 'Teksti',

    // Map page
    TOTALS: 'Kokonaissumma',
    TOTAL: 'Yhteensä',
    DEFENCE: 'Sotatuotteet',
    CIVILIAN: 'Siviiliaseet',
    TOP5COUNTRIES: '5 suurinta vientimaata',
    WORLD: 'Maailma',
    RESET_ZOOM: 'Nollaa tarkennus',
    PEACEFUL: 'Rauhallinen',
    RESTLESS: 'Rauhaton',
    NOT_AVAILABLE: 'Ei saatavilla',
    REMARKS: 'Huomioita',
    ALL_COUNTRY_ARTICLES: 'Kaikki {countryName} -artikkelit',
    GPI: 'Maailman rauhanindeksi',
    HOWTOREAD: 'Huomautus: ',
    HOWTOREADTEXT: 'Viennin vähimmäiskorkeus kaaviossa on 1 px.',
    FINNISH_ARMS_EXPORT: 'Suomen asevienti',

    // About page
    TERMS_EXPLAINED: 'Termit selitettyinä',

    //DOWNLOAD_DATA: 'Lataa tiedot',
    //EVENTS: 'Tapahtumat',
    //BACKGROUND: 'Taustaa',
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

  componentWillUpdate(nextProps) {
    const { location } = this.props;

    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = location;
    }
  }

  render() {
    const { location } = this.props;

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location && // not initial render
      this.previousLocation &&
      this.previousLocation.key !== location.key
    ); // avoid modal on direct routes

    return (
      this.state.initDone && (
        <div>
          <div
            className={classNames('container', {
              'container--behind-a-modal': isModal,
            })}
          >
            <Route path="/" render={props => <Nav {...props} />} />

            <div className="content-wrapper">
              <Switch location={isModal ? this.previousLocation : location}>
                <Route exact path="/" component={Data} />
                <Route
                  exact
                  path="/articles"
                  render={props => <Stories {...props} />}
                />
                <Route
                  exact
                  path="/articles/:id"
                  render={props => <FullStory {...props} />}
                />
                <Route exact path="/about" component={About} />
                <Route path="/about/:page" component={About} />
                <Route exact path="/downloads" component={Downloads} />
              </Switch>
            </div>
          </div>

          {isModal ? <Route path="/stories/:id" component={Modal} /> : null}
        </div>
      )
    );
  }
}

/*
We have to wrap our main app component in a generic <Route /> like this
so we get the `location` in props
*/
const AppRouterWrap = () => (
  <Router>
    <Route component={AppRouter} />
  </Router>
);

ReactDOM.render(<AppRouterWrap />, document.getElementById('root'));
