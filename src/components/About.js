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
      const hash = location.hash;

      if (!hash.length) {
        this.loadDocument(page);
      }
    });
  }

  componentDidMount() {
    const page = this.props.match.params.page || this.state.navigation[0].path;
    const hash = this.props.location.hash.replace(/^#/, '') || null;

    this.loadDocument(page, hash);
  }

  compoenntWillUnmount() {
    this.xhr.abort();
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
            <div key={i} className="about-main-link">
              <NavLink
                to={`/about/${item.path}`}
                className={atRoot && i === 0 ? ' active' : null}
              >
                {intl.get(item.name)}
              </NavLink>
            </div>

            {item.anchors.map((sub, j) =>
              <div key={j} className="about-sub-link">
                <a href={`#${sub.id}`}>
                  {intl.get(sub.name)}
                </a>
              </div>
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
