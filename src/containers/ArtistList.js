import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtists, getArtist, getTopAlbums } from '../actions/asyncActions'; //notice one is plural and the other not
import SubPanel from '../components/SubPanel';

class ArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: this.props.params.term
    }
  }
  componentDidMount() {
    this.props.getArtists(this.props.params.term);
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
    this.props.getArtist(clicked)
    this.props.getTopAlbums(clicked)
  }
  render() {
    return (
      <div className="artist-list">
        {
          this.props.artists.map((artist, i) => {
            const image = artist.image[2][Object.keys(artist.image[2])[0]];
            return <SubPanel name={artist.name} key={i} img={image} onClick={this.handleSubPanelClick.bind(this)}/>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.searchArtists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtists: (term) => dispatch(getArtists(term)),
    getArtist: (artist) => dispatch(getArtist(artist)),
    getTopAlbums: (artist) => dispatch(getTopAlbums(artist))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ArtistList) ;
