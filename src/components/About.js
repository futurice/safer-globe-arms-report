import React, { Component } from 'react';
import { withRouter } from 'react-router';
import intl from 'react-intl-universal';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';

import './../styles/components/About.css';

class About extends Component {
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
          path: 'terms-explained',
          file: 'terms-explained',
          name: 'TERMS_EXPLAINED',
          anchors: [
            {
              id: 'gpi',
              name: 'GPI',
            },
          ],
        },
        {
          path: 'page2',
          file: 'terms-explained',
          name: 'TERMS_EXPLAINED',
          anchors: [
            {
              id: 'gpi',
              name: 'GPI',
            },
          ],
        },
      ],
    };

    this.props.history.listen((location, action) => {
      const page = location.pathname.replace('/about/', '');

      this.loadDocument(page);
    });
  }

  componentDidMount() {
    const page = this.props.match.params.page || this.state.navigation[0].path;
    const hash = this.props.location.hash.replace(/^#/, '') || null;

    this.loadDocument(page, hash);
  }

  loadDocument(name, hash = null) {
    const lang = intl.determineLocale().includes('en') ? 'en' : 'fi';

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

      return fetch(url, { headers })
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
    } catch (e) {
      this.setState({
        error: true,
        loading: false,
      });
    }
  }

  renderMenu() {
    const itemCount = this.state.navigation.length - 1;

    return (
      <div className="about-content-wrapper about-menu box-shadow">
        {this.state.navigation.map((item, i) =>
          <div key={i}>
            <div key={i}>
              <NavLink to={`/about/${item.path}`} className="about-main-link">
                {intl.get(item.name)}
              </NavLink>
            </div>
            {item.anchors.map((sub, j) =>
              <div key={j}>
                <a href={`#${sub.id}`} className="about-sub-link">
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
        const elem = document.querySelector(`a[name=${this.state.hash}]`);

        if (elem) {
          elem.scrollIntoView();
        }
      }, 100);
    }

    return (
      <div className="stories-wrapper">
        <section className="stories-search-wrapper">
          {this.renderMenu()}
        </section>

        {this.state.loading ? <CircularProgress className="loading" /> : null}
        {this.state.error
          ? <div className="not-found">
              {intl.get('NOT_FOUND')}
            </div>
          : null}

        {this.state.body
          ? <section className="full-story-container flex-container box-shadow">
              <ReactMarkdown className="md" source={this.state.body || ''} />
            </section>
          : null}
      </div>
    );
  }
}

export default withRouter(About);
