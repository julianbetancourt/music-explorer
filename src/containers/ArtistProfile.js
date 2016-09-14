import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtist } from '../actions/asyncActions';
import Panel from '../components/Panel';

const cutHtml = (str) => {
  //takes a string whose final part is row html and removes that last parentNode
  // console.log(str.indexOf('<a'));
  return str.slice(0, str.indexOf('<a'))


}


class ArtistProfile extends Component {
  componentDidMount() {
    this.props.getArtist(this.props.params.artist)
  }
  render() {
    return (
      <div>
        <Panel
          img={this.props.artist.img}
          name={this.props.artist.name}
          description={cutHtml(this.props.artist.description)}
          tags={this.props.artist.tags}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtist: (artist) => dispatch(getArtist(artist)),

  }
}

const mapStateToProps = (state) => {
  return {
    artist: state.artistProfile
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);
