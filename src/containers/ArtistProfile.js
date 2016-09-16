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
    // console.log('param:' + this.props.params.artist);
    // let mainPromise = new Promise(() => {
    //   this.props.getArtist(this.props.params.artist);
    // })
    // mainPromise.then(() =>  {
    //   this.props.getTopAlbums(this.props.params.artist)
    // })

    this.props.getArtist(this.props.params.artist);
    this.props.getTopAlbums(this.props.params.artist);
    this.props.getAlbumIds(this.props.params.artist);
    // this.props.getTracks();
  }
  componentWillUnmount() {
    this.props.artist.tracks.forEach((track, i) => {
      this.props.artist.tracks[i].audio.pause();
    })
  }
  handleSubPanelClick(e) {
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
    console.log(e.target);
    this.props.getArtist(clicked)
    this.props.getTopAlbums(clicked)
    this.props.getAlbumIds(clicked);
    this.props.artist.tracks.forEach((track, i) => {
      this.props.artist.tracks[i].audio.pause();
    })

  }
  handleSongClick(e) {
    if (e.target.nodeName === 'IMG') {
      const clicked = parseInt(e.target.parentNode.parentNode.getAttribute('data-n'));
      const audios = e.target.parentNode.parentNode.parentNode.children;
      this.props.artist.tracks.forEach((track, i) => {
        if (clicked === i) {
          if (this.props.artist.tracks[clicked].audio.paused) {
            this.props.artist.tracks[clicked].audio.play()
            audios[clicked].classList.add('playing');
            console.log(audios[clicked]);
          } else {
            this.props.artist.tracks[clicked].audio.pause()
            audios[clicked].classList.remove('playing');
          }

        } else {
          this.props.artist.tracks[i].audio.pause();
          audios[i].classList.remove('playing');

        }
      })

    }
  }
  render() {
    return (
      <div className="artist-profile">
        <Panel
          img={this.props.artist.img}
          name={this.props.artist.name}
          description={cutHtml(this.props.artist.description)}
          tags={this.props.artist.tags}/>
        <div className="info">
          <div className="album-list">
            <span className="section">Top Albums: </span>
            <div className="panels">
              {
                this.props.artist.topAlbums.map((album, i) => {
                  const image = album.image[2][Object.keys(album.image[2])[0]];
                  return <SubPanel img={image} name={album.name} key={i} />
                })
              }
            </div>
          </div>
          <div className="album-list">
            <span className="section">Similar Artists: </span>
            <div className="panels">
              {
                this.props.artist.similar.map((artist, i) => {
                  const image = artist.image[2][Object.keys(artist.image[2])[0]];
                  if (i < 4) {
                    return <SubPanel img={image} name={artist.name} key={i} onClick={this.handleSubPanelClick.bind(this)}/>
                  }
                })
              }
            </div>
          </div>
          <div className="album-list">
            <span className="section">Popular Songs: </span>
            <div className="panels panels--songs">
              {
                this.props.artist.tracks.map((track, i) => {

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
