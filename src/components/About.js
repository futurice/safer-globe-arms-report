import React, { Component } from 'react';
import { withRouter } from 'react-router';
import intl from 'react-intl-universal';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';

import './../styles/components/About.css';

class About extends Component {
  static xhr = null;

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      hash: null,
      page: null,
      body: null,
      navigation: [
        {
          path: 'info',
          file: 'info',
          name: 'INFO',
          anchors: [
            {
              id: 'terms',
              name: 'TERMS',
            },
            {
              id: 'how-to-read',
              name: 'HOW_TO_READ',
            },
            {
              id: 'how-data-is-shown',
              name: 'HOW_GATHERED',
            },
            {
              id: 'read-more',
              name: 'READ_MORE',
            },
            {
              id: 'safer-globe',
              name: 'SAFER_GLOBE',
            },
          ],
        },
      ],
    };

    this.props.history.listen((location, action) => {
      const page = location.pathname.replace('/about/', '');
      const hash = location.hash;

      if (!hash.length) {
        this.loadDocument(page);
      }
    });
  }

  componentDidMount() {
    const page = 'info'; //this.props.match.params.page || this.state.navigation[0].path;
    const hash = this.props.location.hash.replace(/^#/, '') || null;
    this.loadDocument(page, hash);
  }

  componentWillUnmount() {
    this.xhr.abort();
  }

  loadDocument(name, hash = null) {
    const lang = intl.options.currentLocale.includes('en') ? 'en' : 'fi';

    try {
      const url = require(`../data/about/${name}_${lang}.md`);

      if (this.state.page === name) {
        if (this.state.hash !== hash) {
          this.setState({ hash });
        }

        return;
      }

      let headers = new Headers();
      headers.append('Content-Type', 'text/plain');
      this.setState({
        loading: true,
        hash: null,
      });

      this.xhr = fetch(url, { headers })
        .then(response => response.text())
        .then(response => {
          this.setState({
            body: response,
            hash,
            page: name,
            error: false,
            loading: false,
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false,
            page: null,
          });
        });

      return this.xhr;
    } catch (e) {
      this.setState({
        error: true,
        loading: false,
      });
    }
  }

  renderMenu() {
    const itemCount = this.state.navigation.length - 1;
    const atRoot = this.props.location.pathname === '/about';
    //const hashDefined = this.props.location.hash;

    return (
      <div className="about-menu box-shadow">
        {this.state.navigation.map((item, i) =>
          <div key={i}>
            {item.anchors.map((sub, j) =>
              <div key={j} className="about-sub-link">
                <a href={`#${sub.id}`}>
                  {intl.get(sub.name)}
                </a>
              </div>,
            )}

            {i < itemCount ? <Divider className="divider" /> : null}
          </div>,
        )}
      </div>
    );
  }

  render() {
    if (this.state.hash && this.state.body) {
      setTimeout(() => {
        const headerHeight = document.querySelector('nav').offsetHeight;
        const hash = this.props.location.hash.replace(/^#/, '') || null;
        const elem = document.querySelector(`a[name=${hash}]`);

        if (elem) {
          document.querySelector('html').scrollTop = elem.offsetTop;
        }
      }, 200);
    }

    return (
      <div className="stories-wrapper flex-container-row">
        <section className="left-menu">
          {this.renderMenu()}
        </section>

        {this.state.loading ? <CircularProgress className="loading" /> : null}
        {this.state.error
          ? <div className="not-found">
              {intl.get('NOT_FOUND')}
            </div>
          : null}

        {this.state.body
          ? <section className="text-box flex-container box-shadow">
              <ReactMarkdown className="md" source={this.state.body || ''} />
            </section>
          : null}
      </div>
    );
  }
}

export default withRouter(About);
