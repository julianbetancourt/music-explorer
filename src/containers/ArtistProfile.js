import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtist, getTopAlbums } from '../actions/asyncActions';
import Panel from '../components/Panel';
import SubPanel from '../components/SubPanel';

const cutHtml = (str) => {
  //takes a string whose final part is a row html link
  //and removes that
  return str.slice(0, str.indexOf('<a'))
}





class ArtistProfile extends Component {
  componentDidMount() {
    console.log('param:' + this.props.params.artist);
    this.props.getArtist(this.props.params.artist);
    this.props.getTopAlbums(this.props.params.artist);
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
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtist: (artist) => dispatch(getArtist(artist)),
    getTopAlbums: (artist) => dispatch(getTopAlbums(artist))

  }
}

const mapStateToProps = (state) => {
  return {
    artist: state.artistProfile
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);
