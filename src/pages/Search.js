import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      searchArtist: '',
      colectionAlbums: [],
      disabledButton: true,
      loading: false,
    };
  }

  handleActiveButton = ({ target }) => { // Ativa o botão de Pesquisa
    const { name, value } = target;
    const lengthMin = 2;
    this.setState({ [name]: value }, () => {
      if (value.length >= lengthMin) {
        this.setState({ disabledButton: false });
      } else {
        this.setState({ disabledButton: true });
      }
    });
  }

  handlesearchArtist = async () => {
    const { artistName } = this.state;
    this.setState({
      loading: true,
      searchArtist: artistName,
    });
    const colectionAlbums = await searchAlbumsAPI(artistName);
    this.setState({
      loading: false,
      artistName: '',
      colectionAlbums,
    });
  }

  render() {
    const { loading, artistName,
      disabledButton, searchArtist, colectionAlbums } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-container">
          <form>
            <input
              data-testid="search-artist-input"
              name="artistName"
              value={ artistName }
              placeholder="Name of Artist"
              onChange={ this.handleActiveButton }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ disabledButton }
              onClick={ this.handlesearchArtist }
            >
              Pesquisar
            </button>
          </form>
          {loading && <Loading />}
          { // Renderizando os albuns retonados da busca - refatorar código
            colectionAlbums.length === 0 ? <span>Nenhum álbum foi encontrado</span>
              : (
                <div>
                  <span>{`Resultado de álbuns de: ${searchArtist}`}</span>
                  { colectionAlbums.map((album) => (
                    <div key={ album.collectionId }>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        <img
                          src={ album.artworkUrl100 }
                          alt={ album.collectionName }
                        />
                        <p>{ album.collectionName }</p>
                        <p>{ artistName }</p>
                      </Link>
                    </div>
                  ))}
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default Search;
