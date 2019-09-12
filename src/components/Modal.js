import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import FullStory from './FullStory';

import './../styles/components/Modal.css';

const cross = require('./../assets/cross.svg');

const ESCAPE = 27;

class Modal extends Component {
  constructor() {
    super();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCrossClick = this.handleCrossClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(ev) {
    const { history } = this.props;

    if (ev.keyCode === ESCAPE) {
      history.goBack();
    }
  }

  handleCrossClick() {
    const { history } = this.props;

    history.goBack();
  }

  render() {
    const { history } = this.props;

    return (
      <div className="modal-container">
        <span className="modal-backdrop" onClick={history.goBack} />
        <div className="modal-inner">
          <img
            src={cross}
            className="cross-icon"
            onClick={this.handleCrossClick}
          />

          <Route
            exact
            path="/articles/:id"
            render={props => <FullStory {...props} isModal={true} />}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
