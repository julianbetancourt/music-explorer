import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtists } from '../actions/asyncActions';

class ArtistList extends Component {
  componentWillMount() {
    console.log('artist list will mount!!');
    this.props.getArtists(this.props.params.term)
  }
  componentDidUpdate() {
    this.props.getArtists(this.props.params.term)
  }
  render() {
    return (
      <div className="artist-list">
        <h1>{this.props.params.term}</h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtists: (term) => dispatch(getArtists(term))
  }
}

export default connect(null, mapDispatchToProps)(ArtistList) ;
