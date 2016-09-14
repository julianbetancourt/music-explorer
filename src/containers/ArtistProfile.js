import React, { Component } from 'react';

class ArtistProfile extends Component {
  render() {
    return (
      <div className="artist-profile">
        <h1>{this.props.params.artist}</h1>
      </div>
    );
  }
}

export default ArtistProfile;
