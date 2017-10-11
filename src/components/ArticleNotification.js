import React, { Component } from 'react';
import intl from 'react-intl-universal';
import Clear from 'material-ui-icons/Clear';

import './../styles/components/ArticleNotification.css';

export default class ArticleNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };
  }

  closeNotification() {
    this.setState({
      open: false,
    });
  }

  render() {
    return this.state.open && intl.options.currentLocale.includes('en') ? (
      <div
        className="article-notification"
        onClick={this.closeNotification.bind(this)}
      >
        <span>{intl.get('ARTICLES_ONLY_IN_FINNISH')}</span>
        <Clear onClick={this.closeNotification.bind(this)} />
      </div>
    ) : null;
  }
}
