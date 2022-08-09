import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isDisabled: true,
      loading: false,
    };
  }

  handleActiveButton = ({ target }) => { // Ativação do butão de login
    const { value } = target;
    const lengthMin = 3;
    if (value.length >= lengthMin) {
      this.setState({ isDisabled: false, name: value });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleLoginUser = async () => { // chamando a função createUser() após click no butão
    const { history } = this.props;
    const { name, isDisabled } = this.state;
    this.setState({ loading: !isDisabled });

    await createUser({ name });
    history.push('/search');
  }

  render() {
    const { isDisabled, loading } = this.state;
    return (
      <section className="login-container">
        <Header />
        <div data-testid="page-login">
          { loading
            ? <Loading />
            : (
              <form>
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="name"
                  placeholder="Your username"
                  onChange={ this.handleActiveButton }
                />
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ isDisabled }
                  onClick={ this.handleLoginUser }
                >
                  Entrar
                </button>
              </form>
            )}
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
