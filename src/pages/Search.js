import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisabledButton: true,
      nameArtist: '',
      colectionAlbuns: [],
      loading: true,
    };
  }

  handleActiveButton = ({ target }) => { // Ativa o botão de Pesquisa
    const { value } = target;
    const lengthMin = 2;
    if (value.length >= lengthMin) {
      this.setState({ isDisabledButton: false });
    } else {
      this.setState({ isDisabledButton: true });
    }
  }

  handlesearchArtist = async () => {
    const { nameArtist } = this.state;
    this.setState({
      loading: true,
      nameArtist: '',
    });
    const colectionAlbuns = await searchAlbumsAPI(nameArtist);
    this.setState({
      loading: false,
      nameArtist: '',
      colectionAlbuns,
    });
  }

  render() {
    const { isDisabledButton, nameArtist, colectionAlbuns, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-container">
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              name="name"
              placeholder="Name of Artist"
              onChange={ this.handleActiveButton }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isDisabledButton }
              onClick={ this.handlesearchArtist }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
