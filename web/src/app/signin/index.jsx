import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderComponent from 'app/header_component';
import InputText from 'lib/component/InputText';
import InputPassword from 'lib/component/InputPassword';
import { login } from './action';

class SigninComponent extends React.PureComponent {

  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  handleSubmit = (e) => {
    const username = e.target.username.value;
    const password = e.target.password.value;
    e.preventDefault();
    if (username && password) {
      this.props.login(username, password);
    }
  }


  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="content">
          <div className="column">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <p className="control">
                  <InputText name="username" placeholder="username" />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <InputPassword name="password" placeholder="password" />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-success">Login</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ signin }) => ({ signin }), { login })(SigninComponent);
