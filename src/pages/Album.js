import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      album: '',
      tracks: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id).then((data) => {
      this.setState({
        artist: data[0].artistName,
        album: data[0].collectionName,
        tracks: data.filter((obj) => obj.trackId),
      });
    });
  }

  render() {
    const { artist, album, tracks } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="artist-name">{ artist }</span>
        <span data-testid="album-name">{ album }</span>
        {
          tracks.map(({ trackName, previewUrl }) => (
            <li key={ trackName }>
              <MusicCard
                trackName={ trackName }
                previewUrl={ previewUrl }
              />
            </li>
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;
