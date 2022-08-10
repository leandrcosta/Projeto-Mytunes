import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  handleFavorite = async ({ target }) => {
    const { music, getfavorites } = this.props;
    this.setState({ loading: true });
    if (target.checked === false) { // se tiver checked adiciona. Senão, remove
      await removeSong(music);
    } else {
      await addSong(music);
    }
    this.setState({
      loading: false,
    });
    getfavorites();
  }

  checkFavorite = (trackId) => {
    const { favoriteSongs } = this.props;
    if (favoriteSongs.length > 0) {
      return favoriteSongs.some((track) => track.trackId === trackId);
    }
    return false;
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <div>
              <span>{trackName}</span>
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor="favorite">
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  name="favorite"
                  onChange={ this.handleFavorite }
                  checked={ this.checkFavorite(trackId) }
                />
              </label>
            </div>
          )}
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
