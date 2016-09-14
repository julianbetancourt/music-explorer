import React, { Component } from 'react';

class  ArtistList extends Component {
  render() {
    return (
      <div className="artist-list">
        <h1>{this.props.params.term}</h1>
      </div>
    );
  }
}

export default ArtistList ;
