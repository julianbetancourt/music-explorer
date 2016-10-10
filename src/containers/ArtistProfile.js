import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtist, getTopAlbums, getAlbumIds, getTracks } from '../actions/asyncActions';
import Panel from '../components/Panel';
import SubPanel from '../components/SubPanel';
import SubPanelSong from '../components/SubPanelSong';
import { withRouter } from 'react-router';

const cutHtml = (str) => {
  //takes a string whose final part is a row html link
  //and removes that
  return str.slice(0, str.indexOf('<a'))
}


class ArtistRouter extends Component {
  componentDidMount() {
    const { getArtist, getTopAlbums, getAlbumIds, params } = this.props
    getArtist(params.artist);
    getTopAlbums(params.artist);
    getAlbumIds(params.artist);
  }
  componentWillUnmount() {
    const { artist } = this.props;
    artist.tracks.forEach((track, i) => {
      artist.tracks[i].audio.pause();
    })
  }
  handleSubPanelClick(e) {
    const { getArtist, getTopAlbums, getAlbumIds, artist } = this.props
    let clicked;
    if (e.target.className === 'sub-panel') {
      let secondHashIndex = e.target.getAttribute('href').lastIndexOf('/')
      clicked = e.target.getAttribute('href').slice(secondHashIndex+1);
    } else if (e.target.nodeName === 'SPAN') {
      clicked = e.target.textContent;
    } else if (e.target.className === 'sub-panel__name') {
      clicked = e.target.querySelectorAll('span')[0].textContent;
    } else if (e.target.nodeName === 'IMG') {
      let secondHashIndex = e.target.parentNode.parentNode.getAttribute('href').lastIndexOf('/')
      clicked = e.target.parentNode.parentNode.getAttribute('href').slice(secondHashIndex+1);
    }
    getArtist(clicked)
    getTopAlbums(clicked)
    getAlbumIds(clicked);
    artist.tracks.forEach((track, i) => {
      artist.tracks[i].audio.pause();
    })
  }
  handleSongClick(e) {
    const { artist } = this.props;
    if (e.target.nodeName === 'IMG') {
      const clicked = parseInt(e.target.parentNode.parentNode.getAttribute('data-n'), 10);
      const audios = e.target.parentNode.parentNode.parentNode.children;
      artist.tracks.forEach((track, i) => {
        if (clicked === i) {
          if (artist.tracks[clicked].audio.paused) {
            artist.tracks[clicked].audio.play()
            audios[clicked].classList.add('playing');
          } else {
            artist.tracks[clicked].audio.pause()
            audios[clicked].classList.remove('playing');
          }
        } else {
          artist.tracks[i].audio.pause();
          audios[i].classList.remove('playing');
        }
      })
    }
  }
  render() {
    const { artist } = this.props
    return (
      <div className="artist-profile">
        <Panel
          img={artist.img}
          name={artist.name}
          description={cutHtml(artist.description)}
          tags={artist.tags}/>
        <div className="info">
          <div className="album-list">
            <span className="section">Top Albums: </span>
            <div className="panels">
              {
                artist.topAlbums.map((album, i) => {
                  const image = album.image[2][Object.keys(album.image[2])[0]];
                  return <SubPanel img={image} name={album.name} key={i} isAlbum={true}/>
                })
              }
            </div>
          </div>
          <div className="album-list">
            <span className="section">Similar Artists: </span>
            <div className="panels">
              {
                artist.similar.map((artist, i) => {
                  const image = artist.image[2][Object.keys(artist.image[2])[0]];
                  if (i < 4) {
                    return <SubPanel img={image} name={artist.name} key={i} onClick={this.handleSubPanelClick.bind(this)}/>
                  } else {
                    return null;
                  }
                })
              }
            </div>
          </div>
          <div className="album-list">
            <span className="section">Popular Songs: </span>
            <div className="panels panels--songs">
              {
                artist.tracks.map((track, i) => {
                  return <SubPanelSong name={track.trackName} key={i} onClick={this.handleSongClick.bind(this)} audio={i}/>;
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtist: (artist) => dispatch(getArtist(artist)),
    getTopAlbums: (artist) => dispatch(getTopAlbums(artist)),
    getAlbumIds: (artist) => dispatch(getAlbumIds(artist)),
    getTracks: () => dispatch(getTracks())

  }
}

const mapStateToProps = (state) => {
  return {
    artist: state.artistProfile
  }
}

let ArtistProfile = withRouter(ArtistRouter);

export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);
