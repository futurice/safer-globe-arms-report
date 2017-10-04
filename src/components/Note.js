import React, { Component } from 'react';
import intl from 'react-intl-universal';

import './../styles/components/Note.css';

export default class Note extends Component {
  render() {
    return (
      <div className="footnote">
        <span dangerouslySetInnerHTML={{ __html: intl.get('NOTE') }} />
      </div>
    );
  }
}
