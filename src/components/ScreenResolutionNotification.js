import React, { Component } from 'react';
import Card from 'material-ui/Card';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import intl from 'react-intl-universal';

class ScreenResolutionNotification extends Component {
  constructor() {
    super();

    this.handleWindowResize = throttle(
      this.handleWindowResize.bind(this), 500
    );

    this.state = {
      showWarning: false
    };
  }

  handleWindowResize() {
    const { minWidth } = this.props;

    const newShowWarning = window.innerWidth < minWidth;

    if (this.state.showWarning !== newShowWarning) {
      this.setState({
        showWarning: newShowWarning
      });
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  render() {
    const { showWarning } = this.state;
    const { minWidth, children } = this.props;

    return showWarning ? (
      <Card className="login-box">
        <p>{intl.get('SCREEN_RESOLUTION_WARNING', { minResolution: minWidth })}</p>
      </Card>
    ) : children;
  }
}

ScreenResolutionNotification.propTypes = {
  minWidth: PropTypes.number.isRequired,
};

export default ScreenResolutionNotification;
