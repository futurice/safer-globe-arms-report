import React, { Component } from 'react';
import intl from 'react-intl-universal';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import PropTypes from 'prop-types';

import './../styles/components/Login.css';

class Login extends Component {
  render() {
    const currentLocale = intl.determineLocale({ urlLocaleKey: 'lang' });

    return (
      <Card className="login-box">
        <h1>EMBARGO.</h1>

        <div>
          <p>
            Tämä verkkosivusto ja sivustolta löytyvä aineisto eivät ole julkisia
            ennen ma 23. lokakuuta 2017 kello 16:00. Ennen tätä ajankohtaa
            sivustolle pääsee salasanalla. Sivuston tietoihin perustuvia juttuja
            ei saa julkaista ennen ma 23.10.2017 kello 16:00.
          </p>

          <p>Kiitos yhteistyöstä!</p>

          <p>
            Lisätietoja:{' '}
            <a href="mailto:armscontrol@saferglobe.fi">
              armscontrol@saferglobe.fi
            </a>
          </p>
        </div>

        <hr className="sep" />

        <div>
          <p>
            This webpage and its content are not public before{' '}
            <span className="no-break">Mon 23rd October 2017 at 4 PM</span>{' '}
            (Finnish Time). Before this moment you can access the web page with
            password. Articles based on information of this web page are not
            allowed to be published before{' '}
            <span className="no-break">Mon 23rd October 2017 at 4 PM</span>{' '}
            (Finnish Time).
          </p>

          <p>Thank you for your cooperation!</p>

          <p>
            Futher information:{' '}
            <a href="mailto:armscontrol@saferglobe.fi">
              armscontrol@saferglobe.fi
            </a>
          </p>
        </div>

        <hr className="sep" />

        <form
          className="login-form"
          onSubmit={ev => {
            ev.preventDefault();
            const passwordInput = ev.target.password;
            const password = passwordInput.value;
            if (password === 'Transparency_Increases_Security') {
              this.props.onLogin();
            } else {
              // do wobble animation
              const classes = passwordInput.className.split(' ');
              const idx = classes.indexOf('invalid');
              if (idx > -1) {
                classes.splice(idx, 1);
                passwordInput.className = classes.join(' ');
              }
              passwordInput.offsetWidth;
              setTimeout(() => {
                passwordInput.className += ' invalid';
              });
            }
          }}
        >
          <TextField
            id="login-password"
            className="password-field"
            placeholder={intl.get('PASSWORD')}
            name="password"
            type="password"
          />

          <Button
            type="submit"
            className={`login-btn ${currentLocale === 'en-US'
              ? 'login-btn--eng'
              : 'login-btn--fi'}`}
            label="Login"
          >
            {intl.get('LOGIN')}
          </Button>
        </form>
      </Card>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
