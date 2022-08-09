import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const userName = await getUser();
    this.setState({ loading: false, name: userName.name });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : (
            <span data-testid="header-user-name">{ name }</span>
          )}
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
