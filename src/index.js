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
import Login from './components/Login';
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
    PASSWORD: 'Password',
    LOGIN: 'Login',

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

    //Regions
    Pohjois_Afrikka: 'North Africa',
    Saharan_eteläpuolinen_Afrikka: 'Sub-Saharan Africa',
    Pohjois_Amerikka: 'North America',
    Väli_Amerikka_ja_Karibia: 'Central America and the Caribbean',
    Etelä_Amerikka: 'South America',
    Keski_Aasia: 'Central Asia',
    Itä_Aasia: 'East Asia',
    Kaakkois_Aasia: 'Southeast Asia',
    Etelä_Aasia: 'South Asia',
    Euroopan_unioni: 'European Union',
    Muut_Euroopan_maat: 'Other European countries',
    Lähi_itä: 'Middle East',
    Oseania: 'Oceania',

    //Themes
    Sopimus: 'Treaty',
    Ihmisoikeudet: 'Human rights',
    Laiton_asekauppa: 'Illegal arms trade',
    Aseellinen_konflikti: 'Armed conflict',
    Rahoitus: 'Funding',

    //ImpExp
    Tuonti: 'Export',
    Vienti: 'Import',

    //Products
    Sotatuote: 'Military material',
    Siviiliase: 'Civilian arms',
    Kaksikäyttötuote: 'Dual-use goods',
    Kidutusväline: 'Instruments of torture',
    Joukkotuhoaseet: 'Weapons of mass destruction',

    //Article Type
    Tapaukset: 'Cases',
    Taustat: 'Background',

    // Tags
    /*
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
    */

    // Tags
    TAGS_REGION: [
      'Pohjois_Afrikka',
      'Saharan_eteläpuolinen_Afrikka',
      'Pohjois_Amerikka',
      'Väli_Amerikka_ja_Karibia',
      'Etelä_Amerikka',
      'Keski_Aasia',
      'Itä_Aasia',
      'Kaakkois_Aasia',
      'Etelä_Aasia',
      'Euroopan_unioni',
      'Muut_Euroopan_maat',
      'Lähi_itä',
      'Oseania',
    ],
    TAGS_IMPORT_EXPORT: ['Tuonti', 'Vienti'],
    TAGS_THEME: [
      'Sopimus',
      'Ihmisoikeudet',
      'Laiton_asekauppa',
      'Aseellinen_konflikti',
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
    SEARCH: 'Search articles',
    FILTER: 'Filter',
    ARTICLE_TYPE: 'All Article Types',
    YEAR: 'All Years',
    IMPORT_EXPORT: 'Export / Import',
    REGION: 'All Regions',
    THEME: 'All Themes',
    PRODUCT: 'All Products',
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
    TERMS_EXPLAINED: 'About Us',
    Kartassa_Käytetyt_Termit: 'Terms Used in the Map',
    Kuinka_Lukea_Raporttia: 'Reading the Report',
    Miten_Tiedot_on_Esitetty: 'Presentation of Information',
    Lue_Lisää: 'Read More',
    SaferGlobe: 'SaferGlobe',
    Futurice: 'Futurice',

    //DOWNLOAD_DATA: 'Download Data',
    REPORT: 'Finnish Arms Control Report ',
    REPORTOLD: 'Finnish Arms Exports ',
    DATAXLS: 'Finnish Arms Exports Data ',
    REPORTMETADATA: 'Arms Exports Report Metadata ',
    DATAMETADATA: 'Arms Exports Data Metadata ',
    //EVENTS: 'Events',
    //BACKGROUND: 'Background'
  },
  fi: {
    PASSWORD: 'Salasana',
    LOGIN: 'Kirjaudu sisään',

    // Page names & general
    ARMS_REPORT: 'Suomen asevalvontaraportti',
    ABOUT: 'Info',
    STORIES: 'Artikkelit',
    DATA: 'Kartta',
    DOWNLOADS: 'Avoin data',
    NOT_FOUND: 'Heattua sivua ei löytynyt.',
    LOADING_ERROR: 'Sivua ladatessa tapahtui virhe.',
    CLICK: 'Lataa tästä',

    // Notetext
    NOTE:
      '<a href="http://futurice.com/" target="_blank">Futuricen</a> <a href="https://spiceprogram.org/chilicorn-fund/" target="_blank">Chilicorn Fundin</a> ja <a href="https://saferglobe.fi" target="_blank">SaferGloben</a> projekti',

    //Regions
    Pohjois_Afrikka: 'Pohjois-Afrikka',
    Saharan_eteläpuolinen_Afrikka: 'Saharan eteläpuolinen Afrikka',
    Pohjois_Amerikka: 'Pohjois-Amerikka',
    Väli_Amerikka_ja_Karibia: 'Väli-Amerikka ja Karibia',
    Etelä_Amerikka: 'Etelä-Amerikka',
    Keski_Aasia: 'Keski-Aasia',
    Itä_Aasia: 'Itä-Aasia',
    Kaakkois_Aasia: 'Kaakkois-Aasia',
    Etelä_Aasia: 'Etelä-Aasia',
    Euroopan_unioni: 'Euroopan unioni',
    Muut_Euroopan_maat: 'Muut Euroopan maat',
    Lähi_itä: 'Lähi-itä',
    Oseania: 'Oseania',

    //Themes
    Sopimus: 'Sopimus',
    Ihmisoikeudet: 'Ihmisoikeudet',
    Laiton_asekauppa: 'Laiton asekauppa',
    Aseellinen_konflikti: 'Aseellinen konflikti',
    Rahoitus: 'Rahoitus',

    //ImpExp
    Tuonti: 'Tuonti',
    Vienti: 'Vienti',

    //Products
    Sotatuote: 'Sotatuote',
    Siviiliase: 'Siviiliase',
    Kaksikäyttötuote: 'Kaksikäyttötuote',
    Kidutusväline: 'Kidutusväline',
    Joukkotuhoaseet: 'Joukkotuhoaseet',

    //Article Type
    Tapaukset: 'Tapaukset',
    Taustat: 'Taustat',

    // Tags
    TAGS_REGION: [
      'Pohjois_Afrikka',
      'Saharan_eteläpuolinen_Afrikka',
      'Pohjois_Amerikka',
      'Väli_Amerikka_ja_Karibia',
      'Etelä_Amerikka',
      'Keski_Aasia',
      'Itä_Aasia',
      'Kaakkois_Aasia',
      'Etelä_Aasia',
      'Euroopan_unioni',
      'Muut_Euroopan_maat',
      'Lähi_itä',
      'Oseania',
    ],
    TAGS_IMPORT_EXPORT: ['Tuonti', 'Vienti'],
    TAGS_THEME: [
      'Sopimus',
      'Ihmisoikeudet',
      'Laiton_asekauppa',
      'Aseellinen_konflikti',
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
    YEAR: 'Kaikki vuosi',
    IMPORT_EXPORT: 'Tuonti / vienti',
    REGION: 'Kaikki alue',
    THEME: 'Kaikki teema',
    PRODUCT: 'Kaikki tuote',
    ARTICLE_TYPE: 'Kaikki artikkelityyppi',

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
    TERMS_EXPLAINED: 'Meistä',
    Kartassa_Käytetyt_Termit: 'Kartassa käytetyt termit',
    Kuinka_Lukea_Raporttia: 'Kuinka lukea raporttia',
    Miten_Tiedot_on_Esitetty: 'Miten tiedot on esitetty',
    Lue_Lisää: 'Lue lisää',
    SaferGlobe: 'SaferGlobe',
    Futurice: 'Futurice',

    //DOWNLOAD_DATA: 'Lataa tiedot',
    REPORT: 'Suomen asevalvontaraportti ',
    REPORTOLD: 'Suomen asevienti ',
    DATAXLS: 'Suomen asevientidata ',
    REPORTMETADATA: 'Asevalvontaraportin laatuseloste',
    DATAMETADATA: 'Asevientitietokannan metadata',
    //EVENTS: 'Tapahtumat',
    //BACKGROUND: 'Taustaa',
  },
};

class AppRouter extends Component {
  constructor() {
    super();
    this.state = {
      initDone: false,
      isLoggedIn: Boolean(sessionStorage.getItem('isLoggedIn')) | false,
    };
  }

  loadLocales() {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    const userLocale = intl.determineLocale({ urlLocaleKey: 'lang' });

    intl
      .init({
        currentLocale: userLocale in locales ? userLocale : 'en-US',
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

    if (
      process.env.REACT_APP_PASSWORD_PROTECTED === 'true' &&
      !this.state.isLoggedIn
    ) {
      return (
        <Login
          onLogin={() => {
            sessionStorage.setItem('isLoggedIn', 'true');
            this.setState({ isLoggedIn: true });
          }}
        />
      );
    } else if (this.state.initDone) {
      return (
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

          {isModal ? <Route path="/articles/:id" component={Modal} /> : null}
        </div>
      );
    } else {
      return null;
    }
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
