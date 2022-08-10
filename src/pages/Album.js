import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      loading: false,
      musics: [],
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.musics();
    this.getfavorites();
  }

  musics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const { artistName, collectionName, artworkUrl100 } = musics[0];
    this.setState({
      musics: musics.filter((music) => music.kind === 'song'),
      artistName,
      collectionName,
      artworkUrl100,
    });
  }

  getfavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favorites,
      loading: false,
    });
  }

  render() {
    const { musics, artistName, collectionName, artworkUrl100,
      loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        album
        <Header />
        <div>
          { loading
            ? <Loading />
            : (
              <section>
                <div>
                  <span data-testid="artist-name">{ artistName }</span>
                  <span data-testid="album-name">{collectionName}</span>
                  <img
                    src={ artworkUrl100 }
                    alt={ collectionName }
                  />
                </div>
                <div>
                  {
                    musics.map((music) => (
                      <MusicCard
                        key={ music.trackId }
                        music={ music }
                        favoriteSongs={ favoriteSongs }
                        getfavorites={ this.getfavorites }
                      />
                    ))
                  }
                </div>
              </section>
            )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
